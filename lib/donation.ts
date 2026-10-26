/* Single source of truth for donation amount rules, shared by the client
   donation overlay and every server payment route so the UI and the APIs can
   never drift to different minimums. */

/** Minimum donation amount in USD, for both one-time and monthly gifts.
   Every preset amount in the overlay is already >= this. */
export const MIN_DONATION_USD = 5

/** True when `amount` (in whole USD) is a finite number at or above the
    minimum. Used identically on the client and in the payment APIs. */
export function isValidDonationAmount(amount: unknown): amount is number {
  return typeof amount === 'number' && Number.isFinite(amount) && amount >= MIN_DONATION_USD
}
