import { NextRequest, NextResponse } from 'next/server'
import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { donationReminders } from '@/lib/db/schema'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { cleanText, isValidEmail } from '@/lib/validate'

export const runtime = 'nodejs'

const REMINDER_DELAY_MS = 24 * 60 * 60 * 1000 // ~24 hours

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json().catch(() => ({}))
    const email = cleanText(body.email, 200)
    const lang = body.lang === 'fr' ? 'fr' : 'en'

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    // Prevent accidental duplicates: if this email already has a reminder
    // waiting to be sent, treat the repeat request as a no-op success rather
    // than scheduling (and later sending) a second reminder.
    const existing = await db
      .select({ id: donationReminders.id })
      .from(donationReminders)
      .where(and(eq(donationReminders.email, email), eq(donationReminders.status, 'scheduled')))
      .limit(1)

    if (existing.length === 0) {
      await db.insert(donationReminders).values({
        email,
        lang,
        status: 'scheduled',
        scheduledAt: new Date(Date.now() + REMINDER_DELAY_MS),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('reminder: unexpected error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
