/* Single source of truth for donation amount rules, shared by the client
   donation overlay and every server payment route so the UI and the APIs can
   never drift to different minimums. */

/** Minimum donation amount in USD, for both one-time and monthly gifts.
   Every preset amount in the overlay is already >= this. */
export const MIN_DONATION_USD = 5

/** Description set on every standalone one-time donation PaymentIntent
   (create-payment-intent). Stripe never applies it to subscription invoice
   PaymentIntents, so it's the reliable marker that distinguishes a one-time
   gift from a monthly charge. Shared here so the webhook (which filters
   notifications by it) and the reminder cron (which checks eligibility by it)
   match the exact same string. */
export const ONE_TIME_DONATION_DESCRIPTION = 'Gwags One-time Donation'

/** True when `amount` (in whole USD) is a finite number at or above the
    minimum. Used identically on the client and in the payment APIs. */
export function isValidDonationAmount(amount: unknown): amount is number {
  return typeof amount === 'number' && Number.isFinite(amount) && amount >= MIN_DONATION_USD
}
