import { NextRequest, NextResponse } from 'next/server'
import { getResendClient, getFromAddress, getFromEmail, escapeHtml, formatTimestamp, renderBrandedEmail } from '@/lib/mail'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { cleanText, isValidEmail } from '@/lib/validate'
import { getContactEmail } from '@/lib/emailRouting'
import { createSubmission, findSubmissionByIdempotencyKey, SocialLinkInput } from '@/lib/db/submissions'
import { partnershipSubmissions } from '@/lib/db/schema'

const CONFIRMATION_COPY: Record<string, { subject: string; body: string }> = {
  en: {
    subject: 'Your Gwags partnership inquiry has been received',
    body: 'Thank you. Your submission has been received.',
  },
  fr: {
    subject: "Votre demande de partenariat Gwags a été reçue",
    body: 'Merci. Votre soumission a été reçue.',
  },
}

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()

    // Honeypot — bots that fill this hidden field get a fake success.
    if (typeof body.honeypot === 'string' && body.honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    const idempotencyKey = cleanText(body.idempotencyKey, 200)
    if (!idempotencyKey) {
      return NextResponse.json({ error: 'Missing idempotency key' }, { status: 400 })
    }

    const lang = body.lang === 'fr' ? 'fr' : 'en'
    const contactName = cleanText(body.contactName, 100)
    const contactEmail = cleanText(body.contactEmail, 200)
    const contactPhone = cleanText(body.contactPhone, 40)
    const orgName = cleanText(body.orgName, 150)
    const orgEmail = cleanText(body.orgEmail, 200)
    const orgPhone = cleanText(body.orgPhone, 40)
    const website = cleanText(body.website, 200)
    const country = cleanText(body.country, 100)
    const region = cleanText(body.region, 150)
    const city = cleanText(body.city, 100)
    const sectorOther = cleanText(body.sectorOther, 150)
    const orgDesc = cleanText(body.orgDesc, 300)
    const message = cleanText(body.message, 1000)

    const sectors: string[] = Array.isArray(body.sectors) ? body.sectors.filter((s: unknown) => typeof s === 'string') : []
    const socialMedia: SocialLinkInput[] = Array.isArray(body.socialMedia)
      ? body.socialMedia
        .filter((r: unknown): r is { platform: string; url: string } =>
          typeof r === 'object' && r !== null &&
          typeof (r as Record<string, unknown>).platform === 'string' &&
          typeof (r as Record<string, unknown>).url === 'string')
        .slice(0, 4)
      : []

    if (!contactName || !contactEmail || !contactPhone || !orgName || !orgEmail || !country || !region || !city || sectors.length === 0 || !orgDesc || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isValidEmail(orgEmail) || !isValidEmail(contactEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const existing = await findSubmissionByIdempotencyKey(idempotencyKey)
    if (existing) {
      return NextResponse.json({ ok: true, referenceId: existing.referenceId })
    }

    let result
    try {
      result = await createSubmission({
        formType: 'partnership_submission',
        idempotencyKey,
        applicantName: contactName,
        applicantEmail: contactEmail,
        socialLinks: socialMedia,
        insertFormRow: async (tx, submissionId) => {
          await tx.insert(partnershipSubmissions).values({
            submissionId,
            contactName, contactEmail, contactPhone,
            orgName, orgEmail,
            orgPhone: orgPhone || null,
            website: website || null,
            country, region, city,
            sectors,
            sectorOther: sectors.includes('Other') ? (sectorOther || null) : null,
            orgDesc, message,
          })
        },
      })
    } catch (dbErr) {
      console.error('Partner DB persistence error:', dbErr instanceof Error ? dbErr.message : 'unknown')
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
    }

    if (!result) {
      const raced = await findSubmissionByIdempotencyKey(idempotencyKey)
      return NextResponse.json({ ok: true, referenceId: raced?.referenceId })
    }

    // From here on, the submission is durably persisted. Email failures are
    // notification-only problems — log them, never undo the submission.
    try {
      const timestamp = formatTimestamp()
      const phoneDisplay = orgPhone || 'Not provided'
      const websiteDisplay = website || 'Not provided'
      const sectorDisplay = sectors.map(s => s === 'Other' ? (sectorOther || 'Other') : s).join(', ')
      const socialDisplay = socialMedia.length > 0 ? socialMedia.map(r => `${r.platform}: ${r.url}`).join('\n') : 'Not provided'

      const resend = getResendClient()
      const { error } = await resend.emails.send({
        from: getFromAddress(),
        to: getContactEmail(),
        replyTo: contactEmail,
        subject: `Partnership Inquiry — ${orgName}`,
        text: `PARTNERSHIP INQUIRY

Reference: ${result.referenceId}
Contact: ${contactName}
Contact email: ${contactEmail}
Contact phone: ${contactPhone}
Organization: ${orgName}
Organization email: ${orgEmail}
Organization phone: ${phoneDisplay}
Website: ${websiteDisplay}
Social media:
${socialDisplay}
Country: ${country}
Region/State: ${region}
City: ${city}
Sector(s): ${sectorDisplay}

Organization Description:
${orgDesc}

Message:
${message}

Submitted: ${timestamp}`,
        html: `
<h2>Partnership Inquiry</h2>
<p><strong>Reference:</strong> ${escapeHtml(result.referenceId)}</p>
<p><strong>Contact:</strong> ${escapeHtml(contactName)}</p>
<p><strong>Contact email:</strong> ${escapeHtml(contactEmail)}</p>
<p><strong>Contact phone:</strong> ${escapeHtml(contactPhone)}</p>
<p><strong>Organization:</strong> ${escapeHtml(orgName)}</p>
<p><strong>Organization email:</strong> ${escapeHtml(orgEmail)}</p>
<p><strong>Organization phone:</strong> ${escapeHtml(phoneDisplay)}</p>
<p><strong>Website:</strong> ${escapeHtml(websiteDisplay)}</p>
<p><strong>Social media:</strong><br>${escapeHtml(socialDisplay).replace(/\n/g, '<br>')}</p>
<p><strong>Country:</strong> ${escapeHtml(country)}</p>
<p><strong>Region/State:</strong> ${escapeHtml(region)}</p>
<p><strong>City:</strong> ${escapeHtml(city)}</p>
<p><strong>Sector(s):</strong> ${escapeHtml(sectorDisplay)}</p>
<hr />
<p><strong>Organization Description:</strong></p>
<p>${escapeHtml(orgDesc).replace(/\n/g, '<br>')}</p>
<hr />
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
<hr />
<p style="color:#888;font-size:12px;">Submitted: ${timestamp}</p>`,
      })
      if (error) console.error('Partner notification email error:', error)

      const confirmation = CONFIRMATION_COPY[lang]
      const { error: confirmError } = await resend.emails.send({
        from: getFromAddress(),
        to: contactEmail,
        replyTo: getFromEmail(),
        subject: confirmation.subject,
        html: renderBrandedEmail(`<p>${escapeHtml(confirmation.body)}</p>`),
        text: confirmation.body,
      })
      if (confirmError) console.error('Partner confirmation email error')
    } catch (emailErr) {
      console.error('Partner: email step failed, submission already persisted:', emailErr instanceof Error ? emailErr.message : 'unknown')
    }

    return NextResponse.json({ ok: true, referenceId: result.referenceId })
  } catch (err) {
    console.error('Partner API error:', err)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
