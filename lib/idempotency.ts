/* Stripe webhook event de-duplication.

   The project has no database, KV store, or Redis today (confirmed by
   repo-wide audit — no Prisma/Supabase/Mongo/Postgres client anywhere).
   This module targets Upstash Redis's REST API directly via `fetch` — no
   new npm dependency — because Redis's `SET key val NX EX ttl` is an
   atomic, race-safe "claim once" primitive that self-cleans via TTL with
   no cleanup job needed, and Upstash is Vercel's Marketplace-native Redis.

   IMPORTANT: this does nothing until UPSTASH_REDIS_REST_URL and
   UPSTASH_REDIS_REST_TOKEN are provisioned (Vercel Marketplace → Upstash)
   and set as environment variables — that step requires explicit approval
   and is NOT done by this change. Until then, `claimEventOnce` always
   returns true (process normally), which is exactly today's pre-hardening
   behavior — nothing regresses if the store is never configured, but
   duplicate Stripe deliveries also aren't deduplicated yet. */

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

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
        '[idempotency] UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set — ' +
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
