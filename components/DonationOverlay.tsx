'use client'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import type { PaymentRequest as StripePaymentRequest } from '@stripe/stripe-js'
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lang, t } from '@/lib/translations'
import DonationFAQ from '@/components/DonationFAQ'

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
if (!stripePublishableKey) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set — the donation form will not load.')
}

/* Locale-aware Stripe.js instance, one per site language, so Stripe's own
   dynamic text (card error messages, etc.) matches the donor's selected
   language. The site's `Lang` values ('en' | 'fr') map directly onto
   Stripe's supported locale codes. Cached by language rather than created
   fresh on every render/overlay-open, per Stripe's own guidance to avoid
   calling loadStripe() more than once per set of options. */
const stripePromiseCache: Partial<Record<Lang, ReturnType<typeof loadStripe>>> = {}
function getStripePromise(lang: Lang) {
  if (!stripePublishableKey) return Promise.resolve(null)
  if (!stripePromiseCache[lang]) {
    stripePromiseCache[lang] = loadStripe(stripePublishableKey, { locale: lang })
  }
  return stripePromiseCache[lang]!
}

const ONCE_AMOUNTS = [1000, 500, 100, 50, 25, 5]
const MONTHLY_AMOUNTS = [200, 100, 50, 30, 10, 5]
/* Fix 2: minimum for the custom "$" amount field. Every preset button is
   already >= this, so only custom entries ever need the check. */
const MIN_DONATION_AMOUNT = 5

const REFERRAL_SOURCES = [
  'friendOrFamily', 'linkedIn', 'searchEngine', 'gwagsEvent',
  'workplace', 'email', 'partnerOrg', 'other', 'preferNotToSay',
] as const
type ReferralSource = typeof REFERRAL_SOURCES[number]

const NAVY = '#0A1128'
const SELECTED_BG = 'rgba(30, 100, 200, 0.12)'
const SELECTED_BORDER = 'rgb(30, 100, 200)'
const SOLID_BLUE = 'rgb(30, 100, 200)'
const ORIGINAL_BORDER = 'rgba(10,17,40,0.2)'
const ERR_RED = '#c0392b'
const HEART_RED = '#E53E3E'
const REMINDER_BG = '#2A2A2A'
const SUCCESS_GREEN = '#1E8E3E'
const SUCCESS_GREEN_BG = '#E9F7EF'
/* Fix 3: subtle focus dimming for the left panel past Step 1 — light enough
   that the photo keeps its color and the text stays clearly readable. */
const FOCUS_OVERLAY = 'rgba(10,17,40,0.12)'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '6px',
  border: `1.5px solid ${ORIGINAL_BORDER}`,
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
  color: NAVY,
  fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 600,
  color: NAVY,
  marginBottom: '6px',
}

const actionBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: '6px',
  border: 'none',
  background: SOLID_BLUE,
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '15px',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

const errStyle: React.CSSProperties = {
  color: ERR_RED,
  fontSize: '13px',
  margin: '4px 0 0',
}

/* Subtle text-link treatment shared by "or another amount" (monthly upsell)
   and "Close" (Step: Final thank you) — identical to the "Manage your
   donation" trigger's existing styling + .donate-email-link underline/hover
   behavior. */
const subtleLinkStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  color: NAVY,
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: 'inherit',
  display: 'inline-block',
}

const bannerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  width: '100%',
  flexShrink: 0,
  padding: '14px 16px',
  borderRadius: '8px',
  background: SUCCESS_GREEN_BG,
  color: SUCCESS_GREEN,
  fontWeight: 600,
  fontSize: '15px',
  boxSizing: 'border-box',
}

const upsellCardStyle: React.CSSProperties = {
  background: SOLID_BLUE,
  color: '#ffffff',
  borderRadius: '10px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}

const upsellPrimaryBtnStyle: React.CSSProperties = {
  ...actionBtnStyle,
  background: '#ffffff',
  color: SOLID_BLUE,
}

const upsellSecondaryBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: '6px',
  border: '1.5px solid rgba(255,255,255,0.6)',
  background: 'transparent',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '15px',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

interface OverlayProps {
  lang: Lang
  onClose: () => void
}

function StepHeader({ title, onBack, backLabel = 'Back' }: { title: string; onBack?: () => void; backLabel?: string }) {
  return (
    <div style={{ marginBottom: '4px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 28px', alignItems: 'center' }}>
        <div>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: NAVY,
                fontSize: '22px',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'inherit',
              }}
              aria-label={backLabel}
            >
              ‹
            </button>
          )}
        </div>
        <h3 style={{ color: NAVY, fontSize: '16px', fontWeight: 600, margin: 0, fontFamily: 'inherit', textAlign: 'center' }}>
          {title}
        </h3>
        <div />
      </div>
      <hr style={{ borderColor: 'rgba(10,17,40,0.12)', margin: '10px 0 0', borderStyle: 'solid', borderWidth: '0 0 1px' }} />
    </div>
  )
}

function BellIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#D4AF37"
      style={{ display: 'block', animation: 'bell-ring 1.5s ease-in-out infinite', flexShrink: 0 }}
    >
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V10c0-3.07-1.64-5.64-4.5-6.32V3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 4.36 6 6.92 6 10v6l-2 2v1h16v-1l-2-2z" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="rgba(10,17,40,0.65)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="6" />
      <line x1="7" y1="6.5" x2="7" y2="10" />
      <circle cx="7" cy="4" r="0.7" fill="rgba(10,17,40,0.65)" stroke="none" />
    </svg>
  )
}

/* Fix 2: small red circular exclamation icon shown inside the custom amount
   field when the entered value is below the minimum donation. */
function ErrorCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill={ERR_RED} />
      <rect x="7.25" y="3.5" width="1.5" height="5.5" rx="0.75" fill="#ffffff" />
      <circle cx="8" cy="11.2" r="0.9" fill="#ffffff" />
    </svg>
  )
}

/* CHANGE 8: small static red heart shown beside "Monthly" below 1024px */
function HeartIconRed({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={HEART_RED} style={{ flexShrink: 0 }} aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

/* Post-payment Step: button success animation — a circle draws itself, then a
   checkmark draws itself inside it. strokeDasharray/strokeDashoffset are set
   as plain SVG attributes (not `style`) so the CSS keyframes in globals.css
   (.donate-success-circle / .donate-success-check) can animate them — an
   inline `style` value would win the cascade and freeze the dash offset. */
function SuccessDrawIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        className="donate-success-circle"
        cx="12" cy="12" r="9"
        stroke="#ffffff" strokeWidth="2"
        strokeDasharray={57} strokeDashoffset={57}
      />
      <path
        className="donate-success-check"
        d="M7.5 12.5l3 3 6-6.5"
        stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={18} strokeDashoffset={18}
      />
    </svg>
  )
}

/* Success banner checkmark (Donation successful / Final thank you) */
function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" fill={SUCCESS_GREEN} />
      <path d="M7.5 12.5l3 3 6-6.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Celebratory icon for the Donation successful / Final thank you screens —
   HeartIconRed's exact path, scaled up, animated via the existing
   .donate-heart / heart-beat pulse (app/globals.css) already used for the
   heart icon on the /get-involved donate button. */
function CelebrateHeartIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={HEART_RED} aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

/* FIX 2: wallet icons for the Apple/Google Pay fallback placeholder button */
/* CHANGE 10: size now configurable — button call site uses a larger size */
function AppleLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.51 4.09l-.02-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}
function GoogleLogo() {
  return (
    <svg width="15" height="15" viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

/* FIX 4 / CHANGE 12: card brand logos (compact inline SVGs, ~40×26) — official-ish colors */
function CardBrands() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
      <svg width="40" height="26" viewBox="0 0 40 26" aria-label="Visa">
        <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#ffffff" stroke="#e6e6e6" />
        <text x="20" y="17.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="12" fill="#1434CB">VISA</text>
      </svg>
      <svg width="40" height="26" viewBox="0 0 40 26" aria-label="Mastercard">
        <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#ffffff" stroke="#e6e6e6" />
        <circle cx="15" cy="13" r="7.5" fill="#EB001B" />
        <circle cx="25" cy="13" r="7.5" fill="#F79E1B" />
        <path d="M20 7.1a7.47 7.47 0 0 1 0 11.8 7.47 7.47 0 0 1 0-11.8z" fill="#FF5F00" />
      </svg>
      <svg width="40" height="26" viewBox="0 0 40 26" aria-label="American Express">
        <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#006FCF" />
        <text x="20" y="16.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="7.5" fill="#ffffff" letterSpacing="0.3">AMEX</text>
      </svg>
      <svg width="40" height="26" viewBox="0 0 40 26" aria-label="Discover">
        <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#ffffff" stroke="#e6e6e6" />
        <text x="3" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="6" fill="#1B1B1B">Discover</text>
        <circle cx="33.5" cy="15.5" r="4.5" fill="#F76E11" />
      </svg>
    </div>
  )
}

function CustomCheckbox({
  id, checked, onChange,
  uncheckedBorderColor = ORIGINAL_BORDER,
  uncheckedBg = '#ffffff',
}: {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  uncheckedBorderColor?: string
  uncheckedBg?: string
}) {
  return (
    <div style={{ position: 'relative', width: '16px', height: '16px', flexShrink: 0 }}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, inset: 0, width: '100%', height: '100%', cursor: 'pointer', margin: 0 }}
      />
      <div style={{
        width: '16px',
        height: '16px',
        borderRadius: '3px',
        border: `1.5px solid ${checked ? SOLID_BLUE : uncheckedBorderColor}`,
        background: checked ? SOLID_BLUE : uncheckedBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  )
}

/* CHANGE 3: capitalize first letter of each word */
const capitalizeWords = (val: string) =>
  val.replace(/(^|\s)(\S)/g, (_, sp, ch) => sp + ch.toUpperCase())

/* "Donation successful" banner — shared by the monthly-upsell step and the
   final thank-you step. Always pinned to the top of its panel and never
   part of any vertical-centering group (Fix 2: it must never move). */
function SuccessBanner({ d }: { d: typeof t['en']['donationOverlay'] }) {
  return (
    <div style={bannerStyle}>
      <CheckCircleIcon />
      <span>{d.donationSuccessfulBanner}</span>
    </div>
  )
}

/* Shared by "Donation successful" (Step: success + monthly upsell) and
   "Final thank you" — the celebratory heart, thank-you text, and donated
   amount are identical in both places. Does NOT include the banner (see
   SuccessBanner above), so it can be independently centered within
   whatever space is available below the banner. */
function DonationSuccessSummary({ d, amount, isMonthlySupporter = false }: { d: typeof t['en']['donationOverlay']; amount: number; isMonthlySupporter?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', textAlign: 'center', width: '100%' }}>
      <span className="donate-heart"><CelebrateHeartIcon size={56} /></span>
      <p style={{ fontWeight: 700, fontSize: '19px', color: NAVY, margin: 0 }}>{d.thankYouForSupport}</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <p style={{ fontSize: '15px', color: NAVY, margin: 0 }}>
          {d.youveMadeADonationPrefix}{amount.toFixed(2)}{d.youveMadeADonationSuffix}
        </p>
        {isMonthlySupporter && (
          <p style={{ fontSize: '15px', color: NAVY, margin: 0 }}>{d.nowMonthlySupporterText}</p>
        )}
      </div>
    </div>
  )
}

function DonateForm({ lang, mode = 'desktop', onStepChange, onClose, jumpToFinalSignal }: { lang: Lang; mode?: 'desktop' | 'tablet' | 'phone'; onStepChange?: (step: number) => void; onClose: () => void; jumpToFinalSignal?: number }) {
  const d = t[lang].donationOverlay
  const c = t[lang].common
  /* FIX 1/7: desktop fills the fixed-height panel (button pinned to bottom);
     phone/tablet flow naturally so there's no giant empty gap. */
  const fill = mode === 'desktop'
  const belowLg = mode !== 'desktop'
  const stepBtnMargin = fill ? 'auto' : (mode === 'tablet' ? '20px' : '8px')
  const isApple = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent || '')
  const termsFontSize = mode === 'phone' ? '14px' : '15px'
  const [step, setStep] = useState(1)
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [coverFee, setCoverFee] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  /* "Manage your donation" — requests a secure, short-lived portal-access
     link by email (server never returns a Stripe portal URL directly here;
     it emails one if a matching recurring donation exists), shown as an
     alternate view within Step 1's panel (same fixed dimensions, so it can't
     overflow the desktop layout's pinned-button sizing). */
  const [manageMode, setManageMode] = useState(false)
  const [manageEmail, setManageEmail] = useState('')
  const [manageStatus, setManageStatus] = useState<'idle' | 'loading' | 'sent'>('idle')
  const [manageError, setManageError] = useState<string | null>(null)

  /* CHANGE 9: Google Pay / Apple Pay via Stripe Payment Request API */
  const [paymentRequest, setPaymentRequest] = useState<StripePaymentRequest | null>(null)

  /* CHANGE 1: validation state */
  const [amountError, setAmountError] = useState(false)
  const [step2Errors, setStep2Errors] = useState({ firstName: false, lastName: false, email: false })
  const [cardComplete, setCardComplete] = useState({ number: false, expiry: false, cvc: false })
  const [cardError, setCardError] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [termsError, setTermsError] = useState(false)

  /* Fix 1: the success animation plays in place on the Donate button, on the
     still-active Payment step — it must NOT trigger a step change itself. */
  const [successAnimating, setSuccessAnimating] = useState(false)

  /* Post-payment steps: referral source (Step: How did you hear about us?) */
  const [referralSelections, setReferralSelections] = useState<Record<ReferralSource, boolean>>(
    Object.fromEntries(REFERRAL_SOURCES.map(k => [k, false])) as Record<ReferralSource, boolean>
  )
  const [referralError, setReferralError] = useState(false)

  /* Captured from handleComplete on success — needed for the metadata update
     call and, for one-time gifts, the "Yes, I'll give monthly" upgrade call. */
  const [donationRecord, setDonationRecord] = useState<{ type: 'payment_intent' | 'subscription'; id: string } | null>(null)
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null)

  /* Post-payment steps: "Become a monthly supporter" upsell */
  const [showUpsellCustomInput, setShowUpsellCustomInput] = useState(false)
  const [upsellCustomAmount, setUpsellCustomAmount] = useState('')
  const [upsellStatus, setUpsellStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [upsellError, setUpsellError] = useState<string | null>(null)
  const [upsellSucceeded, setUpsellSucceeded] = useState(false)

  const tooltipRef = useRef<HTMLDivElement>(null)
  const step2Timestamp = useRef(0)
  const stripe = useStripe()
  const elements = useElements()

  const amounts = frequency === 'once' ? ONCE_AMOUNTS : MONTHLY_AMOUNTS
  const donateLabel = frequency === 'once' ? d.donate : d.donateMonthly

  const baseAmount = custom ? parseFloat(custom) : (selected ?? 0)
  const feeAmount = baseAmount > 0 ? Math.round((baseAmount * 0.029 + 0.30) * 100) / 100 : 0
  const totalAmount = coverFee ? Math.round((baseAmount + feeAmount) * 100) / 100 : baseAmount
  /* Fix 2: live validation on the custom amount field only — preset buttons
     are always >= MIN_DONATION_AMOUNT already. Derived directly from
     `custom` so it updates (and clears) on every keystroke automatically. */
  const belowMinAmount = custom !== '' && baseAmount > 0 && baseAmount < MIN_DONATION_AMOUNT

  /* FIX 2 layer 2: stamp the moment step 2 appears, to reject near-instant autofill clicks */
  useEffect(() => {
    if (step === 2) step2Timestamp.current = Date.now()
  }, [step])

  /* CHANGE 2/4: let the parent (StackedBody) know which step is active, so it can
     hide the intro image/text and pin the top bar on phone from step 2 onward.
     Fix 1: while the success animation plays in place on the still-active
     Payment step (step 3), report step 4 synthetically — payment has already
     succeeded at that point, so the parent's post-payment X-button handling
     (jump straight to the final thank-you instead of showing the abandonment
     reminder) must already apply, even though `step` itself hasn't advanced. */
  useEffect(() => {
    onStepChange?.(successAnimating ? 4 : step)
  }, [step, successAnimating, onStepChange])

  /* Fix 1: the success animation plays on the Donate button in place, on the
     still-active Payment step. Only once it finishes (~1.5s) does the flow
     advance to the "How did you hear about us?" step, using the normal
     step-transition animation. */
  useEffect(() => {
    if (!successAnimating) return
    const timer = setTimeout(() => {
      setSuccessAnimating(false)
      setStep(4)
    }, 1500)
    return () => clearTimeout(timer)
  }, [successAnimating])

  /* Fix 5: pressing X while on any post-payment step before the final
     thank-you (the in-place success animation, referral, or monthly upsell)
     should jump straight there instead of showing the "Maybe next time?"
     reminder or closing outright. DonationOverlay owns the X button but not
     this component's `step` state, so it signals a jump by incrementing a
     counter prop — any change (not the value itself) means "jump now". */
  const jumpToFinalSignalRef = useRef(jumpToFinalSignal)
  useEffect(() => {
    if (jumpToFinalSignal !== undefined && jumpToFinalSignal !== jumpToFinalSignalRef.current) {
      jumpToFinalSignalRef.current = jumpToFinalSignal
      setSuccessAnimating(false)
      setStep(6)
    }
  }, [jumpToFinalSignal])

  useEffect(() => {
    if (!tooltipOpen) return
    const handler = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setTooltipOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [tooltipOpen])

  /* CHANGE 9: build a PaymentRequest on step 3; Stripe only surfaces the button
     if the device/browser supports Google Pay or Apple Pay. */
  useEffect(() => {
    if (!stripe || step !== 3 || !baseAmount || baseAmount <= 0) {
      setPaymentRequest(null)
      return
    }
    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: { label: d.paymentRequestLabel, amount: Math.round(totalAmount * 100) },
      requestPayerName: true,
      requestPayerEmail: true,
    })
    let active = true
    pr.canMakePayment().then(result => {
      if (active) setPaymentRequest(result ? pr : null)
    })
    pr.on('paymentmethod', async (ev) => {
      try {
        const endpoint = frequency === 'monthly' ? '/api/create-subscription' : '/api/create-payment-intent'
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: totalAmount, name: `${firstName} ${lastName}`.trim(), email, lang }),
        })
        const data = await res.json()
        if (!res.ok || !data.clientSecret) throw new Error(data.error || d.paymentStartError)
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          data.clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false },
        )
        if (confirmError) {
          ev.complete('fail')
          setErrorMessage(confirmError.message || d.walletPaymentError)
          setStatus('error')
          return
        }
        ev.complete('success')
        if (paymentIntent && paymentIntent.status === 'requires_action') {
          const { error } = await stripe.confirmCardPayment(data.clientSecret)
          if (error) {
            setErrorMessage(error.message || d.walletPaymentError)
            setStatus('error')
            return
          }
        }
        setStatus('success')
      } catch (err) {
        ev.complete('fail')
        setErrorMessage(err instanceof Error ? err.message : d.genericError)
        setStatus('error')
      }
    })
    return () => { active = false }
  }, [stripe, step, baseAmount, totalAmount, frequency, firstName, lastName, email, lang])

  /* CHANGE 1: Step 1 — must have a valid amount */
  const handleStep1Next = () => {
    if (!baseAmount || baseAmount <= 0) {
      setAmountError(true)
      return
    }
    /* Fix 2: block progression below the minimum — the inline red field
       state already communicates why, so no separate error message here. */
    if (baseAmount < MIN_DONATION_AMOUNT) return
    setAmountError(false)
    setStep(2)
  }

  const handleStep2Next = () => {
    /* Layer 2: reject the near-instant synthetic click autofill fires right after filling fields */
    if (Date.now() - step2Timestamp.current < 600) return
    const errors = {
      firstName: !firstName.trim(),
      lastName: !lastName.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/.test(email.trim()),
    }
    setStep2Errors(errors)
    /* Layer 3: Terms checkbox is required */
    if (!termsAccepted) { setTermsError(true); if (errors.firstName || errors.lastName || errors.email) return; return }
    if (errors.firstName || errors.lastName || errors.email) return
    setStep(3)
  }

  /* CHANGE 1: Step 3 — card must be complete */
  const handleComplete = async () => {
    if (!stripe || !elements) return
    if (!baseAmount || baseAmount <= 0) return
    if (!cardComplete.number || !cardComplete.expiry || !cardComplete.cvc) {
      setCardError(true)
      return
    }
    setCardError(false)
    setErrorMessage(null)
    setStatus('loading')
    try {
      const endpoint = frequency === 'monthly' ? '/api/create-subscription' : '/api/create-payment-intent'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount, name: `${firstName} ${lastName}`.trim(), email, lang }),
      })
      const data = await res.json()
      if (!res.ok || !data.clientSecret) throw new Error(data.error || d.paymentStartError)
      const cardEl = elements.getElement(CardNumberElement)
      if (!cardEl) throw new Error(d.cardNotReadyError)
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardEl,
          billing_details: { name: `${firstName} ${lastName}`.trim(), email },
        },
      })
      if (result.error) throw new Error(result.error.message || d.cardChargeError)

      setStatus('success')
      setCustomerId(typeof data.customerId === 'string' ? data.customerId : null)
      if (frequency === 'once' && result.paymentIntent) {
        const pm = result.paymentIntent.payment_method
        setPaymentMethodId(typeof pm === 'string' ? pm : pm?.id ?? null)
        setDonationRecord({ type: 'payment_intent', id: result.paymentIntent.id })
      } else if (frequency === 'monthly' && typeof data.subscriptionId === 'string') {
        setDonationRecord({ type: 'subscription', id: data.subscriptionId })
      }
      /* Fix 1: stay on the Payment step — the Donate button itself animates
         in place; advancing to the next step happens in the successAnimating
         effect above, once the animation finishes. */
      setSuccessAnimating(true)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : d.genericError)
      setStatus('error')
    }
  }

  /* Post-payment upsell: converts the one-time gift just made into a monthly
     subscription, reusing the Customer + PaymentMethod already saved via
     create-payment-intent's setup_future_usage — no card re-entry needed. */
  const handleUpgradeToMonthly = async () => {
    if (!stripe || !customerId || !paymentMethodId) return
    const amount = upsellCustomAmount ? parseFloat(upsellCustomAmount) : baseAmount
    if (!amount || amount <= 0) return
    setUpsellStatus('loading')
    setUpsellError(null)
    try {
      const res = await fetch('/api/upgrade-to-monthly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, paymentMethodId, amount, lang }),
      })
      const data = await res.json()
      if (!res.ok || !data.clientSecret) throw new Error(data.error || d.paymentStartError)
      const result = await stripe.confirmCardPayment(data.clientSecret)
      if (result.error) throw new Error(result.error.message || d.cardChargeError)
      setUpsellSucceeded(true)
      setStep(6)
    } catch (err) {
      setUpsellError(err instanceof Error ? err.message : d.genericError)
      setUpsellStatus('error')
    }
  }

  /* Step: How did you hear about us? — required; on success, fire-and-forget
     the referral data to Stripe metadata, then route one-time donors to the
     monthly upsell and monthly donors straight to the final thank-you (the
     upsell doesn't make sense for someone already subscribed). */
  const handleReferralNext = () => {
    const anySelected = Object.values(referralSelections).some(Boolean)
    if (!anySelected) {
      setReferralError(true)
      return
    }
    setReferralError(false)
    if (donationRecord) {
      fetch('/api/update-donation-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: donationRecord.type,
          id: donationRecord.id,
          referralSource: (Object.keys(referralSelections) as ReferralSource[]).filter(k => referralSelections[k]),
        }),
      }).catch(() => { /* best-effort, same pattern as ExitReminder's handleRemindMe */ })
    }
    setStep(frequency === 'monthly' ? 6 : 5)
  }

  /* "Manage your donation" — requests a secure, short-lived management link
     be emailed to the donor if a matching recurring donation exists. The
     server never returns a portal URL directly here (see
     /api/create-portal-session); the donor clicks the emailed link, which
     redirects to their Stripe-hosted Billing Portal session only after the
     link's token is verified server-side. */
  const handleManageSubmit = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(manageEmail.trim())) {
      setManageError(d.manageEmailInvalid)
      return
    }
    setManageError(null)
    setManageStatus('loading')
    try {
      const res = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: manageEmail.trim(), lang }),
      })
      const data = await res.json()
      if (!res.ok) {
        setManageError(data.error || d.genericError)
        setManageStatus('idle')
        return
      }
      setManageStatus('sent')
    } catch {
      setManageError(d.genericError)
      setManageStatus('idle')
    }
  }

  return (
    <div style={{ overflow: 'hidden', height: fill ? '100%' : 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* only the active step renders; key retriggers the fade+shift each change */}
      <div key={manageMode ? 'manage' : step} className="donate-step" style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

        {/* ── Manage your donation: alternate view, same panel dimensions as the steps ── */}
        {manageMode && (
        <div style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff' }}>
          <StepHeader title={d.manageText} onBack={() => { setManageMode(false); setManageError(null); setManageStatus('idle') }} backLabel={c.back} />
          {manageStatus === 'sent' ? (
            <p style={{ color: SUCCESS_GREEN, fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{d.manageSent}</p>
          ) : (
            <>
              <p style={{ color: NAVY, fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                {d.manageDescription}
              </p>
              <div>
                <label style={labelStyle}>{d.manageEmailLabel}</label>
                <input
                  type="email"
                  value={manageEmail}
                  onChange={e => { setManageEmail(e.target.value); setManageError(null) }}
                  style={{ ...inputStyle, border: `1.5px solid ${manageError ? ERR_RED : ORIGINAL_BORDER}` }}
                />
                {manageError && <p style={errStyle}>{manageError}</p>}
              </div>
              <button
                type="button"
                onClick={handleManageSubmit}
                disabled={manageStatus === 'loading'}
                style={{ ...actionBtnStyle, marginTop: stepBtnMargin, opacity: manageStatus === 'loading' ? 0.7 : 1, cursor: manageStatus === 'loading' ? 'not-allowed' : 'pointer' }}
              >
                {manageStatus === 'loading' ? '...' : d.manageSubmit}
              </button>
            </>
          )}
        </div>
        )}

        {/* ── Step 1: Amount ── */}
        {!manageMode && step === 1 && (
        <div style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff' }}>
          <StepHeader title={d.chooseAmountTitle} />

          {/* Toggle */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['once', 'monthly'] as const).map(f => (
              <button
                type="button"
                key={f}
                onClick={() => { setFrequency(f); setSelected(null); setCustom(''); setAmountError(false) }}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: '6px',
                  border: `1.5px solid ${f === frequency ? SELECTED_BORDER : ORIGINAL_BORDER}`,
                  background: f === frequency ? SELECTED_BG : 'transparent',
                  color: NAVY,
                  fontWeight: 500,
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                {f === 'once' ? d.giveOnce : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    {belowLg && <HeartIconRed size={15} />}
                    {d.monthly}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Amount grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {amounts.map(amt => (
              <button
                type="button"
                key={amt}
                onClick={() => { setSelected(amt); setCustom(String(amt)); setAmountError(false) }}
                style={{
                  padding: '11px 0',
                  borderRadius: '6px',
                  border: `1.5px solid ${selected === amt ? SELECTED_BORDER : ORIGINAL_BORDER}`,
                  background: selected === amt ? SELECTED_BG : 'transparent',
                  color: NAVY,
                  fontWeight: 500,
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                ${amt.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom amount + validation */}
          <div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: belowMinAmount ? ERR_RED : NAVY, fontSize: '15px', fontWeight: 500 }}>$</span>
              <input
                type="number"
                min="1"
                placeholder=""
                value={custom}
                onChange={e => { setCustom(e.target.value); setSelected(null); setAmountError(false) }}
                style={{
                  ...inputStyle,
                  paddingLeft: '28px',
                  paddingRight: belowMinAmount ? '38px' : undefined,
                  color: belowMinAmount ? ERR_RED : NAVY,
                  border: `1.5px solid ${(amountError || belowMinAmount) ? ERR_RED : ORIGINAL_BORDER}`,
                }}
              />
              {belowMinAmount && (
                <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                  <ErrorCircleIcon />
                </span>
              )}
              {/* The field spans the panel's full width inside an ancestor
                  with overflow:hidden (it clips the step slide-in animation),
                  so there's no free horizontal space for a true side-by-side
                  popover on any viewport — it renders below the field on
                  phone, tablet, and desktop alike. The box is content-sized
                  (no maxWidth on desktop/tablet) and centered via left:50% +
                  translateX along the same axis the "Manage your monthly
                  donation." link is centered on below it, so the two stay
                  concentric and the tooltip fully overlaps the link
                  regardless of exact text width. No pointer/tail — plain
                  rounded box, as designed. Centering also applies on phone:
                  lengthening the trigger text to "Manage your monthly
                  donation." made it wider than the old left:0-anchored
                  phone tooltip, so its trailing text started peeking out —
                  the same class of bug being fixed here, just newly
                  introduced on phone by that text change. Phone keeps its
                  own maxWidth/font-size (260px / 13px) untouched — only the
                  horizontal anchor changed, to restore full coverage.
                  whiteSpace:'nowrap' is required on every viewport here:
                  with only 'left' set (no 'right'), the shrink-to-fit width
                  an absolutely positioned box lays out with is measured
                  from that left offset to the containing block's right
                  edge — i.e. roughly the right half of the column at
                  left:50% — before the translateX(-50%) shifts it back
                  into view. Without nowrap the text wraps inside that
                  half-width box instead of laying out at its true
                  one-line width, undersizing the box and breaking coverage. */}
              {belowMinAmount && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  maxWidth: mode === 'phone' ? '260px' : undefined,
                  whiteSpace: 'nowrap',
                  background: '#ffffff',
                  color: NAVY,
                  fontSize: mode === 'phone' ? '13px' : '14px',
                  lineHeight: 1.5,
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(0,0,0,0.15)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  zIndex: 10,
                }}>
                  {d.minDonationNoticePrefix}<strong>{d.minDonationNoticeAmount}</strong>
                </div>
              )}
            </div>
            {amountError && <p style={errStyle}>{d.amountRequiredError}</p>}
          </div>

          {/* Already a donor? Look up their Stripe Customer Portal by email. */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setManageMode(true)}
              className="donate-email-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: NAVY, fontSize: '13px', fontWeight: 500, fontFamily: 'inherit', display: 'inline-block' }}
            >
              {d.manageTriggerLink}
            </button>
          </div>

          {/* FIX 1/7: desktop pins button to bottom; phone/tablet flow naturally */}
          <button type="button" onClick={handleStep1Next} style={{ ...actionBtnStyle, marginTop: stepBtnMargin }}>
            {donateLabel}
          </button>
        </div>
        )}

        {/* ── Step 2: Contact info ── */}
        {!manageMode && step === 2 && (
        <div style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '2px', background: '#ffffff' }}>
          <StepHeader title={d.enterDetailsTitle} onBack={() => setStep(1)} backLabel={c.back} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>{d.firstNameLabel} <span>*</span></label>
              <input
                type="text"
                value={firstName}
                onChange={e => { setFirstName(capitalizeWords(e.target.value)); setStep2Errors(p => ({ ...p, firstName: false })) }}
                style={{ ...inputStyle, border: `1.5px solid ${step2Errors.firstName ? ERR_RED : ORIGINAL_BORDER}` }}
              />
              {step2Errors.firstName && <p style={errStyle}>{d.requiredError}</p>}
            </div>
            <div>
              <label style={labelStyle}>{d.lastNameLabel} <span>*</span></label>
              <input
                type="text"
                value={lastName}
                onChange={e => { setLastName(capitalizeWords(e.target.value)); setStep2Errors(p => ({ ...p, lastName: false })) }}
                style={{ ...inputStyle, border: `1.5px solid ${step2Errors.lastName ? ERR_RED : ORIGINAL_BORDER}` }}
              />
              {step2Errors.lastName && <p style={errStyle}>{d.requiredError}</p>}
            </div>
          </div>

          <div>
            <label style={labelStyle}>{d.emailFieldLabel} <span>*</span></label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setStep2Errors(p => ({ ...p, email: false })) }}
              style={{ ...inputStyle, border: `1.5px solid ${step2Errors.email ? ERR_RED : ORIGINAL_BORDER}` }}
            />
            {step2Errors.email && <p style={errStyle}>{d.emailInvalidShort}</p>}
          </div>

          {/* Terms checkbox */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div style={{ marginTop: '1px' }}>
                <CustomCheckbox
                  id="terms-accept"
                  checked={termsAccepted}
                  onChange={checked => { setTermsAccepted(checked); if (checked) setTermsError(false) }}
                />
              </div>
              <label htmlFor="terms-accept" style={{ fontSize: termsFontSize, color: NAVY, cursor: 'pointer', lineHeight: 1.5 }}>
                {d.acceptTermsPrefix}{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: NAVY, textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>{d.termsLinkLabel}</a>
                {' '}{d.andConnector}{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: NAVY, textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>{d.privacyLinkLabel}</a>
              </label>
            </div>
            {termsError && <p style={{ ...errStyle, marginTop: '4px' }}>{d.acceptTermsRequired}</p>}
          </div>

          <button
            type="button"
            onClick={(e) => { if (!e.isTrusted) return; handleStep2Next() }}
            style={{ ...actionBtnStyle, marginTop: stepBtnMargin }}
          >
            {d.continueBtn}
          </button>
        </div>
        )}

        {/* ── Step 3: Payment ── */}
        {!manageMode && step === 3 && (
        <div style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', justifyContent: fill ? 'space-between' : 'flex-start', gap: fill ? undefined : (mode === 'tablet' ? '32px' : '18px'), paddingRight: '2px', background: '#ffffff' }}>
              {/* Top group: header + wallet + separator + card logos + card inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <StepHeader title={d.paymentTitle} onBack={() => setStep(2)} backLabel={c.back} />

                {/* FIX 2: Apple/Google Pay — real Stripe button when supported, else a styled placeholder */}
                {paymentRequest ? (
                  <PaymentRequestButtonElement
                    options={{ paymentRequest, style: { paymentRequestButton: { type: 'donate', theme: 'dark', height: '44px' } } }}
                  />
                ) : (
                  <button
                    type="button"
                    aria-label={isApple ? d.payWithApplePay : d.payWithGooglePay}
                    style={{
                      width: '100%', height: '44px', borderRadius: '6px', border: 'none',
                      background: '#1A1A1A', color: '#ffffff', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', gap: '8px',
                      fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {isApple ? <AppleLogo size={22} /> : <GoogleLogo />}
                    {isApple ? d.payWithApplePay : d.payWithGooglePay}
                  </button>
                )}

                {/* FIX 3: "Or donate with other methods" separator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <hr style={{ flex: 1, border: 'none', borderTop: `1px solid ${ORIGINAL_BORDER}`, margin: 0 }} />
                  <span style={{ fontSize: '12px', color: 'rgba(10,17,40,0.5)', whiteSpace: 'nowrap' }}>{d.orOtherMethods}</span>
                  <hr style={{ flex: 1, border: 'none', borderTop: `1px solid ${ORIGINAL_BORDER}`, margin: 0 }} />
                </div>

                {/* FIX 4: accepted card brand logos */}
                <CardBrands />

                {/* CHANGE 1: track card completion via onChange */}
                <div style={{ padding: '11px 14px', borderRadius: '6px', border: `1.5px solid ${ORIGINAL_BORDER}` }}>
                  <CardNumberElement
                    onChange={e => { setCardComplete(p => ({ ...p, number: e.complete })); setCardError(false) }}
                    options={{ style: { base: { fontSize: '15px', color: NAVY } }, placeholder: d.cardNumberPlaceholder }}
                  />
                </div>

                <div style={{ display: 'flex', border: `1.5px solid ${ORIGINAL_BORDER}`, borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ flex: 1, padding: '11px 14px', borderRight: `1px solid ${ORIGINAL_BORDER}` }}>
                    <CardExpiryElement
                      onChange={e => { setCardComplete(p => ({ ...p, expiry: e.complete })); setCardError(false) }}
                      options={{ style: { base: { fontSize: '15px', color: NAVY } } }}
                    />
                  </div>
                  <div style={{ flex: 1, padding: '11px 14px' }}>
                    <CardCvcElement
                      onChange={e => { setCardComplete(p => ({ ...p, cvc: e.complete })); setCardError(false) }}
                      options={{ style: { base: { fontSize: '15px', color: NAVY } } }}
                    />
                  </div>
                </div>

                {cardError && <p style={{ ...errStyle, margin: 0 }}>{d.cardDetailsRequired}</p>}
              </div>

              {/* Bottom group: pinned to bottom via space-between */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ position: 'relative', width: '16px', height: '16px', flexShrink: 0 }}>
                    <input
                      type="checkbox"
                      id="cover-fee"
                      checked={coverFee}
                      onChange={e => setCoverFee(e.target.checked)}
                      style={{ position: 'absolute', opacity: 0, inset: 0, width: '100%', height: '100%', cursor: 'pointer', margin: 0 }}
                    />
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '3px',
                      border: `1.5px solid ${coverFee ? SOLID_BLUE : ORIGINAL_BORDER}`,
                      background: coverFee ? SOLID_BLUE : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                    }}>
                      {coverFee && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <label htmlFor="cover-fee" style={{ fontSize: '14px', color: NAVY, cursor: 'pointer', userSelect: 'none' }}>
                    {d.coverFeeLabel}
                  </label>
                  <div ref={tooltipRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setTooltipOpen(v => !v)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', display: 'flex', alignItems: 'center' }}
                      aria-label={d.transactionCostInfoLabel}
                    >
                      <InfoIcon />
                    </button>
                    {/* CHANGE 4: centered above icon, bold amount */}
                    {tooltipOpen && (
                      <div style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 6px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#ffffff',
                        color: NAVY,
                        fontSize: '12px',
                        lineHeight: 1.5,
                        padding: '8px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(0,0,0,0.15)',
                        width: '200px',
                        whiteSpace: 'normal',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      }}>
                        {d.feeTooltipPrefix}<strong>${feeAmount.toFixed(2)}</strong>{d.feeTooltipSuffix}
                      </div>
                    )}
                  </div>
                </div>

                <hr style={{ borderColor: 'rgba(10,17,40,0.12)', margin: '0', borderStyle: 'solid', borderWidth: '0 0 1px' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: NAVY }}>{d.totalLabel}</span>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: NAVY }}>
                    ${totalAmount > 0 ? totalAmount.toFixed(2) : '0.00'}
                  </span>
                </div>

                {status === 'error' && (
                  <p style={{ color: ERR_RED, fontSize: '14px', margin: 0 }}>{errorMessage || d.genericError}</p>
                )}

                {/* Fix 1: the success animation plays in place on this button,
                    still on the Payment step — same dimensions throughout
                    (no resize), background fills to green via the
                    .donate-success-btn keyframe, and the label is replaced by
                    the circle/checkmark draw-in SVG. Only once it finishes
                    does the flow advance to the next step. */}
                <button
                  type="button"
                  onClick={handleComplete}
                  disabled={status === 'loading' || successAnimating}
                  className={successAnimating ? 'donate-success-btn' : undefined}
                  style={{
                    ...actionBtnStyle,
                    opacity: status === 'loading' ? 0.7 : 1,
                    cursor: (status === 'loading' || successAnimating) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {successAnimating ? <SuccessDrawIcon /> : (status === 'loading' ? '...' : donateLabel)}
                </button>
              </div>
        </div>
        )}

        {/* ── Post-payment Step: How did you hear about us? (required) ──
             No back arrow — the previous "step" is the in-place success
             animation on the Payment view, which is never a valid place to
             return to. */}
        {!manageMode && step === 4 && (
        <div style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '2px', background: '#ffffff' }}>
          <StepHeader title={d.howDidYouHearTitle} backLabel={c.back} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 12px' }}>
            {REFERRAL_SOURCES.map(key => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CustomCheckbox
                  id={`referral-${key}`}
                  checked={referralSelections[key]}
                  onChange={checked => setReferralSelections(prev => {
                    const next = { ...prev, [key]: checked }
                    if (Object.values(next).some(Boolean)) setReferralError(false)
                    return next
                  })}
                  uncheckedBorderColor={referralError ? ERR_RED : ORIGINAL_BORDER}
                />
                <label htmlFor={`referral-${key}`} style={{ fontSize: '14px', color: NAVY, cursor: 'pointer' }}>
                  {d.referralOptions[key]}
                </label>
              </div>
            ))}
          </div>
          {referralError && <p style={errStyle}>{d.pleaseSelectOneOption}</p>}

          <button type="button" onClick={handleReferralNext} style={{ ...actionBtnStyle, marginTop: stepBtnMargin }}>
            {d.nextLabel}
          </button>
        </div>
        )}

        {/* ── Post-payment Step: Donation successful + monthly upsell (one-time donors only) ──
             The banner is pinned to the top and never centers (Fix 2); the
             heart/thank-you text/amount and upsell card flow naturally below it. */}
        {!manageMode && step === 5 && (
        <div style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '2px', background: '#ffffff' }}>
          <SuccessBanner d={d} />
          <DonationSuccessSummary d={d} amount={baseAmount} />

          <div style={upsellCardStyle}>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, fontFamily: 'inherit' }}>{d.becomeMonthlySupporterTitle}</h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{d.becomeMonthlySupporterBody}</p>

            {!showUpsellCustomInput ? (
              <div>
                <div style={{ fontSize: '22px', fontWeight: 700 }}>${baseAmount.toFixed(2)}{d.usdPerMonthSuffix}</div>
                <button
                  type="button"
                  onClick={() => setShowUpsellCustomInput(true)}
                  className="donate-email-link"
                  style={{ ...subtleLinkStyle, color: '#ffffff' }}
                >
                  {d.orAnotherAmountLink}
                </button>
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: NAVY, fontSize: '15px', fontWeight: 500 }}>$</span>
                <input
                  type="number"
                  min="1"
                  value={upsellCustomAmount}
                  onChange={e => setUpsellCustomAmount(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: '28px' }}
                />
              </div>
            )}

            {upsellStatus === 'error' && (
              <p style={{ color: '#ffb4a8', fontSize: '13px', margin: 0 }}>{upsellError || d.genericError}</p>
            )}

            <button
              type="button"
              onClick={handleUpgradeToMonthly}
              disabled={upsellStatus === 'loading'}
              style={{ ...upsellPrimaryBtnStyle, opacity: upsellStatus === 'loading' ? 0.7 : 1, cursor: upsellStatus === 'loading' ? 'not-allowed' : 'pointer' }}
            >
              {upsellStatus === 'loading' ? '...' : d.yesGiveMonthlyBtn}
            </button>
            <button type="button" onClick={() => setStep(6)} style={upsellSecondaryBtnStyle}>
              {d.notAtThisTimeBtn}
            </button>
          </div>
        </div>
        )}

        {/* ── Post-payment Step: Final thank you ──
             Three-part layout: banner pinned top (Fix 2), heart/thank-you
             text/amount vertically centered in the remaining space (Fix 4),
             Close link pinned to the bottom (Fix 3). No back arrow. */}
        {!manageMode && step === 6 && (
        <div style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', paddingRight: '2px', background: '#ffffff', minHeight: fill ? undefined : '360px' }}>
          <SuccessBanner d={d} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
            <DonationSuccessSummary d={d} amount={baseAmount} isMonthlySupporter={frequency === 'monthly' || upsellSucceeded} />
          </div>
          {/* paddingBottom gives the .donate-email-link::after underline
              (rendered 3px below the button, 2px tall) room to paint before
              this panel's overflow:hidden root clips it — without it, the
              button's bottom edge sits flush against that clipping boundary
              and the underline is cut off entirely. */}
          <div style={{ textAlign: 'center', flexShrink: 0, paddingBottom: '8px' }}>
            <button type="button" onClick={onClose} className="donate-email-link" style={{ ...subtleLinkStyle, fontSize: '15px' }}>
              {d.closeLink}
            </button>
          </div>
        </div>
        )}

      </div>
    </div>
  )
}

function ExitReminder({ lang, onClose, onConfirmClose, onBack, theme = 'dark', hideHeader = false, pinButtons = true, mode = 'desktop' }: {
  lang: Lang
  onClose: () => void
  onConfirmClose: () => void
  onBack: () => void
  theme?: 'dark' | 'light'
  hideHeader?: boolean
  pinButtons?: boolean
  mode?: 'desktop' | 'tablet' | 'phone'
}) {
  const d = t[lang].donationOverlay
  const c = t[lang].common
  const [reminderEmail, setReminderEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [reminderStatus, setReminderStatus] = useState<'idle' | 'sent'>('idle')
  const [exitTermsAccepted, setExitTermsAccepted] = useState(false)
  const [exitTermsError, setExitTermsError] = useState(false)

  const termsFontSize = mode === 'phone' ? '14px' : '15px'
  const isDark = theme === 'dark'
  const textColor = isDark ? '#ffffff' : NAVY
  const mutedBorder = isDark ? 'rgba(255,255,255,0.5)' : ORIGINAL_BORDER
  const fieldBg = isDark ? 'transparent' : '#ffffff'
  const errColor = isDark ? '#ff6b6b' : ERR_RED

  const handleRemindMe = async () => {
    if (!reminderEmail.trim()) setEmailError(true)
    if (!exitTermsAccepted) setExitTermsError(true)
    if (!reminderEmail.trim() || !exitTermsAccepted) return
    try {
      await fetch('/api/reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: reminderEmail }),
      })
    } catch { /* store best-effort */ }
    setReminderStatus('sent')
    setTimeout(() => onClose(), 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {!hideHeader && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 28px', alignItems: 'center' }}>
            <div>
              <button
                type="button"
                onClick={onBack}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: textColor,
                  fontSize: '22px',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'inherit',
                }}
                aria-label={c.back}
              >
                ‹
              </button>
            </div>
            <h3 style={{ color: textColor, fontSize: '16px', fontWeight: 600, margin: 0, fontFamily: 'inherit', textAlign: 'center' }}>
              {d.exitTitle}
            </h3>
            <div />
          </div>
          <hr style={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(10,17,40,0.12)', margin: '10px 0 0', borderStyle: 'solid', borderWidth: '0 0 1px' }} />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
        <BellIcon />
        <p style={{ color: textColor, fontSize: '16px', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
          {d.exitBody}
        </p>
        {reminderStatus !== 'sent' && (
          <>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <label style={{ display: 'block', color: textColor, fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
                {d.exitEmailLabel}
              </label>
              <input
                type="email"
                value={reminderEmail}
                onChange={e => { setReminderEmail(e.target.value); setEmailError(false) }}
                placeholder={d.exampleEmailPlaceholder}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  border: `1.5px solid ${emailError ? errColor : mutedBorder}`,
                  borderRadius: '6px',
                  background: fieldBg,
                  color: textColor,
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
              {emailError && (
                <p style={{ color: errColor, fontSize: '13px', margin: '4px 0 0' }}>{d.exitEmailRequired}</p>
              )}
            </div>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ marginTop: '1px' }}>
                  <CustomCheckbox
                    id="exit-terms-accept"
                    checked={exitTermsAccepted}
                    onChange={checked => { setExitTermsAccepted(checked); if (checked) setExitTermsError(false) }}
                    uncheckedBorderColor={mutedBorder}
                    uncheckedBg={fieldBg}
                  />
                </div>
                <label htmlFor="exit-terms-accept" style={{ fontSize: termsFontSize, color: textColor, cursor: 'pointer', lineHeight: 1.5 }}>
                  {d.acceptTermsPrefix}{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: textColor, textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>{d.termsLinkLabel}</a>
                  {' '}{d.andConnector}{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: textColor, textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>{d.privacyLinkLabel}</a>
                </label>
              </div>
              {exitTermsError && <p style={{ color: errColor, fontSize: '13px', margin: '4px 0 0' }}>{d.acceptTermsRequired}</p>}
            </div>
          </>
        )}
        {reminderStatus === 'sent' && (
          <p style={{ color: '#D4AF37', fontSize: '16px', margin: 0, fontWeight: 600 }}>{d.exitSentMessage}</p>
        )}
      </div>

      {reminderStatus !== 'sent' && (
        /* CHANGE 5: on mobile (pinButtons=false) use an explicit 32px gap above the
           buttons instead of the auto-collapsed spacing. */
        <div style={{ marginTop: pinButtons ? 'auto' : '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button type="button" onClick={handleRemindMe} style={{ ...actionBtnStyle }}>
            {d.remindMeLaterBtn}
          </button>
          <button
            type="button"
            onClick={onConfirmClose}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '6px',
              border: isDark ? 'none' : `1.5px solid ${ORIGINAL_BORDER}`,
              background: isDark ? '#ffffff' : 'transparent',
              color: NAVY,
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {d.noThanksBtn}
          </button>
        </div>
      )}
    </div>
  )
}

/* Below 1024px the overlay top bar. CHANGE 2: the logo matches the site nav bar
   exactly (same classes + base inline styles as Nav.tsx) but rendered in black. */
function TopBar({ onClose, subtitle, padding = '10px 20px', closeLabel = 'Close' }: { onClose: () => void; subtitle: string; padding?: string; closeLabel?: string }) {
  return (
    <div style={{
      flexShrink: 0,
      minHeight: '56px',
      background: '#ffffff',
      borderBottom: '1px solid rgba(10,17,40,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding,
    }}>
      <div>
        <div className="nav-logo-text" style={{ color: NAVY, fontSize: '20px', fontWeight: 500, letterSpacing: '0.1em', fontFamily: 'Georgia, serif' }}>Gwags</div>
        <div className="nav-logo-subtitle" style={{ color: NAVY, fontSize: '12px', letterSpacing: '0.2em', marginTop: '1px' }}>{subtitle}</div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      >
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <line x1="1" y1="1" x2="13" y2="13" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="13" y1="1" x2="1" y2="13" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

/* Shared stacked content for phone + tablet: top bar, then the donate pane and the
   exit-reminder pane. Both panes stay mounted (display toggle) so the donation form
   keeps its step/state when the user goes to the reminder and back.

   Phone-only behavior (tablet is unchanged):
   - CHANGE 2: the intro image + text are only shown on Step 1; hidden from Step 2 on.
   - CHANGE 4: the top bar scrolls away naturally on Step 1, but becomes fixed
     (pinned above the scroll area) from Step 2 onward / while the exit-reminder
     screen is showing. */
function StackedBody({ lang, mode, exitMode, onX, onBack, onClose, includeFaqInline, onDonateStepChange, jumpToFinalSignal }: {
  lang: Lang
  mode: 'phone' | 'tablet'
  exitMode: boolean
  onX: () => void
  onBack: () => void
  onClose: () => void
  includeFaqInline: boolean
  onDonateStepChange?: (step: number) => void
  jumpToFinalSignal?: number
}) {
  const d = t[lang].donationOverlay
  const n = t[lang].nav
  const c = t[lang].common
  const [donateStep, setDonateStep] = useState(1)

  /* Fix 5 / Fix 1 (follow-up): the scroll container keeps whatever scrollTop
     it had from the previous step, which can land the new step mid-scroll
     past the photo instead of at the top.
     Two things were wrong with the first attempt: (1) `scrollTo({top:0})`
     inherits `scroll-behavior: smooth` from the site-wide `html` rule (it's
     an inherited CSS property), so the reset animated toward 0 instead of
     jumping there — and that animation could get cut short by a subsequent
     render, leaving the scroll partway down. Setting `scrollTop` directly
     always jumps instantly, bypassing scroll-behavior entirely. (2) a plain
     `useEffect` runs after the browser paints, so the old scroll position
     could flash briefly before the correction landed. `useLayoutEffect`
     fires synchronously right after the new step's DOM is committed, before
     paint, so the reset is invisible and can't be interrupted. */
  const scrollRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [donateStep])

  /* Fix 2: on narrow/portrait layouts (this component handles both phone
     and portrait-tablet), the photo stays visible on every step; only the
     impact text drops once the user moves past Step 1. */
  const showText = donateStep === 1
  /* Fix 6: on phone only, the final thank-you step (6) drops the photo too,
     so the "Donation successful" banner sits at the very top with no
     scrolling needed. Desktop/tablet keep the (dimmed) photo on every step. */
  const hidePhoto = mode === 'phone' && donateStep === 6
  /* CHANGE 5: phone-only gap bump between the intro text and "Choose your amount" */
  const introGap = mode === 'phone' ? '36px' : '24px'
  /* CHANGE 3: phone-only top bar padding bump */
  const topBarPadding = mode === 'phone' ? '15px 15px' : undefined

  const introBlock = (
    <div style={{ display: exitMode ? 'none' : 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {!hidePhoto && (
      <div className="donation-photo" style={{ position: 'relative', background: '#E6E3DC', width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ color: 'rgba(10,17,40,0.3)', fontSize: '12px', letterSpacing: '0.12em' }}>Photo</span>
        {/* Fix 3: same subtle focus overlay as desktop/landscape-tablet, applied
            to the photo once the text has dropped, for visual consistency. */}
        {!showText && <div style={{ position: 'absolute', inset: 0, background: FOCUS_OVERLAY, pointerEvents: 'none' }} />}
      </div>
      )}
      <div style={{ padding: '24px 20px 40px' }}>
        {showText && (
          <p style={{ color: NAVY, fontSize: '15px', lineHeight: 1.8, margin: `0 0 ${introGap}` }}>
            {d.sideText}<a href="mailto:donate@gwags.org" className="donate-email-link"><strong>donate@gwags.org</strong></a>.
          </p>
        )}
        <Elements key={lang} stripe={getStripePromise(lang)}>
          <DonateForm lang={lang} mode={mode} onClose={onClose} jumpToFinalSignal={jumpToFinalSignal}
            onStepChange={(s) => { setDonateStep(s); onDonateStepChange?.(s) }} />
        </Elements>
        {includeFaqInline && <DonationFAQ lang={lang} mode="phone" />}
      </div>
    </div>
  )

  const exitBlock = (
    <div style={{ display: exitMode ? 'flex' : 'none', flexDirection: 'column', flex: 1, minHeight: '100%', background: REMINDER_BG, padding: '24px 20px 40px' }}>
      <ExitReminder lang={lang} theme="dark" hideHeader={false} pinButtons={false} mode={mode} onClose={onClose} onConfirmClose={onClose} onBack={onBack} />
    </div>
  )

  if (mode === 'tablet') {
    return (
      <>
        <TopBar onClose={onX} subtitle={n.subtitle} closeLabel={c.close} />
        <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', display: 'flex', flexDirection: 'column' }}>
          {introBlock}
          {exitBlock}
        </div>
      </>
    )
  }

  /* Phone: top bar sits before the scroll area (fixed) once past Step 1 / in exit
     mode, or as the first scrollable child (scrolls away) on Step 1. */
  const topBarFixed = exitMode || donateStep > 1
  return (
    <>
      {topBarFixed && <TopBar onClose={onX} subtitle={n.subtitle} padding={topBarPadding} closeLabel={c.close} />}
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {!topBarFixed && <TopBar onClose={onX} subtitle={n.subtitle} padding={topBarPadding} closeLabel={c.close} />}
        {introBlock}
        {exitBlock}
      </div>
    </>
  )
}

export default function DonationOverlay({ lang, onClose }: OverlayProps) {
  const d = t[lang].donationOverlay
  const c = t[lang].common
  const [exitMode, setExitMode] = useState(false)
  const [vp, setVp] = useState<'desktop' | 'tablet' | 'phone'>('desktop')

  /* Once the donor reaches the post-payment steps (step >= 4), the X button
     must never show the "Maybe next time?" exit-reminder — that reminder's
     copy ("we'll send you a gentle reminder") only makes sense for someone
     abandoning a donation, not someone who just completed one. `step` lives
     inside DonateForm; this callback (threaded through DonateForm's existing
     onStepChange prop) lifts it up here so handleX can decide what to do:
     jump straight to the final thank-you step (4–6) or close outright (7). */
  const [donateStep, setDonateStep] = useState(1)
  const handleDonateStepChange = (step: number) => setDonateStep(step)

  /* Fix 5: incrementing this signals DonateForm (via its jumpToFinalSignal
     prop) to jump straight to the final thank-you step. */
  const [jumpToFinalSignal, setJumpToFinalSignal] = useState(0)

  /* FIX 1: plain `overflow: hidden` doesn't reliably block touch-drag scrolling
     of the background on iPad/tablet Safari. Pin the body in place instead, and
     restore the exact scroll position on close — this locks scroll consistently
     across phone, tablet, and desktop. */
  useEffect(() => {
    const scrollY = window.scrollY
    const body = document.body
    const prev = { position: body.style.position, top: body.style.top, left: body.style.left, right: body.style.right, width: body.style.width, overflow: body.style.overflow }
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.left = prev.left
      body.style.right = prev.right
      body.style.width = prev.width
      body.style.overflow = prev.overflow
      window.scrollTo(0, scrollY)
    }
  }, [])

  useEffect(() => {
    const phoneMq = window.matchMedia('(max-width: 767px)')
    /* Fix 2: bumped from 1023px to 1024px — the iPad Pro 12.9" is exactly
       1024px wide in portrait, and needs to fall into the narrow "tablet"
       layout (photo-only-past-step-1) rather than slipping into desktop. */
    const tabletMq = window.matchMedia('(min-width: 768px) and (max-width: 1024px)')
    const update = () => setVp(phoneMq.matches ? 'phone' : tabletMq.matches ? 'tablet' : 'desktop')
    update()
    phoneMq.addEventListener('change', update)
    tabletMq.addEventListener('change', update)
    return () => { phoneMq.removeEventListener('change', update); tabletMq.removeEventListener('change', update) }
  }, [])

  const handleX = () => {
    /* Fix 5: mid-flow post-payment steps (in-place success animation on
       Payment — reported synthetically as step 4, see DonateForm's
       onStepChange effect —, referral, monthly upsell) jump straight to the
       final thank-you step instead of showing the upsell or the pre-payment
       exit-reminder. Once already on the final thank-you step, X closes the
       portal outright — the same as clicking "Close" there. */
    if (donateStep >= 4 && donateStep <= 5) { setJumpToFinalSignal(s => s + 1); return }
    if (donateStep === 6) { onClose(); return }
    if (exitMode) onClose()
    else setExitMode(true)
  }

  /* ── Phone (<768px): full-screen white takeover ── */
  if (vp === 'phone') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <StackedBody lang={lang} mode="phone" exitMode={exitMode} onX={handleX} onBack={() => setExitMode(false)} onClose={onClose} includeFaqInline onDonateStepChange={handleDonateStepChange} jumpToFinalSignal={jumpToFinalSignal} />
      </div>
    )
  }

  /* ── Tablet (768–1024px): narrow, tall card on a dark overlay (CHANGE 7).
       Card max-width reduced from 700px to 640px, then to 570px. ── */
  if (vp === 'tablet') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
        <div className="donation-portal-tablet" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', width: '90vw', maxWidth: '450px', maxHeight: '92vh' }}>
          <div style={{ width: '100%', flex: '1 1 auto', minHeight: 0, background: '#ffffff', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            <StackedBody lang={lang} mode="tablet" exitMode={exitMode} onX={handleX} onBack={() => setExitMode(false)} onClose={onClose} includeFaqInline={false} onDonateStepChange={handleDonateStepChange} jumpToFinalSignal={jumpToFinalSignal} />
          </div>
          {/* CHANGE 6: FAQ below the portal, 2×2 */}
          <DonationFAQ lang={lang} mode="tablet" />
        </div>
      </div>
    )
  }

  /* ── Desktop (≥1024px): centered 2-column card, FAQ row below ── */
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <button
        type="button"
        onClick={handleX}
        style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '50%',
          width: '30px', height: '30px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0,
          zIndex: 10001,
          flexShrink: 0,
        }}
        aria-label={c.close}
      >
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
          <line x1="1" y1="1" x2="13" y2="13" stroke="#000000" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="13" y1="1" x2="1" y2="13" stroke="#000000" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', maxHeight: '94vh' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            maxWidth: '900px',
            width: '100%',
            minHeight: '530px',
            maxHeight: '82vh',
            overflowY: 'auto',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
          className="donation-card"
        >
          {/* Left side — CHANGE 5: top +20px, bottom -20px (same total height, content shifted lower) */}
          <div style={{
            position: 'relative',
            background: '#ffffff',
            borderRadius: '12px 0 0 12px',
            padding: '68px 36px 53px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            borderRight: '1px solid rgba(10,17,40,0.08)',
          }}>
            <div className="donation-photo" style={{ background: '#E6E3DC', borderRadius: '8px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'rgba(10,17,40,0.3)', fontSize: '12px', letterSpacing: '0.12em' }}>Photo</span>
            </div>
            <p style={{ color: NAVY, fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
              {d.sideText}<a href="mailto:donate@gwags.org" className="donate-email-link"><strong>donate@gwags.org</strong></a>.
            </p>
            {/* Fix 3: subtle focus overlay once past Step 1 — photo and text
                remain visible/legible underneath, just visually de-emphasized.
                Noticeably lighter than the page-level 0.85-opacity backdrop.
                pointer-events: none so the donate@gwags.org link stays clickable. */}
            {donateStep > 1 && (
              <div style={{ position: 'absolute', inset: 0, borderRadius: '12px 0 0 12px', background: FOCUS_OVERLAY, pointerEvents: 'none' }} />
            )}
          </div>

          {/* Right side */}
          <div style={{ overflow: 'hidden', borderRadius: '0 12px 12px 0' }}>
            <div style={{
              display: 'flex',
              transition: 'transform 0.3s ease',
              transform: exitMode ? 'translateX(-100%)' : 'translateX(0)',
              height: '100%',
            }}>
              {/* Panel 1: Donation form */}
              <div style={{ minWidth: '100%', padding: '48px 36px 20px', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
                <Elements key={lang} stripe={getStripePromise(lang)}>
                  <DonateForm lang={lang} mode="desktop" onClose={onClose} onStepChange={handleDonateStepChange} jumpToFinalSignal={jumpToFinalSignal} />
                </Elements>
              </div>

              {/* Panel 2: Exit reminder */}
              <div style={{
                minWidth: '100%',
                padding: '48px 36px 20px',
                background: REMINDER_BG,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <ExitReminder lang={lang} onClose={onClose} onConfirmClose={onClose} onBack={() => setExitMode(false)} />
              </div>
            </div>
          </div>
        </div>

        {/* CHANGE 6: FAQ row below the portal */}
        <DonationFAQ lang={lang} mode="desktop" />
      </div>
    </div>
  )
}
