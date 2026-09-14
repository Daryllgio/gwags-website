import { NextRequest, NextResponse } from 'next/server'
import { getResendClient, getFromAddress, escapeHtml, formatTimestamp } from '@/lib/mail'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'
import { cleanText, isValidEmail } from '@/lib/validate'

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

    const contactName = cleanText(body.contactName, 100)
    const orgName = cleanText(body.orgName, 150)
    const orgEmail = cleanText(body.orgEmail, 200)
    const orgPhone = cleanText(body.orgPhone, 40)
    const website = cleanText(body.website, 200)
    const country = cleanText(body.country, 100)
    const city = cleanText(body.city, 100)
    const sector = cleanText(body.sector, 150)
    const orgDesc = cleanText(body.orgDesc, 300)
    const message = cleanText(body.message, 1000)

    if (!contactName || !orgName || !orgEmail || !country || !city || !sector || !orgDesc || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isValidEmail(orgEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const timestamp = formatTimestamp()
    const phoneDisplay = orgPhone || 'Not provided'
    const websiteDisplay = website || 'Not provided'

    const resend = getResendClient()
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: process.env.PARTNERSHIPS_EMAIL || process.env.CONTACT_EMAIL || 'contact@gwags.org',
      replyTo: orgEmail,
      subject: `Partnership Inquiry — ${orgName}`,
      text: `PARTNERSHIP INQUIRY

Contact: ${contactName}
Organization: ${orgName}
Email: ${orgEmail}
Phone: ${phoneDisplay}
Website: ${websiteDisplay}
Country: ${country}
City: ${city}
Sector: ${sector}

Organization Description:
${orgDesc}

Message:
${message}

Submitted: ${timestamp}`,
      html: `
<h2>Partnership Inquiry</h2>
<p><strong>Contact:</strong> ${escapeHtml(contactName)}</p>
<p><strong>Organization:</strong> ${escapeHtml(orgName)}</p>
<p><strong>Email:</strong> ${escapeHtml(orgEmail)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phoneDisplay)}</p>
<p><strong>Website:</strong> ${escapeHtml(websiteDisplay)}</p>
<p><strong>Country:</strong> ${escapeHtml(country)}</p>
<p><strong>City:</strong> ${escapeHtml(city)}</p>
<p><strong>Sector:</strong> ${escapeHtml(sector)}</p>
<hr />
<p><strong>Organization Description:</strong></p>
<p>${escapeHtml(orgDesc).replace(/\n/g, '<br>')}</p>
<hr />
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
<hr />
<p style="color:#888;font-size:12px;">Submitted: ${timestamp}</p>`,
    })

    if (error) {
      console.error('Partner API Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Partner API error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
