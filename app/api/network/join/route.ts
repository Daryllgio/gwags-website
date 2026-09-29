import { NextRequest, NextResponse } from 'next/server'
import { getResendClient, getFromAddress, getFromEmail, escapeHtml, formatTimestamp, renderBrandedEmail } from '@/lib/mail'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { cleanText, isValidEmail } from '@/lib/validate'
import { uploadFormFile, deleteFormFile } from '@/lib/formUploads'

const FORM_TYPE = 'network-affiliation'

const CONFIRMATION_COPY: Record<string, { subject: string; body: string }> = {
  en: {
    subject: 'Your Gwags network affiliation submission has been received',
    body: 'Your submission has been received. You will receive an email confirmation shortly.',
  },
  fr: {
    subject: "Votre soumission d'affiliation au réseau Gwags a été reçue",
    body: 'Votre soumission a bien été reçue. Un courriel de confirmation vous sera envoyé sous peu.',
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

    const lang = formData.get('lang') === 'fr' ? 'fr' : 'en'
    const orgName = cleanText(formData.get('orgName'), 200)
    const yearEstablished = cleanText(formData.get('yearEstablished'), 10)
    const country = cleanText(formData.get('country'), 100)
    const region = cleanText(formData.get('region'), 150)
    const city = cleanText(formData.get('city'), 100)
    const sectorOther = cleanText(formData.get('sectorOther'), 150)
    const legalStatus = cleanText(formData.get('legalStatus'), 50)
    const orgEmail = cleanText(formData.get('orgEmail'), 200)
    const orgPhone = cleanText(formData.get('orgPhone'), 40)
    const website = cleanText(formData.get('website'), 200)
    const contactFirstName = cleanText(formData.get('contactFirstName'), 100)
    const contactLastName = cleanText(formData.get('contactLastName'), 100)
    const contactRole = cleanText(formData.get('contactRole'), 150)
    const contactEmail = cleanText(formData.get('contactEmail'), 200)
    const contactPhone = cleanText(formData.get('contactPhone'), 40)
    const teamSize = cleanText(formData.get('teamSize'), 20)
    const q1 = cleanText(formData.get('q1'), 3000)
    const q2 = cleanText(formData.get('q2'), 2000)
    const q3 = cleanText(formData.get('q3'), 3000)
    const referral = cleanText(formData.get('referral'), 50)
    const referralOther = cleanText(formData.get('referralOther'), 150)

    const sectors = parseJsonArray(formData.get('sectors')).filter((s): s is string => typeof s === 'string')
    const socialMediaRaw = parseJsonArray(formData.get('socialMedia'))
    const socialMedia = socialMediaRaw
      .filter((r): r is { platform: string; url: string } =>
        typeof r === 'object' && r !== null &&
        typeof (r as Record<string, unknown>).platform === 'string' &&
        typeof (r as Record<string, unknown>).url === 'string')
      .slice(0, 4)

    if (
      !orgName || !yearEstablished || !country || !region || !city || sectors.length === 0 ||
      !legalStatus || !contactFirstName || !contactLastName || !contactRole || !contactEmail || !contactPhone ||
      !teamSize || !q1 || !q2 || !q3
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isValidEmail(contactEmail)) {
      return NextResponse.json({ error: 'Invalid contact email address' }, { status: 400 })
    }
    if (orgEmail && !isValidEmail(orgEmail)) {
      return NextResponse.json({ error: 'Invalid organization email address' }, { status: 400 })
    }

    const needsLegalDoc = legalStatus === 'Registered nonprofit' || legalStatus === 'Other'
    let legalDocFile: File | null = null
    let legalDocPathname = ''
    if (needsLegalDoc) {
      const f = formData.get('legalDoc')
      if (!(f instanceof File) || f.size === 0) {
        return NextResponse.json({ error: 'Legal status document is required' }, { status: 400 })
      }
      legalDocFile = f
      const uploadResult = await uploadFormFile(FORM_TYPE, f)
      if (!uploadResult.ok) {
        return NextResponse.json({ error: uploadResult.message, code: uploadResult.code }, { status: uploadResult.code === 'storage_failure' ? 500 : 400 })
      }
      uploadedPathname = uploadResult.pathname
      legalDocPathname = uploadResult.pathname
    }

    const sectorDisplay = sectors.map(s => s === 'Other' ? (sectorOther || 'Other') : s).join(', ')
    const referralDisplay = referral === 'Other' ? (referralOther || 'Other') : (referral || 'Not provided')
    const socialDisplay = socialMedia.length > 0 ? socialMedia.map(r => `${r.platform}: ${r.url}`).join('\n') : 'Not provided'
    const uploadsText = legalDocFile
      ? `Legal status document:\n  Filename: ${legalDocFile.name}\n  Type: ${legalDocFile.type}\n  Size: ${legalDocFile.size} bytes\n  Blob pathname: ${legalDocPathname}`
      : 'No legal status document uploaded'
    const timestamp = formatTimestamp()

    const resend = getResendClient()

    const { error: adminError } = await resend.emails.send({
      from: getFromAddress(),
      to: process.env.PARTNERSHIPS_EMAIL || process.env.CONTACT_EMAIL || 'contact@gwags.org',
      replyTo: contactEmail,
      subject: `Network Affiliation Submission — ${orgName}`,
      text: `NETWORK AFFILIATION SUBMISSION

Organization: ${orgName}
Year established: ${yearEstablished}
Country: ${country}
Region/State: ${region}
City: ${city}
Sector(s): ${sectorDisplay}
Legal status: ${legalStatus}
Organization email: ${orgEmail || 'Not provided'}
Organization phone: ${orgPhone || 'Not provided'}
Website: ${website || 'Not provided'}
Social media:
${socialDisplay}

Contact: ${contactFirstName} ${contactLastName} (${contactRole})
Contact email: ${contactEmail}
Contact phone: ${contactPhone}
Number of team members: ${teamSize}

Mission and core activities:
${q1}

Communities/populations served:
${q2}

Why join the network:
${q3}

How did you hear about the network: ${referralDisplay}

${uploadsText}

Submitted: ${timestamp}`,
      html: `
<h2>Network Affiliation Submission</h2>
<p><strong>Organization:</strong> ${escapeHtml(orgName)}</p>
<p><strong>Year established:</strong> ${escapeHtml(yearEstablished)}</p>
<p><strong>Country:</strong> ${escapeHtml(country)}</p>
<p><strong>Region/State:</strong> ${escapeHtml(region)}</p>
<p><strong>City:</strong> ${escapeHtml(city)}</p>
<p><strong>Sector(s):</strong> ${escapeHtml(sectorDisplay)}</p>
<p><strong>Legal status:</strong> ${escapeHtml(legalStatus)}</p>
<p><strong>Organization email:</strong> ${escapeHtml(orgEmail || 'Not provided')}</p>
<p><strong>Organization phone:</strong> ${escapeHtml(orgPhone || 'Not provided')}</p>
<p><strong>Website:</strong> ${escapeHtml(website || 'Not provided')}</p>
<p><strong>Social media:</strong><br>${escapeHtml(socialDisplay).replace(/\n/g, '<br>')}</p>
<hr />
<p><strong>Contact:</strong> ${escapeHtml(contactFirstName)} ${escapeHtml(contactLastName)} (${escapeHtml(contactRole)})</p>
<p><strong>Contact email:</strong> ${escapeHtml(contactEmail)}</p>
<p><strong>Contact phone:</strong> ${escapeHtml(contactPhone)}</p>
<p><strong>Number of team members:</strong> ${escapeHtml(teamSize)}</p>
<hr />
<p><strong>Mission and core activities:</strong></p><p>${escapeHtml(q1).replace(/\n/g, '<br>')}</p>
<p><strong>Communities/populations served:</strong></p><p>${escapeHtml(q2).replace(/\n/g, '<br>')}</p>
<p><strong>Why join the network:</strong></p><p>${escapeHtml(q3).replace(/\n/g, '<br>')}</p>
<hr />
<p><strong>How did you hear about the network:</strong> ${escapeHtml(referralDisplay)}</p>
<hr />
<p><strong>Uploaded file:</strong></p>
<p>${escapeHtml(uploadsText).replace(/\n/g, '<br>')}</p>
<hr />
<p style="color:#888;font-size:12px;">Submitted: ${timestamp}</p>`,
    })

    if (adminError) {
      throw new Error('Failed to send notification email')
    }

    const confirmation = CONFIRMATION_COPY[lang]
    const { error: confirmError } = await resend.emails.send({
      from: getFromAddress(),
      to: contactEmail,
      replyTo: getFromEmail(),
      subject: confirmation.subject,
      html: renderBrandedEmail(`<p>${escapeHtml(confirmation.body)}</p>`),
      text: confirmation.body,
    })

    if (confirmError) {
      console.error('Network affiliation confirmation email error')
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (uploadedPathname) {
      await deleteFormFile(uploadedPathname).catch(() => {})
    }
    console.error('Network affiliation API error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
