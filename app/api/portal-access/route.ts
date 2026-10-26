import { NextRequest, NextResponse } from 'next/server'
import { verifyPortalAccessToken } from '@/lib/portalToken'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { getStripe } from '@/lib/stripe'

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

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: verified.customerId,
      // `?portal=return` is how /get-involved knows the donor is coming back
      // from a real Billing Portal session (the return_url is server-set here,
      // never client-controllable) and can show the return confirmation.
      return_url: `${req.nextUrl.origin}/get-involved?portal=return`,
    })
    return NextResponse.redirect(session.url)
  } catch (err) {
    console.error('portal-access: failed to create billing portal session:', err)
    return NextResponse.redirect(failUrl)
  }
}
