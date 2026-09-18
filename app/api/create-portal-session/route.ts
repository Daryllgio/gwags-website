import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { t, type Lang } from '@/lib/translations'
import { getResendClient, getFromEmail, renderBrandedEmail } from '@/lib/mail'
import { createPortalAccessToken } from '@/lib/portalToken'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')
const stripe = new Stripe(stripeSecretKey)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ACTIVE_SUBSCRIPTION_STATUSES: Stripe.Subscription.Status[] = ['active', 'trialing', 'past_due']

const resolveLang = (lang: unknown): Lang => (lang === 'fr' ? 'fr' : 'en')

/* Resolves the email to a Stripe Customer server-side — never trusts a
   client-supplied customer ID (none is ever accepted here).

   A donor's email can legitimately match more than one Stripe Customer
   (a separate Customer is created per one-time gift too — see
   create-payment-intent). `customers.list({ email })` only ever returns
   Customers whose OWN Stripe record carries that exact email, so every
   candidate here already belongs to the same person; there is no risk of
   crossing into a different donor's account. Among a donor's own Customer
   records, only ones with a live recurring subscription are eligible — a
   one-time-only donor has nothing to manage in the Portal, and this is
   also literally the flow's purpose ("manage your monthly donation"). If
   more than one of the donor's own Customers has an active subscription
   (e.g. they started giving monthly more than once under the same email),
   the one with the most recently created active subscription is used —
   deterministic, but documented here as a known limitation rather than
   something this endpoint tries to fully solve. */
async function findActiveSubscriptionCustomerId(email: string): Promise<string | null> {
  const customers = await stripe.customers.list({ email, limit: 100 })
  if (customers.data.length === 0) return null

  let best: { customerId: string; created: number } | null = null
  for (const customer of customers.data) {
    const subs = await stripe.subscriptions.list({ customer: customer.id, status: 'all', limit: 20 })
    for (const sub of subs.data) {
      if (!ACTIVE_SUBSCRIPTION_STATUSES.includes(sub.status)) continue
      if (!best || sub.created > best.created) {
        best = { customerId: customer.id, created: sub.created }
      }
    }
  }
  return best?.customerId ?? null
}

function portalRequestEmailHtml(accessUrl: string): string {
  return renderBrandedEmail(`
    <p>Hi,</p>
    <p>We received a request to manage your recurring donation to Gwags.</p>
    <p>Use the secure link below to manage or cancel your recurring donation:</p>
    <p><a href="${accessUrl}" style="color:#0A1128; font-weight:600;">Manage my recurring donation</a></p>
    <p style="font-size:13px; color:#6B6B6B;">For your security, this link will expire in 15 minutes. If you didn't request this, you can safely ignore this email — no changes will be made to your donation.</p>
    <p>Best,<br>The Gwags Team</p>
  `)
}

export async function POST(req: NextRequest) {
  let d = t.en.donationOverlay
  try {
    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const { email, lang } = await req.json()
    d = t[resolveLang(lang)].donationOverlay

    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: d.manageEmailInvalid }, { status: 400 })
    }
    const trimmedEmail = email.trim()

    const customerId = await findActiveSubscriptionCustomerId(trimmedEmail)

    if (customerId) {
      const token = createPortalAccessToken(customerId)
      const accessUrl = `${req.nextUrl.origin}/api/portal-access?token=${encodeURIComponent(token)}`

      const resend = getResendClient()
      const { error } = await resend.emails.send({
        from: `"Gwags Global Impact Institution" <${getFromEmail()}>`,
        to: trimmedEmail,
        subject: 'Manage your recurring donation — Gwags',
        html: portalRequestEmailHtml(accessUrl),
      })
      if (error) console.error('create-portal-session: failed to send secure link email:', error)
    } else {
      // No enumeration via response timing: do comparable async work on the
      // "no match" path so this branch doesn't consistently return faster
      // than the "found a customer, sent an email" branch above.
      await new Promise(resolve => setTimeout(resolve, 250))
    }

    // Always the same shape/status regardless of whether a match was found —
    // the requester must not be able to tell donor-existence from the response.
    return NextResponse.json({ success: true, message: d.manageSent })
  } catch (err) {
    console.error('create-portal-session error:', err)
    return NextResponse.json({ error: d.genericError }, { status: 500 })
  }
}
