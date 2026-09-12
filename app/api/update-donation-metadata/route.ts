import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')
const stripe = new Stripe(stripeSecretKey)

/* Best-effort attachment of optional post-payment data (referral source) to
   the donation's own PaymentIntent or Subscription via Stripe metadata —
   mirrors the existing `donor_name` metadata precedent, keeping the data
   attached to the actual donation record rather than a disconnected local
   log. Stripe merges metadata updates, so pre-existing keys (like
   `donor_name`) are preserved. */
export async function POST(req: NextRequest) {
  try {
    const { type, id, referralSource } = await req.json()

    if ((type !== 'payment_intent' && type !== 'subscription') || typeof id !== 'string' || !id) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const metadata: Record<string, string> = {}
    if (Array.isArray(referralSource) && referralSource.length) {
      metadata.referral_source = referralSource.join(', ').slice(0, 500)
    }

    if (Object.keys(metadata).length === 0) {
      return NextResponse.json({ success: true })
    }

    if (type === 'payment_intent') {
      await stripe.paymentIntents.update(id, { metadata })
    } else {
      await stripe.subscriptions.update(id, { metadata })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('update-donation-metadata error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
