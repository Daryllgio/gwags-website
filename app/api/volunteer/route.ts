import { NextRequest, NextResponse } from 'next/server'
import { getResendClient, getFromAddress, getFromEmail, escapeHtml, formatTimestamp, renderBrandedEmail } from '@/lib/mail'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { cleanText, isValidEmail } from '@/lib/validate'
import { uploadFormFile, deleteFormFile } from '@/lib/formUploads'
import { getProgramsEmail } from '@/lib/emailRouting'
import { createSubmission, findSubmissionByIdempotencyKey, DocumentInput } from '@/lib/db/submissions'
import { volunteerSubmissions } from '@/lib/db/schema'

const FORM_TYPE = 'volunteer'
const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB — larger than the shared 5 MB default

const CONFIRMATION_COPY: Record<string, { subject: string; body: string }> = {
  en: {
    subject: 'Your Gwags volunteer application has been received',
    body: 'Your application has been received. You will receive an email confirmation shortly.',
  },
  fr: {
    subject: 'Votre candidature de bénévolat Gwags a été reçue',
    body: 'Votre candidature a bien été reçue. Un courriel de confirmation vous sera envoyé sous peu.',
  },
}

function parseJsonArray(value: FormDataEntryValue | null): unknown[] {
  if (typeof value !== 'string') return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function POST(req: NextRequest) {
  let uploadedPathname: string | null = null

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
    const dateOfBirth = cleanText(formData.get('dateOfBirth'), 10)
    const gender = cleanText(formData.get('gender'), 50)
    const email = cleanText(formData.get('email'), 200)
    const phone = cleanText(formData.get('phone'), 40)
    const country = cleanText(formData.get('country'), 100)
    const region = cleanText(formData.get('region'), 150)
    const city = cleanText(formData.get('city'), 100)
    const currentStatus = cleanText(formData.get('currentStatus'), 50)
    const fieldOrProfession = cleanText(formData.get('fieldOrProfession'), 200)
    const availability = cleanText(formData.get('availability'), 50)
    const skillsOther = cleanText(formData.get('skillsOther'), 200)
    const referral = cleanText(formData.get('referral'), 50)
    const referralOther = cleanText(formData.get('referralOther'), 150)

    const languages = parseJsonArray(formData.get('languages')).filter((s): s is string => typeof s === 'string')
    const skills = parseJsonArray(formData.get('skills')).filter((s): s is string => typeof s === 'string')

    // fieldOrProfession is the single conditional field below Current Status
    // (Field of Study / Job Title / Occupation / Please Specify) — required
    // for every status except Unemployed, which has no conditional field.
    if (
      !firstName || !lastName || !dateOfBirth || !gender || !email || !phone ||
      !country || !region || !city || !currentStatus ||
      (currentStatus !== 'Unemployed' && !fieldOrProfession) ||
      languages.length === 0 || skills.length === 0 || !availability || !referral
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
      return NextResponse.json({ error: 'Invalid date of birth' }, { status: 400 })
    }

    // Idempotency check happens before any upload, so a retried/duplicated
    // submit request never re-uploads to Blob.
    const existing = await findSubmissionByIdempotencyKey(idempotencyKey)
    if (existing) {
      return NextResponse.json({ ok: true, referenceId: existing.referenceId })
    }

    const cvFile = formData.get('cv')
    if (!(cvFile instanceof File) || cvFile.size === 0) {
      return NextResponse.json({ error: 'CV or résumé is required' }, { status: 400 })
    }

    const uploadResult = await uploadFormFile(FORM_TYPE, cvFile, MAX_CV_SIZE_BYTES)
    if (!uploadResult.ok) {
      const httpStatus = uploadResult.code === 'storage_failure' ? 500 : 400
      return NextResponse.json({ error: uploadResult.message, code: uploadResult.code }, { status: httpStatus })
    }
    uploadedPathname = uploadResult.pathname

    const documents: DocumentInput[] = [{
      category: 'cv_resume',
      originalFilename: cvFile.name,
      blobPathname: uploadResult.pathname,
      mimeType: cvFile.type,
      fileSize: cvFile.size,
    }]

    let result
    try {
      result = await createSubmission({
        formType: 'volunteer_submission',
        idempotencyKey,
        applicantName: `${firstName} ${lastName}`,
        applicantEmail: email,
        documents,
        insertFormRow: async (tx, submissionId) => {
          await tx.insert(volunteerSubmissions).values({
            submissionId,
            firstName, lastName,
            dateOfBirth,
            gender, email, phone,
            country, region, city,
            currentStatus,
            fieldOrProfession: fieldOrProfession || null,
            languages,
            skills,
            skillsOther: skills.includes('Other') ? (skillsOther || null) : null,
            availability,
            referral,
            referralOther: referral === 'Other' ? (referralOther || null) : null,
          })
        },
      })
    } catch (dbErr) {
      if (uploadedPathname) await deleteFormFile(uploadedPathname).catch(() => {})
      console.error('Volunteer application DB persistence error:', dbErr instanceof Error ? dbErr.message : 'unknown')
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
      const skillsDisplay = skills.map(s => s === 'Other' ? (skillsOther || 'Other') : s).join(', ')
      const referralDisplay = referral === 'Other' ? (referralOther || 'Other') : referral
      const languagesDisplay = languages.join(', ')
      const timestamp = formatTimestamp()

      // The conditional field below Current Status has a different label
      // per status (and no field at all for Unemployed) — mirror that here
      // so the internal notification clearly identifies what the value means.
      const conditionalFieldLabel =
        currentStatus === 'Student' ? 'Field of Study'
        : currentStatus === 'Employed' ? 'Current Job Title or Role'
        : currentStatus === 'Self-employed' ? 'Occupation or Business Activity'
        : currentStatus === 'Other' ? 'Please Specify'
        : null

      const resend = getResendClient()

      const { error: adminError } = await resend.emails.send({
        from: getFromAddress(),
        to: getProgramsEmail(),
        replyTo: email,
        subject: `Volunteer Application — ${firstName} ${lastName}`,
        text: `GWAGS VOLUNTEER APPLICATION

Reference: ${result.referenceId}
Name: ${firstName} ${lastName}
Date of birth: ${dateOfBirth}
Gender: ${gender}
Email: ${email}
Phone: ${phone}
Country: ${country}
Region/State: ${region}
City: ${city}

Current status: ${currentStatus}${conditionalFieldLabel ? `
${conditionalFieldLabel}: ${fieldOrProfession}` : ''}
Languages spoken: ${languagesDisplay}

Skills: ${skillsDisplay}
Availability per week: ${availability}

How did you hear about Gwags: ${referralDisplay}

CV / résumé:
  Filename: ${cvFile.name}
  Type: ${cvFile.type}
  Size: ${cvFile.size} bytes
  Blob pathname: ${uploadResult.pathname}

Submitted: ${timestamp}`,
        html: `
<h2>Gwags Volunteer Application</h2>
<p><strong>Reference:</strong> ${escapeHtml(result.referenceId)}</p>
<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
<p><strong>Date of birth:</strong> ${escapeHtml(dateOfBirth)}</p>
<p><strong>Gender:</strong> ${escapeHtml(gender)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
<p><strong>Country:</strong> ${escapeHtml(country)}</p>
<p><strong>Region/State:</strong> ${escapeHtml(region)}</p>
<p><strong>City:</strong> ${escapeHtml(city)}</p>
<hr />
<p><strong>Current status:</strong> ${escapeHtml(currentStatus)}</p>
${conditionalFieldLabel ? `<p><strong>${escapeHtml(conditionalFieldLabel)}:</strong> ${escapeHtml(fieldOrProfession)}</p>` : ''}
<p><strong>Languages spoken:</strong> ${escapeHtml(languagesDisplay)}</p>
<hr />
<p><strong>Skills:</strong> ${escapeHtml(skillsDisplay)}</p>
<p><strong>Availability per week:</strong> ${escapeHtml(availability)}</p>
<hr />
<p><strong>How did you hear about Gwags:</strong> ${escapeHtml(referralDisplay)}</p>
<hr />
<p><strong>CV / résumé:</strong></p>
<p>Filename: ${escapeHtml(cvFile.name)}<br>Type: ${escapeHtml(cvFile.type)}<br>Size: ${cvFile.size} bytes<br>Blob pathname: ${escapeHtml(uploadResult.pathname)}</p>
<hr />
<p style="color:#888;font-size:12px;">Submitted: ${timestamp}</p>`,
      })
      if (adminError) console.error('Volunteer application notification email error')

      const confirmation = CONFIRMATION_COPY[lang]
      const { error: confirmError } = await resend.emails.send({
        from: getFromAddress(),
        to: email,
        replyTo: getFromEmail(),
        subject: confirmation.subject,
        html: renderBrandedEmail(`<p>${escapeHtml(confirmation.body)}</p>`),
        text: confirmation.body,
      })
      if (confirmError) console.error('Volunteer application confirmation email error')
    } catch (emailErr) {
      console.error('Volunteer application: email step failed, submission already persisted:', emailErr instanceof Error ? emailErr.message : 'unknown')
    }

    return NextResponse.json({ ok: true, referenceId: result.referenceId })
  } catch (err) {
    if (uploadedPathname) {
      await deleteFormFile(uploadedPathname).catch(() => {})
    }
    console.error('Volunteer application API error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
