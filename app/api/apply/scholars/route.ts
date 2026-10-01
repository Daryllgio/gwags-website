import { NextRequest, NextResponse } from 'next/server'
import { getResendClient, getFromAddress, getFromEmail, escapeHtml, formatTimestamp, renderBrandedEmail } from '@/lib/mail'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { cleanText, isValidEmail } from '@/lib/validate'
import { uploadFormFile, deleteFormFile } from '@/lib/formUploads'
import { getProgramsEmail } from '@/lib/emailRouting'
import { createSubmission, findSubmissionByIdempotencyKey } from '@/lib/db/submissions'
import { scholarsApplications } from '@/lib/db/schema'
import { isScholarsApplicationOpen } from '@/lib/featureFlags'

const FORM_TYPE = 'scholars-application'

const CONFIRMATION_COPY: Record<string, { subject: string; body: string }> = {
  en: {
    subject: 'Your Gwags Scholars Program application has been received',
    body: 'Your application has been received. You will receive an email confirmation shortly.',
  },
  fr: {
    subject: 'Votre candidature au programme Gwags Scholars a été reçue',
    body: 'Votre candidature a bien été reçue. Un courriel de confirmation vous sera envoyé sous peu.',
  },
}

export async function POST(req: NextRequest) {
  let uploadedPathname: string | null = null

  // Independent of middleware.ts's route-level block — never trust that a
  // request reaching this handler was already gated upstream.
  if (!isScholarsApplicationOpen()) {
    return NextResponse.json({ error: 'Applications are not currently open.' }, { status: 403 })
  }

  try {
    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const formData = await req.formData()

    if (typeof formData.get('honeypot') === 'string' && (formData.get('honeypot') as string).trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    const idempotencyKey = cleanText(formData.get('idempotencyKey'), 200)
    if (!idempotencyKey) {
      return NextResponse.json({ error: 'Missing idempotency key' }, { status: 400 })
    }

    const lang = formData.get('lang') === 'fr' ? 'fr' : 'en'
    const firstName = cleanText(formData.get('firstName'), 100)
    const lastName = cleanText(formData.get('lastName'), 100)
    const phone = cleanText(formData.get('phone'), 40)
    const email = cleanText(formData.get('email'), 200)
    const university = cleanText(formData.get('university'), 200)
    const fieldOfStudy = cleanText(formData.get('fieldOfStudy'), 150)
    const yearOfStudy = cleanText(formData.get('yearOfStudy'), 50)
    const writtenResponse = cleanText(formData.get('writtenResponse'), 20000)
    const referral = cleanText(formData.get('referral'), 50)
    const referralOther = cleanText(formData.get('referralOther'), 150)

    if (!firstName || !lastName || !phone || !email || !university || !fieldOfStudy || !yearOfStudy || !writtenResponse || !referral) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Idempotency check happens before any upload, so a retried/duplicated
    // submit request never re-uploads to Blob.
    const existing = await findSubmissionByIdempotencyKey(idempotencyKey)
    if (existing) {
      return NextResponse.json({ ok: true, referenceId: existing.referenceId })
    }

    const transcriptFile = formData.get('transcript')
    if (!(transcriptFile instanceof File) || transcriptFile.size === 0) {
      return NextResponse.json({ error: 'Academic transcript is required' }, { status: 400 })
    }

    const uploadResult = await uploadFormFile(FORM_TYPE, transcriptFile)
    if (!uploadResult.ok) {
      const status = uploadResult.code === 'storage_failure' ? 500 : 400
      return NextResponse.json({ error: uploadResult.message, code: uploadResult.code }, { status })
    }
    uploadedPathname = uploadResult.pathname

    const referralDisplay = referral === 'Other' ? (referralOther || 'Other') : (referral || 'Not provided')

    let result
    try {
      result = await createSubmission({
        formType: 'scholars_application',
        idempotencyKey,
        applicantName: `${firstName} ${lastName}`,
        applicantEmail: email,
        documents: [{
          category: 'academic_transcript',
          originalFilename: transcriptFile.name,
          blobPathname: uploadResult.pathname,
          mimeType: transcriptFile.type,
          fileSize: transcriptFile.size,
        }],
        insertFormRow: async (tx, submissionId) => {
          await tx.insert(scholarsApplications).values({
            submissionId,
            firstName, lastName, phone, email, university, fieldOfStudy, yearOfStudy, writtenResponse,
            referral,
            referralOther: referralOther || null,
          })
        },
      })
    } catch (dbErr) {
      if (uploadedPathname) await deleteFormFile(uploadedPathname).catch(() => {})
      console.error('Scholars application DB persistence error:', dbErr instanceof Error ? dbErr.message : 'unknown')
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
    }

    if (!result) {
      // Idempotency race: a concurrent request with the same key already
      // committed. Our upload is redundant — clean it up and return success.
      if (uploadedPathname) await deleteFormFile(uploadedPathname).catch(() => {})
      const raced = await findSubmissionByIdempotencyKey(idempotencyKey)
      return NextResponse.json({ ok: true, referenceId: raced?.referenceId })
    }

    // From here on, the application is durably persisted. Email failures are
    // notification-only problems — log them, never undo the submission.
    try {
      const resend = getResendClient()
      const timestamp = formatTimestamp()

      const { error: adminError } = await resend.emails.send({
        from: getFromAddress(),
        to: getProgramsEmail(),
        replyTo: email,
        subject: `Scholars Program Application — ${firstName} ${lastName}`,
        text: `GWAGS SCHOLARS PROGRAM APPLICATION

Reference: ${result.referenceId}
Name: ${firstName} ${lastName}
Phone: ${phone}
Email: ${email}
University: ${university}
Field of study: ${fieldOfStudy}
Current year of study: ${yearOfStudy}
How did you hear about this program: ${referralDisplay}

Written response:
${writtenResponse}

Academic transcript:
  Filename: ${transcriptFile.name}
  Type: ${transcriptFile.type}
  Size: ${transcriptFile.size} bytes
  Blob pathname: ${uploadResult.pathname}

Submitted: ${timestamp}`,
        html: `
<h2>Gwags Scholars Program Application</h2>
<p><strong>Reference:</strong> ${escapeHtml(result.referenceId)}</p>
<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>University:</strong> ${escapeHtml(university)}</p>
<p><strong>Field of study:</strong> ${escapeHtml(fieldOfStudy)}</p>
<p><strong>Current year of study:</strong> ${escapeHtml(yearOfStudy)}</p>
<p><strong>How did you hear about this program:</strong> ${escapeHtml(referralDisplay)}</p>
<hr />
<p><strong>Written response:</strong></p>
<p>${escapeHtml(writtenResponse).replace(/\n/g, '<br>')}</p>
<hr />
<p><strong>Academic transcript:</strong></p>
<p>Filename: ${escapeHtml(transcriptFile.name)}<br>Type: ${escapeHtml(transcriptFile.type)}<br>Size: ${transcriptFile.size} bytes<br>Blob pathname: ${escapeHtml(uploadResult.pathname)}</p>
<hr />
<p style="color:#888;font-size:12px;">Submitted: ${timestamp}</p>`,
      })
      if (adminError) console.error('Scholars application notification email error')

      const confirmation = CONFIRMATION_COPY[lang]
      const { error: confirmError } = await resend.emails.send({
        from: getFromAddress(),
        to: email,
        replyTo: getFromEmail(),
        subject: confirmation.subject,
        html: renderBrandedEmail(`<p>${escapeHtml(confirmation.body)}</p>`),
        text: confirmation.body,
      })
      if (confirmError) console.error('Scholars application confirmation email error')
    } catch (emailErr) {
      console.error('Scholars application: email step failed, submission already persisted:', emailErr instanceof Error ? emailErr.message : 'unknown')
    }

    return NextResponse.json({ ok: true, referenceId: result.referenceId })
  } catch (err) {
    if (uploadedPathname) {
      await deleteFormFile(uploadedPathname).catch(() => {})
    }
    console.error('Scholars application API error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
