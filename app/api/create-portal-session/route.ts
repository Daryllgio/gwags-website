import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { t, type Lang } from '@/lib/translations'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')
const stripe = new Stripe(stripeSecretKey)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const resolveLang = (lang: unknown): Lang => (lang === 'fr' ? 'fr' : 'en')

export async function POST(req: NextRequest) {
  let d = t.en.donationOverlay
  try {
    const { email, lang } = await req.json()
    d = t[resolveLang(lang)].donationOverlay

    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: d.manageEmailInvalid }, { status: 400 })
    }

    const customers = await stripe.customers.list({ email: email.trim(), limit: 1 })
    const customer = customers.data[0]

    if (!customer) {
      return NextResponse.json({ error: d.manageNotFound }, { status: 404 })
    }

    // Requires the Customer Portal to be configured once in the Stripe
    // Dashboard (Settings → Billing → Customer portal) for this account.
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${req.nextUrl.origin}/get-involved`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('create-portal-session error:', err)
    const message = err instanceof Stripe.errors.StripeError ? err.message : d.genericError
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
