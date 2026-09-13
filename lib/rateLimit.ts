import { NextRequest } from 'next/server'

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

// Best-effort, in-memory only: resets on cold start and isn't shared across
// serverless instances. Meant as a cheap deterrent layered on top of the
// honeypot field, not a hard guarantee.
const hits = new Map<string, number[]>()

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now()

  if (hits.size > 1000) {
    hits.forEach((timestamps, key) => {
      if (timestamps.every((t: number) => now - t > WINDOW_MS)) hits.delete(key)
    })
  }

  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  return recent.length > MAX_REQUESTS
}
