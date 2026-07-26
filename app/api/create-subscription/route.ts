import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { t, type Lang } from '@/lib/translations'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')
const stripe = new Stripe(stripeSecretKey)

const MIN_AMOUNT = 0.5 // Stripe's minimum charge amount for USD
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const resolveLang = (lang: unknown): Lang => (lang === 'fr' ? 'fr' : 'en')

export async function POST(req: NextRequest) {
  let d = t.en.donationOverlay
  try {
    const { amount, name, email, lang } = await req.json()
    d = t[resolveLang(lang)].donationOverlay

    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < MIN_AMOUNT) {
      return NextResponse.json({ error: d.amountTooLowError }, { status: 400 })
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: d.manageEmailInvalid }, { status: 400 })
    }

    const customer = await stripe.customers.create({
      name: typeof name === 'string' && name.trim() ? name.trim() : undefined,
      email: email.trim(),
    })

    // No fixed pricing catalog for recurring donations — create a Price on the
    // fly that matches the donor's exact custom monthly amount.
    const price = await stripe.prices.create({
      currency: 'usd',
      unit_amount: Math.round(amount * 100),
      recurring: { interval: 'month' },
      product_data: { name: 'Gwags Monthly Donation' },
    })

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.confirmation_secret'],
    })

    // Current Stripe API versions expose the invoice's PaymentIntent client
    // secret via `confirmation_secret` rather than a nested `payment_intent`.
    const invoice = subscription.latest_invoice as Stripe.Invoice & {
      confirmation_secret?: { client_secret: string | null }
    }
    const clientSecret = invoice?.confirmation_secret?.client_secret ?? null

    if (!clientSecret) {
      return NextResponse.json({ error: d.paymentStartError }, { status: 500 })
    }

    return NextResponse.json({ clientSecret, customerId: customer.id, subscriptionId: subscription.id })
  } catch (err) {
    console.error('create-subscription error:', err)
    const message = err instanceof Stripe.errors.StripeError ? err.message : d.paymentStartError
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
