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
