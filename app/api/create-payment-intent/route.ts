import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { t, type Lang } from '@/lib/translations'
import { getStripe } from '@/lib/stripe'
import { MIN_DONATION_USD, ONE_TIME_DONATION_DESCRIPTION } from '@/lib/donation'

const stripe = getStripe()

const resolveLang = (lang: unknown): Lang => (lang === 'fr' ? 'fr' : 'en')

export async function POST(req: NextRequest) {
  let d = t.en.donationOverlay
  try {
    const { amount, name, email, lang } = await req.json()
    d = t[resolveLang(lang)].donationOverlay

    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < MIN_DONATION_USD) {
      return NextResponse.json({ error: d.amountTooLowError }, { status: 400 })
    }

    // A Customer is created for every one-time donation (not just subscriptions)
    // so the card can be saved via `setup_future_usage` and reused without
    // re-entering details if the donor later upgrades to a monthly gift.
    const customer = await stripe.customers.create({
      name: typeof name === 'string' && name.trim() ? name.trim() : undefined,
      email: typeof email === 'string' && email.trim() ? email.trim() : undefined,
      // Stamp language so the webhook's donor thank-you email localizes it,
      // same as create-subscription / upgrade-to-monthly do for monthly gifts.
      metadata: { lang: resolveLang(lang) },
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      description: ONE_TIME_DONATION_DESCRIPTION,
      payment_method_types: ['card'],
      customer: customer.id,
      setup_future_usage: 'off_session',
      // No `receipt_email`: it would trigger a separate Stripe receipt if the
      // account's "Successful payments" emails are ever enabled, duplicating
      // our single Gwags thank-you. The donor's email lives on the Customer
      // (created above) and the webhook reads it from there instead.
      metadata: typeof name === 'string' && name.trim() ? { donor_name: name.trim() } : undefined,
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, customerId: customer.id })
  } catch (err) {
    console.error('create-payment-intent error:', err)
    const message = err instanceof Stripe.errors.StripeError ? err.message : d.paymentStartError
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
