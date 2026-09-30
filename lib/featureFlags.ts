import 'server-only'

/* Single source of truth for whether the Gwags Scholars Program application
   is open to the public. Enforced in three places that each read this same
   function: middleware.ts (blocks page + API route access), the API route
   itself (defense in depth — never trust middleware alone), and the public
   "Apply now" button's disabled state.

   VERCEL_ENV is only set on Vercel deployments ('production' | 'preview' |
   'development'); it's unset when running `next dev` locally, so local
   development is always open regardless of the Production setting below —
   no local override needed. Preview deployments are intentionally left open
   too (only Production is gated), matching what was actually asked for. */
export function isScholarsApplicationOpen(): boolean {
  if (process.env.VERCEL_ENV === 'production') {
    return process.env.SCHOLARS_APPLICATION_OPEN === 'true'
  }
  return true
}
