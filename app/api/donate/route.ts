import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')

export async function POST(req: NextRequest) {
  try {
    const { amount, frequency } = await req.json()

    if (!amount || amount < 50) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    if (frequency === 'monthly') {
      // Create customer and subscription
      const customer = await stripe.customers.create()

      // Create a price on-the-fly
      const price = await stripe.prices.create({
        currency: 'usd',
        unit_amount: amount,
        recurring: { interval: 'month' },
        product_data: { name: 'Gwags Monthly Donation' },
      })

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      })

      const invoice = subscription.latest_invoice as Stripe.Invoice & { payment_intent?: { client_secret: string | null } }
      const clientSecret = invoice?.payment_intent?.client_secret ?? null

      return NextResponse.json({ clientSecret })
    } else {
      // One-time payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        description: 'Gwags One-time Donation',
        automatic_payment_methods: { enabled: true },
      })

      return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    }
  } catch (err) {
    console.error('Donate API error:', err)
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }
}
