import { NextRequest, NextResponse } from 'next/server'
import { getResendClient, getFromAddress, getFromEmail, escapeHtml, formatTimestamp, renderBrandedEmail } from '@/lib/mail'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { cleanText, isValidEmail } from '@/lib/validate'
import { uploadFormFile, deleteFormFile, UploadFormFileResult } from '@/lib/formUploads'
import { getProgramsEmail } from '@/lib/emailRouting'
import { createSubmission, findSubmissionByIdempotencyKey, DocumentInput, SocialLinkInput } from '@/lib/db/submissions'
import { mbalLekeakaFundApplications } from '@/lib/db/schema'

const FORM_TYPE = 'mbal-lekeaka-fund-application'

const CONFIRMATION_COPY: Record<string, { subject: string; body: string }> = {
  en: {
    subject: 'Your Mbal Lekeaka Fund application has been received',
    body: 'Your application has been received. You will receive an email confirmation shortly.',
  },
  fr: {
    subject: 'Votre candidature au Fonds Mbal Lekeaka a été reçue',
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

function fileMeta(label: string, file: File, result: UploadFormFileResult): string {
  if (!result.ok) return ''
  return `${label}:\n  Filename: ${file.name}\n  Type: ${file.type}\n  Size: ${file.size} bytes\n  Blob pathname: ${result.pathname}`
}

export async function POST(req: NextRequest) {
  const uploadedPathnames: string[] = []

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
    const orgName = cleanText(formData.get('orgName'), 200)
    const yearEstablished = cleanText(formData.get('yearEstablished'), 10)
    const country = cleanText(formData.get('country'), 100)
    const region = cleanText(formData.get('region'), 150)
    const city = cleanText(formData.get('city'), 100)
    const sectorOther = cleanText(formData.get('sectorOther'), 150)
    const hasLegalStatus = cleanText(formData.get('hasLegalStatus'), 10)
    const website = cleanText(formData.get('website'), 200)
    const contactFirstName = cleanText(formData.get('contactFirstName'), 100)
    const contactLastName = cleanText(formData.get('contactLastName'), 100)
    const contactRole = cleanText(formData.get('contactRole'), 150)
    const contactPhone = cleanText(formData.get('contactPhone'), 40)
    const contactEmail = cleanText(formData.get('contactEmail'), 200)
    const projectTitle = cleanText(formData.get('projectTitle'), 200)
    const projectCountry = cleanText(formData.get('projectCountry'), 100)
    const projectRegion = cleanText(formData.get('projectRegion'), 150)
    const projectCity = cleanText(formData.get('projectCity'), 100)
    const targetBeneficiaries = cleanText(formData.get('targetBeneficiaries'), 300)
    const estimatedBeneficiaries = cleanText(formData.get('estimatedBeneficiaries'), 20)
    const startDate = cleanText(formData.get('startDate'), 10)
    const endDate = cleanText(formData.get('endDate'), 10)
    const totalBudget = cleanText(formData.get('totalBudget'), 100)
    const amountRequested = cleanText(formData.get('amountRequested'), 100)
    const q1 = cleanText(formData.get('q1'), 3000)
    const q2 = cleanText(formData.get('q2'), 5000)
    const q3 = cleanText(formData.get('q3'), 2000)
    const q4 = cleanText(formData.get('q4'), 2000)
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
      !hasLegalStatus || !contactFirstName || !contactLastName || !contactRole || !contactPhone || !contactEmail ||
      !projectTitle || !projectCountry || !projectRegion || !projectCity || !targetBeneficiaries ||
      !estimatedBeneficiaries || !startDate || !endDate || !totalBudget || !amountRequested || !q1 || !q2 || !q3 || !referral
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isValidEmail(contactEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    if (endDate < startDate) {
      return NextResponse.json({ error: 'The proposed end date must be after the proposed start date.' }, { status: 400 })
    }
    const yearEstablishedNum = parseInt(yearEstablished, 10)
    const estimatedBeneficiariesNum = parseInt(estimatedBeneficiaries, 10)
    if (!Number.isFinite(yearEstablishedNum) || !Number.isFinite(estimatedBeneficiariesNum)) {
      return NextResponse.json({ error: 'Invalid numeric field' }, { status: 400 })
    }

    // Idempotency check happens before any upload, so a retried/duplicated
    // submit request never re-uploads to Blob.
    const existing = await findSubmissionByIdempotencyKey(idempotencyKey)
    if (existing) {
      return NextResponse.json({ ok: true, referenceId: existing.referenceId })
    }

    let legalDocResult: UploadFormFileResult | null = null
    let legalDocFile: File | null = null
    if (hasLegalStatus === 'yes') {
      const f = formData.get('legalDoc')
      if (!(f instanceof File) || f.size === 0) {
        return NextResponse.json({ error: 'Legal status document is required' }, { status: 400 })
      }
      legalDocFile = f
      legalDocResult = await uploadFormFile(FORM_TYPE, f)
      if (!legalDocResult.ok) {
        return NextResponse.json({ error: legalDocResult.message, code: legalDocResult.code }, { status: legalDocResult.code === 'storage_failure' ? 500 : 400 })
      }
      uploadedPathnames.push(legalDocResult.pathname)
    }

    const budgetFile = formData.get('detailedBudget')
    if (!(budgetFile instanceof File) || budgetFile.size === 0) {
      return NextResponse.json({ error: 'Detailed budget is required' }, { status: 400 })
    }
    const budgetResult = await uploadFormFile(FORM_TYPE, budgetFile)
    if (!budgetResult.ok) {
      for (const p of uploadedPathnames) await deleteFormFile(p).catch(() => {})
      return NextResponse.json({ error: budgetResult.message, code: budgetResult.code }, { status: budgetResult.code === 'storage_failure' ? 500 : 400 })
    }
    uploadedPathnames.push(budgetResult.pathname)

    const documents: DocumentInput[] = []
    if (legalDocFile && legalDocResult?.ok) {
      documents.push({
        category: 'legal_status_proof',
        originalFilename: legalDocFile.name,
        blobPathname: legalDocResult.pathname,
        mimeType: legalDocFile.type,
        fileSize: legalDocFile.size,
      })
    }
    documents.push({
      category: 'detailed_budget',
      originalFilename: budgetFile.name,
      blobPathname: budgetResult.pathname,
      mimeType: budgetFile.type,
      fileSize: budgetFile.size,
    })
    const socialLinks: SocialLinkInput[] = socialMedia

    let result
    try {
      result = await createSubmission({
        formType: 'mbal_lekeaka_fund_application',
        idempotencyKey,
        applicantName: `${contactFirstName} ${contactLastName}`,
        applicantEmail: contactEmail,
        documents,
        socialLinks,
        insertFormRow: async (tx, submissionId) => {
          await tx.insert(mbalLekeakaFundApplications).values({
            submissionId,
            orgName,
            yearEstablished: yearEstablishedNum,
            country, region, city,
            sectors,
            sectorOther: sectors.includes('Other') ? (sectorOther || null) : null,
            hasLegalStatus: hasLegalStatus === 'yes',
            website: website || null,
            contactFirstName, contactLastName, contactRole, contactPhone, contactEmail,
            projectTitle, projectCountry, projectRegion, projectCity,
            targetBeneficiaries,
            estimatedBeneficiaries: estimatedBeneficiariesNum,
            startDate, endDate, totalBudget, amountRequested,
            q1, q2, q3,
            q4: q4 || null,
            referral,
            referralOther: referralOther || null,
          })
        },
      })
    } catch (dbErr) {
      for (const p of uploadedPathnames) await deleteFormFile(p).catch(() => {})
      console.error('Mbal Lekeaka application DB persistence error:', dbErr instanceof Error ? dbErr.message : 'unknown')
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
    }

    if (!result) {
      for (const p of uploadedPathnames) await deleteFormFile(p).catch(() => {})
      const raced = await findSubmissionByIdempotencyKey(idempotencyKey)
      return NextResponse.json({ ok: true, referenceId: raced?.referenceId })
    }

    // From here on, the application is durably persisted. Email failures are
    // notification-only problems — log them, never undo the submission.
    try {
      const sectorDisplay = sectors.map(s => s === 'Other' ? (sectorOther || 'Other') : s).join(', ')
      const referralDisplay = referral === 'Other' ? (referralOther || 'Other') : (referral || 'Not provided')
      const socialDisplay = socialMedia.length > 0 ? socialMedia.map(r => `${r.platform}: ${r.url}`).join('\n') : 'Not provided'
      const timestamp = formatTimestamp()
      const uploadsText = [
        legalDocFile && legalDocResult ? fileMeta('Legal status document', legalDocFile, legalDocResult) : '',
        fileMeta('Detailed budget', budgetFile, budgetResult),
      ].filter(Boolean).join('\n\n')

      const resend = getResendClient()

      const { error: adminError } = await resend.emails.send({
        from: getFromAddress(),
        to: getProgramsEmail(),
        replyTo: contactEmail,
        subject: `Mbal Lekeaka Fund Application — ${orgName}`,
        text: `MBAL LEKEAKA FUND APPLICATION

Reference: ${result.referenceId}
Organization: ${orgName}
Year established: ${yearEstablished}
Country: ${country}
Region/State: ${region}
City: ${city}
Sector(s): ${sectorDisplay}
Holds legal status: ${hasLegalStatus === 'yes' ? 'Yes' : 'No'}
Website: ${website || 'Not provided'}
Social media:
${socialDisplay}

Contact: ${contactFirstName} ${contactLastName} (${contactRole})
Contact phone: ${contactPhone}
Contact email: ${contactEmail}

Project title: ${projectTitle}
Project country: ${projectCountry}
Project region/state: ${projectRegion}
Project city: ${projectCity}
Target beneficiaries: ${targetBeneficiaries}
Estimated number of beneficiaries: ${estimatedBeneficiaries}
Proposed start date: ${startDate}
Proposed end date: ${endDate}
Total project budget: ${totalBudget}
Amount requested from Gwags: ${amountRequested}

Q1 — Need addressed:
${q1}

Q2 — Implementation approach:
${q2}

Q3 — Expected outcomes:
${q3}

Q4 — Post-grant continuity:
${q4 || 'Not provided'}

How did you hear about this fund: ${referralDisplay}

${uploadsText}

Submitted: ${timestamp}`,
        html: `
<h2>Mbal Lekeaka Fund Application</h2>
<p><strong>Reference:</strong> ${escapeHtml(result.referenceId)}</p>
<p><strong>Organization:</strong> ${escapeHtml(orgName)}</p>
<p><strong>Year established:</strong> ${escapeHtml(yearEstablished)}</p>
<p><strong>Country:</strong> ${escapeHtml(country)}</p>
<p><strong>Region/State:</strong> ${escapeHtml(region)}</p>
<p><strong>City:</strong> ${escapeHtml(city)}</p>
<p><strong>Sector(s):</strong> ${escapeHtml(sectorDisplay)}</p>
<p><strong>Holds legal status:</strong> ${hasLegalStatus === 'yes' ? 'Yes' : 'No'}</p>
<p><strong>Website:</strong> ${escapeHtml(website || 'Not provided')}</p>
<p><strong>Social media:</strong><br>${escapeHtml(socialDisplay).replace(/\n/g, '<br>')}</p>
<hr />
<p><strong>Contact:</strong> ${escapeHtml(contactFirstName)} ${escapeHtml(contactLastName)} (${escapeHtml(contactRole)})</p>
<p><strong>Contact phone:</strong> ${escapeHtml(contactPhone)}</p>
<p><strong>Contact email:</strong> ${escapeHtml(contactEmail)}</p>
<hr />
<p><strong>Project title:</strong> ${escapeHtml(projectTitle)}</p>
<p><strong>Project country:</strong> ${escapeHtml(projectCountry)}</p>
<p><strong>Project region/state:</strong> ${escapeHtml(projectRegion)}</p>
<p><strong>Project city:</strong> ${escapeHtml(projectCity)}</p>
<p><strong>Target beneficiaries:</strong> ${escapeHtml(targetBeneficiaries)}</p>
<p><strong>Estimated number of beneficiaries:</strong> ${escapeHtml(estimatedBeneficiaries)}</p>
<p><strong>Proposed start date:</strong> ${escapeHtml(startDate)}</p>
<p><strong>Proposed end date:</strong> ${escapeHtml(endDate)}</p>
<p><strong>Total project budget:</strong> ${escapeHtml(totalBudget)}</p>
<p><strong>Amount requested from Gwags:</strong> ${escapeHtml(amountRequested)}</p>
<hr />
<p><strong>Need addressed:</strong></p><p>${escapeHtml(q1).replace(/\n/g, '<br>')}</p>
<p><strong>Implementation approach:</strong></p><p>${escapeHtml(q2).replace(/\n/g, '<br>')}</p>
<p><strong>Expected outcomes:</strong></p><p>${escapeHtml(q3).replace(/\n/g, '<br>')}</p>
<p><strong>Post-grant continuity:</strong></p><p>${escapeHtml(q4 || 'Not provided').replace(/\n/g, '<br>')}</p>
<hr />
<p><strong>How did you hear about this fund:</strong> ${escapeHtml(referralDisplay)}</p>
<hr />
<p><strong>Uploaded files:</strong></p>
<p>${escapeHtml(uploadsText).replace(/\n/g, '<br>')}</p>
<hr />
<p style="color:#888;font-size:12px;">Submitted: ${timestamp}</p>`,
      })
      if (adminError) console.error('Mbal Lekeaka application notification email error')

      const confirmation = CONFIRMATION_COPY[lang]
      const { error: confirmError } = await resend.emails.send({
        from: getFromAddress(),
        to: contactEmail,
        replyTo: getFromEmail(),
        subject: confirmation.subject,
        html: renderBrandedEmail(`<p>${escapeHtml(confirmation.body)}</p>`),
        text: confirmation.body,
      })
      if (confirmError) console.error('Mbal Lekeaka application confirmation email error')
    } catch (emailErr) {
      console.error('Mbal Lekeaka application: email step failed, submission already persisted:', emailErr instanceof Error ? emailErr.message : 'unknown')
    }

    return NextResponse.json({ ok: true, referenceId: result.referenceId })
  } catch (err) {
    for (const p of uploadedPathnames) await deleteFormFile(p).catch(() => {})
    console.error('Mbal Lekeaka application API error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
