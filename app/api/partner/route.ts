import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { contactName, orgName, orgEmail, orgPhone, website, country, city, sector, orgDesc, message, honeypot } = body

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ ok: true })
    }

    // Validate required fields
    if (!contactName || !orgName || !orgEmail || !website || !country || !city || !sector || !orgDesc || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Gwags Website" <${process.env.SMTP_USER}>`,
      to: process.env.PARTNERSHIPS_EMAIL || process.env.CONTACT_EMAIL || 'contact@gwags.org',
      subject: `New Partnership Inquiry — ${orgName}`,
      text: `
Contact: ${contactName}
Organization: ${orgName}
Email: ${orgEmail}
Phone: ${orgPhone || 'Not provided'}
Website: ${website}
Country: ${country}
City: ${city}
Sector: ${sector}

Organization Description:
${orgDesc}

Message:
${message}
      `.trim(),
      html: `
<p><strong>Contact:</strong> ${contactName}</p>
<p><strong>Organization:</strong> ${orgName}</p>
<p><strong>Email:</strong> ${orgEmail}</p>
<p><strong>Phone:</strong> ${orgPhone || 'Not provided'}</p>
<p><strong>Website:</strong> ${website}</p>
<p><strong>Country:</strong> ${country}</p>
<p><strong>City:</strong> ${city}</p>
<p><strong>Sector:</strong> ${sector}</p>
<hr />
<p><strong>Organization Description:</strong></p>
<p>${orgDesc.replace(/\n/g, '<br>')}</p>
<hr />
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Partner API error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
