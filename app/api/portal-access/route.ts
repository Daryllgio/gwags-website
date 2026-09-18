import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { verifyPortalAccessToken } from '@/lib/portalToken'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')
const stripe = new Stripe(stripeSecretKey)

/* Redeems a secure portal-access token (minted by create-portal-session and
   delivered only via email) and redirects to a real Stripe Customer Portal
   session. The only redirect targets this route ever produces are: (a) the
   URL Stripe itself returns from billingPortal.sessions.create(), or (b) a
   fixed, hardcoded path on this same site — never a client-supplied URL —
   so there is no open-redirect surface here. */
export async function GET(req: NextRequest) {
  const failUrl = new URL('/get-involved?portal=invalid', req.nextUrl.origin)

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

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: verified.customerId,
      return_url: `${req.nextUrl.origin}/get-involved`,
    })
    return NextResponse.redirect(session.url)
  } catch (err) {
    console.error('portal-access: failed to create billing portal session:', err)
    return NextResponse.redirect(failUrl)
  }
}
