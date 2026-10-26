import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { verifyPortalAccessToken } from '@/lib/portalToken'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { getStripe } from '@/lib/stripe'
import { db } from '@/lib/db/client'
import { portalLinkRedemptions } from '@/lib/db/schema'

export const runtime = 'nodejs'

const stripe = getStripe()

/* Redeems a secure portal-access token (minted by create-portal-session and
   delivered only via email) and redirects to a real Stripe Customer Portal
   session. The only redirect targets this route ever produces are: (a) the
   URL Stripe itself returns from billingPortal.sessions.create(), or (b) a
   fixed, hardcoded path on this same site — never a client-supplied URL —
   so there is no open-redirect surface here. */
export async function GET(req: NextRequest) {
  // Expired/invalid/tampered tokens land on the dedicated explanation page.
  const failUrl = new URL('/manage-donation/invalid', req.nextUrl.origin)

  if (isRateLimited(getClientIp(req))) {
    return NextResponse.redirect(new URL('/get-involved', req.nextUrl.origin))
  }

  const token = req.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.redirect(failUrl)
  }

  const verified = verifyPortalAccessToken(token)
  if (!verified) {
    console.warn('portal-access: rejected an invalid, expired, or tampered token.')
    return NextResponse.redirect(failUrl)
  }

  // Single-use pre-check: if this token's jti was already redeemed, reject
  // before spending a Stripe call. (The atomic guarantee is the INSERT below.)
  try {
    const already = await db
      .select({ jti: portalLinkRedemptions.jti })
      .from(portalLinkRedemptions)
      .where(eq(portalLinkRedemptions.jti, verified.jti))
      .limit(1)
    if (already.length > 0) {
      console.warn('portal-access: token already redeemed — rejecting reuse.')
      return NextResponse.redirect(failUrl)
    }
  } catch (err) {
    console.error('portal-access: redemption pre-check failed:', err)
    return NextResponse.redirect(failUrl)
  }

  // Create the portal session BEFORE marking the token redeemed, so a Stripe
  // failure never burns the single use (the donor can safely retry the link).
  let sessionUrl: string
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: verified.customerId,
      // `?portal=return` is how /get-involved knows the donor is coming back
      // from a real Billing Portal session (the return_url is server-set here,
      // never client-controllable) and can show the return confirmation.
      return_url: `${req.nextUrl.origin}/get-involved?portal=return`,
    })
    sessionUrl = session.url
  } catch (err) {
    console.error('portal-access: failed to create billing portal session:', err)
    return NextResponse.redirect(failUrl)
  }

  // Atomically claim single use. The jti PRIMARY KEY makes this race-safe:
  // of two concurrent redemptions, only one INSERT returns a row; the other
  // gets nothing and is rejected. Only the winner is redirected to Stripe.
  try {
    const claimed = await db
      .insert(portalLinkRedemptions)
      .values({ jti: verified.jti, expiresAt: verified.expiresAt })
      .onConflictDoNothing({ target: portalLinkRedemptions.jti })
      .returning({ jti: portalLinkRedemptions.jti })
    if (claimed.length === 0) {
      console.warn('portal-access: lost the redemption race — rejecting.')
      return NextResponse.redirect(failUrl)
    }
  } catch (err) {
    console.error('portal-access: failed to record redemption:', err)
    return NextResponse.redirect(failUrl)
  }

  return NextResponse.redirect(sessionUrl)
}
