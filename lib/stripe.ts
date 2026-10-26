import Stripe from 'stripe'

/* Centralized Stripe client factory with a safety guard so local/dev/preview
   can never accidentally transact against a LIVE Stripe key.

   VERCEL_ENV is 'production' only on the production deployment; it's unset
   under `next dev` and 'preview' on preview deploys. A `sk_live_` key outside
   production therefore indicates a misconfigured environment (e.g. a local
   `.env.production.local` being loaded by a production build) — we fail fast
   rather than risk a real charge during testing. */
export function assertStripeKeySafe(key: string): void {
  const isLive = key.startsWith('sk_live_') || key.startsWith('rk_live_')
  if (isLive && process.env.VERCEL_ENV !== 'production') {
    throw new Error(
      'Refusing to initialize Stripe with a LIVE secret key outside Vercel production. ' +
      'Use test-mode keys (sk_test_…) for local development.',
    )
  }
}

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  // `next build` evaluates route modules (NODE_ENV=production, which may load
  // a local `.env.production.local` with live keys) but makes no Stripe calls,
  // so skip the guard during the build phase. It still runs for every real
  // request at runtime (`next dev`/`next start`), which is where an accidental
  // live charge could actually occur.
  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    assertStripeKeySafe(key)
  }
  return new Stripe(key)
}
