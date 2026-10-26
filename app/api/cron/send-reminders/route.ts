import { NextRequest, NextResponse } from 'next/server'
import { and, eq, lte, sql } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { donationReminders } from '@/lib/db/schema'
import { getStripe } from '@/lib/stripe'
import { getResendClient, getFromAddress, renderBrandedEmail } from '@/lib/mail'

export const runtime = 'nodejs'

const MAX_ATTEMPTS = 3
const BATCH_LIMIT = 50

/* Temporary, reviewable bilingual draft (copy to be revised later). Warm and
   low-pressure: identifies Gwags, references the earlier request, links back
   to the donation page, and never implies obligation. */
function reminderEmail(lang: 'en' | 'fr', donateUrl: string): { subject: string; html: string } {
  if (lang === 'fr') {
    return {
      subject: 'Un petit rappel de Gwags',
      html: renderBrandedEmail(`
        <p>Bonjour,</p>
        <p>Vous nous aviez demandé de vous envoyer un petit rappel concernant un don à Gwags Global Impact Institution — le voici.</p>
        <p>Si le moment vous convient, vous pouvez contribuer ici :</p>
        <p><a href="${donateUrl}" style="color:#0A1128;font-weight:600;">Faire un don</a></p>
        <p>Il n'y a aucune obligation, et nous vous remercions sincèrement de l'intérêt que vous portez à notre mission.</p>
        <p>Bien cordialement,<br>L'équipe Gwags</p>
      `),
    }
  }
  return {
    subject: 'A gentle reminder from Gwags',
    html: renderBrandedEmail(`
      <p>Hello,</p>
      <p>You asked us to send you a gentle reminder about donating to Gwags Global Impact Institution — here it is.</p>
      <p>If the time feels right, you can contribute here:</p>
      <p><a href="${donateUrl}" style="color:#0A1128;font-weight:600;">Make a donation</a></p>
      <p>There's no obligation at all, and we genuinely appreciate your interest in our mission.</p>
      <p>Warm regards,<br>The Gwags Team</p>
    `),
  }
}

/* Best-effort "already donated?" check. Any Stripe error means we proceed to
   send the reminder rather than risk silently skipping a legitimate one. */
async function hasAlreadyDonated(email: string, since: Date): Promise<boolean> {
  try {
    const stripe = getStripe()
    const customers = await stripe.customers.list({ email, limit: 20 })
    for (const customer of customers.data) {
      const subs = await stripe.subscriptions.list({ customer: customer.id, status: 'active', limit: 5 })
      if (subs.data.length > 0) return true
      const charges = await stripe.charges.list({ customer: customer.id, limit: 10 })
      if (charges.data.some(c => c.paid && c.created * 1000 >= since.getTime())) return true
    }
    return false
  } catch (err) {
    console.error('send-reminders: donated-check failed, will send anyway:', err instanceof Error ? err.message : 'unknown')
    return false
  }
}

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (secret) return req.headers.get('authorization') === `Bearer ${secret}`
  // No secret configured: refuse in production (fail closed), allow locally so
  // the job can be exercised during development.
  return process.env.VERCEL_ENV !== 'production'
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const siteUrl = process.env.SITE_URL || req.nextUrl.origin
  const donateUrl = `${siteUrl}/get-involved?action=donate`

  const due = await db
    .select({ id: donationReminders.id, email: donationReminders.email, lang: donationReminders.lang, createdAt: donationReminders.createdAt })
    .from(donationReminders)
    .where(and(eq(donationReminders.status, 'scheduled'), lte(donationReminders.scheduledAt, now)))
    .limit(BATCH_LIMIT)

  let sent = 0, skipped = 0, failed = 0, claimedCount = 0

  for (const row of due) {
    // Claim atomically: only one runner wins this row, and the claim defers
    // scheduledAt so a failed send is retried next cycle instead of lost.
    const claimed = await db
      .update(donationReminders)
      .set({ attempts: sql`${donationReminders.attempts} + 1`, scheduledAt: sql`now() + interval '15 minutes'` })
      .where(and(eq(donationReminders.id, row.id), eq(donationReminders.status, 'scheduled'), lte(donationReminders.scheduledAt, now)))
      .returning({ attempts: donationReminders.attempts })
    if (claimed.length === 0) continue // another runner already took it
    claimedCount++
    const attempts = claimed[0].attempts

    try {
      if (await hasAlreadyDonated(row.email, row.createdAt)) {
        await db.update(donationReminders).set({ status: 'skipped' }).where(eq(donationReminders.id, row.id))
        skipped++
        continue
      }

      const lang = row.lang === 'fr' ? 'fr' : 'en'
      const { subject, html } = reminderEmail(lang, donateUrl)
      const resend = getResendClient()
      const { error } = await resend.emails.send({ from: getFromAddress(), to: row.email, subject, html })
      if (error) throw new Error(error.message)

      await db.update(donationReminders).set({ status: 'sent', sentAt: new Date(), lastError: null }).where(eq(donationReminders.id, row.id))
      sent++
    } catch (err) {
      const message = err instanceof Error ? err.message : 'unknown'
      if (attempts >= MAX_ATTEMPTS) {
        await db.update(donationReminders).set({ status: 'failed', lastError: message }).where(eq(donationReminders.id, row.id))
        failed++
      } else {
        // Leave it 'scheduled' (claim already deferred scheduledAt) so the next
        // run retries it; just record the latest error.
        await db.update(donationReminders).set({ status: 'scheduled', lastError: message }).where(eq(donationReminders.id, row.id))
      }
      console.error(`send-reminders: send failed for reminder ${row.id} (attempt ${attempts}):`, message)
    }
  }

  return NextResponse.json({ processed: claimedCount, sent, skipped, failed })
}
