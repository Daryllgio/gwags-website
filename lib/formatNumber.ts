import { Lang } from '@/lib/translations'

/** Strips everything but digits — this is the plain-number form that gets
 * stored in form state and submitted. */
export function stripThousands(raw: string): string {
  return raw.replace(/\D/g, '')
}

/** Formats a digit string with locale-appropriate thousand separators for
 * display only: commas for English, spaces for French. */
export function formatThousands(raw: string, lang: Lang): string {
  const digits = stripThousands(raw)
  if (!digits) return ''
  const separator = lang === 'fr' ? ' ' : ','
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}
