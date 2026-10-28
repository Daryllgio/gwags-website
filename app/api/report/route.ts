import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { problemReports } from '@/lib/db/schema'
import { getResendClient, getFromAddress, escapeHtml, formatTimestamp, renderBrandedEmail } from '@/lib/mail'
import { getDonationsEmail } from '@/lib/emailRouting'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { cleanText, isValidEmail } from '@/lib/validate'

export const runtime = 'nodejs'

const MAX_DESCRIPTION = 5000

function generateReferenceId(): string {
  const now = new Date()
  const datePart = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}`
  const randomPart = crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()
  return `RPT-${datePart}-${randomPart}`
}

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json().catch(() => ({}))
    // The donation overlay's report form sends { message }. name/email/category
    // are accepted if ever added to the form, but never required.
    const description = cleanText(body.message, MAX_DESCRIPTION)
    const name = cleanText(body.name, 120) || null
    const emailRaw = cleanText(body.email, 200)
    const email = emailRaw && isValidEmail(emailRaw) ? emailRaw : null
    const category = cleanText(body.category, 120) || null

    if (!description) {
      return NextResponse.json({ error: 'A problem description is required.' }, { status: 400 })
    }

    const referenceId = generateReferenceId()

    // Persist FIRST so a later Resend failure never loses the report.
    let reportId: string
    try {
      const [row] = await db
        .insert(problemReports)
        .values({ referenceId, name, email, category, description })
        .returning({ id: problemReports.id })
      reportId = row.id
    } catch (dbErr) {
      console.error('report: DB insert failed:', dbErr instanceof Error ? dbErr.message : 'unknown')
      return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }

    // Internal notification — the full, unmodified description is included so
    // staff can read the issue straight from the email without the DB.
    try {
      const resend = getResendClient()
      const timestamp = formatTimestamp()
      const { error } = await resend.emails.send({
        from: getFromAddress(),
        to: getDonationsEmail(),
        replyTo: email || undefined,
        subject: 'Gwags Donation Support — New Problem Report',
        text:
`GWAGS DONATION SUPPORT — NEW PROBLEM REPORT

Reference: ${referenceId}
Submitted: ${timestamp}

Problem description:
${description}`,
        html: renderBrandedEmail(`
          <h2 style="font-size:18px;margin:0 0 16px;">New problem report</h2>
          <p style="margin:0 0 6px;"><strong>Reference:</strong> ${escapeHtml(referenceId)}</p>
          <p style="margin:0 0 6px;"><strong>Submitted:</strong> ${escapeHtml(timestamp)}</p>
          <hr style="border:none;border-top:1px solid rgba(10,17,40,0.12);margin:16px 0;" />
          <p style="margin:0 0 8px;"><strong>Problem description:</strong></p>
          <p style="margin:0;white-space:pre-wrap;">${escapeHtml(description)}</p>
        `),
      })
      if (error) throw new Error(error.message)
      await db.update(problemReports).set({ notificationStatus: 'sent', updatedAt: new Date() }).where(eq(problemReports.id, reportId))
    } catch (mailErr) {
      // Report is already safely stored; just record that the email didn't send.
      console.error('report: notification email failed, report stored:', mailErr instanceof Error ? mailErr.message : 'unknown')
      await db.update(problemReports).set({ notificationStatus: 'failed', updatedAt: new Date() }).where(eq(problemReports.id, reportId)).catch(() => {})
    }

    return NextResponse.json({ success: true, referenceId })
  } catch (err) {
    console.error('report: unexpected error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
