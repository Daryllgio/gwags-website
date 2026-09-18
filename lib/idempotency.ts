/* Stripe webhook event de-duplication.

   The project has no database, KV store, or Redis today (confirmed by
   repo-wide audit — no Prisma/Supabase/Mongo/Postgres client anywhere).
   This module targets Upstash Redis's REST API directly via `fetch` — no
   new npm dependency — because Redis's `SET key val NX EX ttl` is an
   atomic, race-safe "claim once" primitive that self-cleans via TTL with
   no cleanup job needed, and Upstash is Vercel's Marketplace-native Redis.

   Reads the Vercel-native env vars that the Upstash-via-Marketplace
   integration injects automatically (KV_REST_API_URL / KV_REST_API_TOKEN)
   rather than the raw Upstash names, so no manual env var setup is needed
   beyond provisioning the integration itself. Until those are present in a
   given environment, `claimEventOnce` always returns true (process
   normally), which is exactly today's pre-hardening behavior — nothing
   regresses if the store is ever missing, but duplicate Stripe deliveries
   also aren't deduplicated in that case. */

const UPSTASH_URL = process.env.KV_REST_API_URL
const UPSTASH_TOKEN = process.env.KV_REST_API_TOKEN

// Comfortably longer than Stripe's own webhook retry window (Stripe stops
// retrying after ~3 days), so a key can never expire before Stripe would
// have stopped redelivering that event anyway.
const EVENT_TTL_SECONDS = 60 * 60 * 24 * 30

export function isIdempotencyConfigured(): boolean {
  return Boolean(UPSTASH_URL && UPSTASH_TOKEN)
}

let warnedUnconfigured = false

/* Atomically claims a Stripe event ID for processing.
   - true  → this call should process the event (first delivery seen, or
             the store isn't configured yet — see file header).
   - false → this exact event ID was already claimed by another delivery;
             the caller should skip processing (but still ack 200 to Stripe).

   Fails OPEN (returns true) on any Upstash error/timeout/misconfiguration,
   deliberately: a donor silently missing a real email is worse than an
   occasional duplicate, and the existing webhook already can't rely on
   Stripe retries to recover a failed send (see lib/idempotency.ts callers). */
export async function claimEventOnce(eventId: string): Promise<boolean> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    if (!warnedUnconfigured) {
      console.warn(
        '[idempotency] KV_REST_API_URL / KV_REST_API_TOKEN not set — ' +
        'webhook idempotency is DISABLED, every delivery (including Stripe retries) ' +
        'will be processed. See lib/idempotency.ts.'
      )
      warnedUnconfigured = true
    }
    return true
  }

  const key = `stripe:event:${eventId}`
  try {
    const res = await fetch(
      `${UPSTASH_URL}/set/${encodeURIComponent(key)}/1/NX/EX/${EVENT_TTL_SECONDS}`,
      { method: 'POST', headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` } }
    )
    if (!res.ok) {
      console.error(`[idempotency] Upstash request failed (HTTP ${res.status}) — processing without dedup.`)
      return true
    }
    const data = (await res.json()) as { result: string | null }
    return data.result === 'OK'
  } catch (err) {
    console.error('[idempotency] Upstash request threw — processing without dedup:', err)
    return true
  }
}
