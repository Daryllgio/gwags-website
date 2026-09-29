import { NextRequest, NextResponse } from 'next/server'
import { getResendClient, getFromAddress, getFromEmail, escapeHtml, formatTimestamp, renderBrandedEmail } from '@/lib/mail'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { cleanText, isValidEmail } from '@/lib/validate'
import { uploadFormFile, deleteFormFile } from '@/lib/formUploads'

const FORM_TYPE = 'scholars-application'

const CONFIRMATION_COPY: Record<string, { subject: string; body: string }> = {
  en: {
    subject: 'Your Gwags Scholars Program application has been received',
    body: 'Your application has been received. You will receive an email confirmation shortly.',
  },
  fr: {
    subject: 'Votre candidature au Programme de Bourses Gwags a été reçue',
    body: 'Votre candidature a bien été reçue. Un courriel de confirmation vous sera envoyé sous peu.',
  },
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

    if (!firstName || !lastName || !phone || !email || !university || !fieldOfStudy || !yearOfStudy || !writtenResponse) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
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
    const timestamp = formatTimestamp()

    const resend = getResendClient()

    const { error: adminError } = await resend.emails.send({
      from: getFromAddress(),
      to: process.env.CONTACT_EMAIL || 'contact@gwags.org',
      replyTo: email,
      subject: `Scholars Program Application — ${firstName} ${lastName}`,
      text: `GWAGS SCHOLARS PROGRAM APPLICATION

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

    if (adminError) {
      throw new Error('Failed to send notification email')
    }

    const confirmation = CONFIRMATION_COPY[lang]
    const { error: confirmError } = await resend.emails.send({
      from: getFromAddress(),
      to: email,
      replyTo: getFromEmail(),
      subject: confirmation.subject,
      html: renderBrandedEmail(`<p>${escapeHtml(confirmation.body)}</p>`),
      text: confirmation.body,
    })

    if (confirmError) {
      console.error('Scholars application confirmation email error')
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (uploadedPathname) {
      await deleteFormFile(uploadedPathname).catch(() => {})
    }
    console.error('Scholars application API error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
