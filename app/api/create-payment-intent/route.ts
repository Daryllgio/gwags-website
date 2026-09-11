import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { t, type Lang } from '@/lib/translations'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')
const stripe = new Stripe(stripeSecretKey)

const MIN_AMOUNT = 0.5 // Stripe's minimum charge amount for USD

const resolveLang = (lang: unknown): Lang => (lang === 'fr' ? 'fr' : 'en')

export async function POST(req: NextRequest) {
  let d = t.en.donationOverlay
  try {
    const { amount, name, email, lang } = await req.json()
    d = t[resolveLang(lang)].donationOverlay

    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < MIN_AMOUNT) {
      return NextResponse.json({ error: d.amountTooLowError }, { status: 400 })
    }

    // A Customer is created for every one-time donation (not just subscriptions)
    // so the card can be saved via `setup_future_usage` and reused without
    // re-entering details if the donor later upgrades to a monthly gift.
    const customer = await stripe.customers.create({
      name: typeof name === 'string' && name.trim() ? name.trim() : undefined,
      email: typeof email === 'string' && email.trim() ? email.trim() : undefined,
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      description: 'Gwags One-time Donation',
      payment_method_types: ['card'],
      customer: customer.id,
      setup_future_usage: 'off_session',
      receipt_email: typeof email === 'string' && email.trim() ? email.trim() : undefined,
      metadata: typeof name === 'string' && name.trim() ? { donor_name: name.trim() } : undefined,
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, customerId: customer.id })
  } catch (err) {
    console.error('create-payment-intent error:', err)
    const message = err instanceof Stripe.errors.StripeError ? err.message : d.paymentStartError
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
