import type { formTypeEnum } from './schema'

const PREFIXES: Record<(typeof formTypeEnum.enumValues)[number], string> = {
  scholars_application: 'SCH',
  mbal_lekeaka_fund_application: 'MLF',
  network_affiliation: 'NET',
  partnership_submission: 'PTN',
}

/** Human-readable, sortable-ish, not guaranteed globally sequential — the
 * `reference_id` column's UNIQUE constraint is the real guarantee; this just
 * makes collisions astronomically unlikely (~16.7M values per form type per
 * day) without needing a database sequence. */
export function generateReferenceId(formType: (typeof formTypeEnum.enumValues)[number]): string {
  const prefix = PREFIXES[formType]
  const now = new Date()
  const datePart = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}`
  const randomPart = crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()
  return `${prefix}-${datePart}-${randomPart}`
}
