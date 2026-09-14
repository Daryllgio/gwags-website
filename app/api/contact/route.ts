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
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    const firstName = cleanText(body.firstName, 100)
    const lastName = cleanText(body.lastName, 100)
    const email = cleanText(body.email, 200)
    const phone = cleanText(body.phone, 40)
    const country = cleanText(body.country, 100)
    const city = cleanText(body.city, 100)
    const message = cleanText(body.message, 500)

    if (!firstName || !lastName || !email || !country || !city || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const timestamp = formatTimestamp()
    const phoneDisplay = phone || 'Not provided'

    const resend = getResendClient()
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: process.env.CONTACT_EMAIL || 'contact@gwags.org',
      replyTo: email,
      subject: `New Contact Inquiry from ${firstName} ${lastName}`,
      text: `New Contact Inquiry

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phoneDisplay}
Country: ${country}
City: ${city}

Message:
${message}

Submitted: ${timestamp}`,
      html: `
<h2>New Contact Inquiry</h2>
<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phoneDisplay)}</p>
<p><strong>Country:</strong> ${escapeHtml(country)}</p>
<p><strong>City:</strong> ${escapeHtml(city)}</p>
<hr />
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
<hr />
<p style="color:#888;font-size:12px;">Submitted: ${timestamp}</p>`,
    })

    if (error) {
      console.error('Contact API Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
