import 'server-only'

/* Single place that decides which internal inbox a notification email goes
   to. Route handlers should call these instead of reading
   process.env.X_EMAIL (or worse, a literal address) directly — see the
   project's email-routing requirements: Scholars/Mbal Lekeaka/Network →
   programs@, Partnership/Contact → contact@, Stripe/donations → donate@. */

export function getProgramsEmail(): string {
  return process.env.PROGRAMS_EMAIL || 'programs@gwags.org'
}

export function getContactEmail(): string {
  return process.env.CONTACT_EMAIL || 'contact@gwags.org'
}

export function getDonationsEmail(): string {
  return process.env.DONATIONS_EMAIL || 'donate@gwags.org'
}
