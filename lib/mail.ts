import { Resend } from 'resend'

let client: Resend | null = null

export function getResendClient(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not set')
    }
    client = new Resend(apiKey)
  }
  return client
}

export function getFromAddress(): string {
  return process.env.RESEND_FROM_EMAIL || 'Gwags Website <onboarding@resend.dev>'
}

export function getFromEmail(): string {
  const match = getFromAddress().match(/<([^>]+)>/)
  return match ? match[1] : getFromAddress().trim()
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function formatTimestamp(): string {
  const formatted = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
  })
  return `${formatted} UTC`
}

const NAVY = '#0A1128'
const GOLD = '#D4AF37'

/* Shared navy/gold HTML wrapper for donor-facing emails outside the Stripe
   webhook (which keeps its own local copy — intentionally left untouched by
   this addition so existing donation email output/behavior is unaffected). */
export function renderBrandedEmail(bodyHtml: string): string {
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: ${NAVY};">
  <div style="margin-bottom: 24px;">
    <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: ${GOLD}; letter-spacing: 0.05em;">Gwags</span>
    <div style="font-size: 11px; letter-spacing: 0.15em; color: ${GOLD}; text-transform: uppercase; margin-top: 2px;">Global Impact Institution</div>
  </div>
  <div style="font-size: 15px; line-height: 1.7;">
    ${bodyHtml}
  </div>
  <hr style="border: none; border-top: 1px solid rgba(10,17,40,0.12); margin: 32px 0 16px;" />
  <p style="font-size: 12px; color: #6B6B6B; margin: 0;">Gwags Global Impact Institution</p>
</div>
  `.trim()
}
