'use client'
import { useState, useEffect, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import type { PaymentRequest as StripePaymentRequest } from '@stripe/stripe-js'
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lang, t } from '@/lib/translations'
import DonationFAQ from '@/components/DonationFAQ'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

const ONCE_AMOUNTS = [1000, 500, 100, 50, 25, 5]
const MONTHLY_AMOUNTS = [200, 100, 50, 30, 10, 5]

const NAVY = '#0A1128'
const SELECTED_BG = 'rgba(30, 100, 200, 0.12)'
const SELECTED_BORDER = 'rgb(30, 100, 200)'
const SOLID_BLUE = 'rgb(30, 100, 200)'
const ORIGINAL_BORDER = 'rgba(10,17,40,0.2)'
const ERR_RED = '#c0392b'
const HEART_RED = '#E53E3E'
const REMINDER_BG = '#2A2A2A'

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

interface OverlayProps {
  lang: Lang
  onClose: () => void
}

function StepHeader({ title, onBack }: { title: string; onBack?: () => void }) {
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
              aria-label="Back"
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

/* CHANGE 8: small static red heart shown beside "Monthly" below 1024px */
function HeartIconRed({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={HEART_RED} style={{ flexShrink: 0 }} aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

/* FIX 2: wallet icons for the Apple/Google Pay fallback placeholder button */
function AppleLogo() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true" style={{ flexShrink: 0 }}>
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

/* FIX 4: card brand logos (compact inline SVGs, ~40×26) */
function CardBrands() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
      <svg width="40" height="26" viewBox="0 0 40 26" aria-label="Visa">
        <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#ffffff" stroke="#e6e6e6" />
        <text x="20" y="17.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="11" fill="#1A1F71">VISA</text>
      </svg>
      <svg width="40" height="26" viewBox="0 0 40 26" aria-label="Mastercard">
        <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#ffffff" stroke="#e6e6e6" />
        <circle cx="16" cy="13" r="7" fill="#EB001B" />
        <circle cx="24" cy="13" r="7" fill="#F79E1B" fillOpacity="0.85" />
      </svg>
      <svg width="40" height="26" viewBox="0 0 40 26" aria-label="American Express">
        <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#2E77BC" />
        <text x="20" y="16.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="7.5" fill="#ffffff">AMEX</text>
      </svg>
      <svg width="40" height="26" viewBox="0 0 40 26" aria-label="Discover">
        <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#ffffff" stroke="#e6e6e6" />
        <text x="4" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="5.6" fill="#231F20">DISC</text>
        <circle cx="26.5" cy="14" r="4" fill="#F76E11" />
        <text x="30.5" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="5.6" fill="#231F20">VER</text>
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

function DonateForm({ lang, mode = 'desktop' }: { lang: Lang; mode?: 'desktop' | 'tablet' | 'phone' }) {
  const d = t[lang].donationOverlay
  /* FIX 1/7: desktop fills the fixed-height panel (button pinned to bottom);
     phone/tablet flow naturally so there's no giant empty gap. */
  const fill = mode === 'desktop'
  const belowLg = mode !== 'desktop'
  const stepBtnMargin = fill ? 'auto' : (mode === 'tablet' ? '20px' : '8px')
  const isApple = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent || '')
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

  /* CHANGE 9: Google Pay / Apple Pay via Stripe Payment Request API */
  const [paymentRequest, setPaymentRequest] = useState<StripePaymentRequest | null>(null)

  /* CHANGE 1: validation state */
  const [amountError, setAmountError] = useState(false)
  const [step2Errors, setStep2Errors] = useState({ firstName: false, lastName: false, email: false })
  const [cardComplete, setCardComplete] = useState({ number: false, expiry: false, cvc: false })
  const [cardError, setCardError] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [termsError, setTermsError] = useState(false)

  const tooltipRef = useRef<HTMLDivElement>(null)
  const step2Timestamp = useRef(0)
  const stripe = useStripe()
  const elements = useElements()

  const amounts = frequency === 'once' ? ONCE_AMOUNTS : MONTHLY_AMOUNTS
  const donateLabel = frequency === 'once' ? d.donate : d.donateMonthly

  const baseAmount = custom ? parseFloat(custom) : (selected ?? 0)
  const feeAmount = baseAmount > 0 ? Math.round((baseAmount * 0.029 + 0.30) * 100) / 100 : 0
  const totalAmount = coverFee ? Math.round((baseAmount + feeAmount) * 100) / 100 : baseAmount

  /* FIX 2 layer 2: stamp the moment step 2 appears, to reject near-instant autofill clicks */
  useEffect(() => {
    if (step === 2) step2Timestamp.current = Date.now()
  }, [step])

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
      total: { label: 'Gwags Donation', amount: Math.round(totalAmount * 100) },
      requestPayerName: true,
      requestPayerEmail: true,
    })
    let active = true
    pr.canMakePayment().then(result => {
      if (active) setPaymentRequest(result ? pr : null)
    })
    pr.on('paymentmethod', async (ev) => {
      try {
        const res = await fetch('/api/donate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: Math.round(totalAmount * 100), frequency }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          data.clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false },
        )
        if (confirmError) { ev.complete('fail'); setStatus('error'); return }
        ev.complete('success')
        if (paymentIntent && paymentIntent.status === 'requires_action') {
          const { error } = await stripe.confirmCardPayment(data.clientSecret)
          if (error) { setStatus('error'); return }
        }
        setStatus('success')
      } catch {
        ev.complete('fail')
        setStatus('error')
      }
    })
    return () => { active = false }
  }, [stripe, step, baseAmount, totalAmount, frequency])

  /* CHANGE 1: Step 1 — must have a valid amount */
  const handleStep1Next = () => {
    if (!baseAmount || baseAmount <= 0) {
      setAmountError(true)
      return
    }
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
    setStatus('loading')
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(totalAmount * 100), frequency }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      const cardEl = elements.getElement(CardNumberElement)
      if (!cardEl) throw new Error('No card element')
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardEl,
          billing_details: { name: `${firstName} ${lastName}`, email },
        },
      })
      if (result.error) throw new Error(result.error.message)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ overflow: 'hidden', height: fill ? '100%' : 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* only the active step renders; key retriggers the fade+shift each change */}
      <div key={step} className="donate-step" style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

        {/* ── Step 1: Amount ── */}
        {step === 1 && (
        <div style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff' }}>
          <StepHeader title="Choose your amount" />

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
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: NAVY, fontSize: '15px', fontWeight: 500 }}>$</span>
              <input
                type="number"
                min="1"
                placeholder=""
                value={custom}
                onChange={e => { setCustom(e.target.value); setSelected(null); setAmountError(false) }}
                style={{ ...inputStyle, paddingLeft: '28px', border: `1.5px solid ${amountError ? ERR_RED : ORIGINAL_BORDER}` }}
              />
            </div>
            {amountError && <p style={errStyle}>Please select or enter an amount.</p>}
          </div>

          {/* FIX 1/7: desktop pins button to bottom; phone/tablet flow naturally */}
          <button type="button" onClick={handleStep1Next} style={{ ...actionBtnStyle, marginTop: stepBtnMargin }}>
            {donateLabel}
          </button>
        </div>
        )}

        {/* ── Step 2: Contact info ── */}
        {step === 2 && (
        <div style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '2px', background: '#ffffff' }}>
          <StepHeader title="Enter your details" onBack={() => setStep(1)} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>First Name <span>*</span></label>
              <input
                type="text"
                value={firstName}
                onChange={e => { setFirstName(capitalizeWords(e.target.value)); setStep2Errors(p => ({ ...p, firstName: false })) }}
                style={{ ...inputStyle, border: `1.5px solid ${step2Errors.firstName ? ERR_RED : ORIGINAL_BORDER}` }}
              />
              {step2Errors.firstName && <p style={errStyle}>Required</p>}
            </div>
            <div>
              <label style={labelStyle}>Last Name <span>*</span></label>
              <input
                type="text"
                value={lastName}
                onChange={e => { setLastName(capitalizeWords(e.target.value)); setStep2Errors(p => ({ ...p, lastName: false })) }}
                style={{ ...inputStyle, border: `1.5px solid ${step2Errors.lastName ? ERR_RED : ORIGINAL_BORDER}` }}
              />
              {step2Errors.lastName && <p style={errStyle}>Required</p>}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email <span>*</span></label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setStep2Errors(p => ({ ...p, email: false })) }}
              style={{ ...inputStyle, border: `1.5px solid ${step2Errors.email ? ERR_RED : ORIGINAL_BORDER}` }}
            />
            {step2Errors.email && <p style={errStyle}>Please enter a valid email address</p>}
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
              <label htmlFor="terms-accept" style={{ fontSize: '15px', color: NAVY, cursor: 'pointer', lineHeight: 1.5 }}>
                I accept the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: NAVY, textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>Terms of Use</a>
                {' '}and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: NAVY, textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>Privacy Policy</a>
              </label>
            </div>
            {termsError && <p style={{ ...errStyle, marginTop: '4px' }}>Please accept the Terms of Use and Privacy Policy.</p>}
          </div>

          <button
            type="button"
            onClick={(e) => { if (!e.isTrusted) return; handleStep2Next() }}
            style={{ ...actionBtnStyle, marginTop: stepBtnMargin }}
          >
            Continue
          </button>
        </div>
        )}

        {/* ── Step 3: Payment ── */}
        {step === 3 && (
        <div style={{ flex: fill ? 1 : undefined, display: 'flex', flexDirection: 'column', justifyContent: fill ? 'space-between' : 'flex-start', gap: fill ? undefined : (mode === 'tablet' ? '32px' : '18px'), paddingRight: '2px', background: '#ffffff' }}>
          {status === 'success' ? (
            <p style={{ color: '#2d7a2d', fontSize: '15px', margin: 0 }}>Thank you for your donation.</p>
          ) : (
            <>
              {/* Top group: header + wallet + separator + card logos + card inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <StepHeader title="Payment" onBack={() => setStep(2)} />

                {/* FIX 2: Apple/Google Pay — real Stripe button when supported, else a styled placeholder */}
                {paymentRequest ? (
                  <PaymentRequestButtonElement
                    options={{ paymentRequest, style: { paymentRequestButton: { type: 'donate', theme: 'dark', height: '44px' } } }}
                  />
                ) : (
                  <button
                    type="button"
                    aria-label={isApple ? 'Pay with Apple Pay' : 'Pay with Google Pay'}
                    style={{
                      width: '100%', height: '44px', borderRadius: '6px', border: 'none',
                      background: '#1A1A1A', color: '#ffffff', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', gap: '8px',
                      fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {isApple ? <AppleLogo /> : <GoogleLogo />}
                    {isApple ? 'Pay with Apple Pay' : 'Pay with Google Pay'}
                  </button>
                )}

                {/* FIX 3: "Or donate with other methods" separator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <hr style={{ flex: 1, border: 'none', borderTop: `1px solid ${ORIGINAL_BORDER}`, margin: 0 }} />
                  <span style={{ fontSize: '12px', color: 'rgba(10,17,40,0.5)', whiteSpace: 'nowrap' }}>Or donate with other methods</span>
                  <hr style={{ flex: 1, border: 'none', borderTop: `1px solid ${ORIGINAL_BORDER}`, margin: 0 }} />
                </div>

                {/* FIX 4: accepted card brand logos */}
                <CardBrands />

                {/* CHANGE 1: track card completion via onChange */}
                <div style={{ padding: '11px 14px', borderRadius: '6px', border: `1.5px solid ${ORIGINAL_BORDER}` }}>
                  <CardNumberElement
                    onChange={e => { setCardComplete(p => ({ ...p, number: e.complete })); setCardError(false) }}
                    options={{ style: { base: { fontSize: '15px', color: NAVY } }, placeholder: 'Card Number' }}
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

                {cardError && <p style={{ ...errStyle, margin: 0 }}>Please complete your card details.</p>}
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
                    Cover the transaction cost
                  </label>
                  <div ref={tooltipRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setTooltipOpen(v => !v)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', display: 'flex', alignItems: 'center' }}
                      aria-label="Transaction cost info"
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
                        By adding <strong>${feeAmount.toFixed(2)}</strong>, you help cover the necessary software and processing fees
                      </div>
                    )}
                  </div>
                </div>

                <hr style={{ borderColor: 'rgba(10,17,40,0.12)', margin: '0', borderStyle: 'solid', borderWidth: '0 0 1px' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: NAVY }}>Total</span>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: NAVY }}>
                    ${totalAmount > 0 ? totalAmount.toFixed(2) : '0.00'}
                  </span>
                </div>

                {status === 'error' && (
                  <p style={{ color: ERR_RED, fontSize: '14px', margin: 0 }}>Something went wrong. Please try again.</p>
                )}

                <button
                  type="button"
                  onClick={handleComplete}
                  disabled={status === 'loading'}
                  style={{ ...actionBtnStyle, opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
                >
                  {status === 'loading' ? '...' : donateLabel}
                </button>
              </div>
            </>
          )}
        </div>
        )}

      </div>
    </div>
  )
}

function ExitReminder({ onClose, onConfirmClose, onBack, theme = 'dark', hideHeader = false, pinButtons = true }: {
  onClose: () => void
  onConfirmClose: () => void
  onBack: () => void
  theme?: 'dark' | 'light'
  hideHeader?: boolean
  pinButtons?: boolean
}) {
  const [reminderEmail, setReminderEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [reminderStatus, setReminderStatus] = useState<'idle' | 'sent'>('idle')
  const [exitTermsAccepted, setExitTermsAccepted] = useState(false)
  const [exitTermsError, setExitTermsError] = useState(false)

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
                aria-label="Back"
              >
                ‹
              </button>
            </div>
            <h3 style={{ color: textColor, fontSize: '16px', fontWeight: 600, margin: 0, fontFamily: 'inherit', textAlign: 'center' }}>
              Maybe next time?
            </h3>
            <div />
          </div>
          <hr style={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(10,17,40,0.12)', margin: '10px 0 0', borderStyle: 'solid', borderWidth: '0 0 1px' }} />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
        <BellIcon />
        <p style={{ color: textColor, fontSize: '16px', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
          Please leave your email address below, and we&apos;ll send you a gentle reminder later.
        </p>
        {reminderStatus !== 'sent' && (
          <>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <label style={{ display: 'block', color: textColor, fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
                Email *
              </label>
              <input
                type="email"
                value={reminderEmail}
                onChange={e => { setReminderEmail(e.target.value); setEmailError(false) }}
                placeholder="you@example.com"
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
                <p style={{ color: errColor, fontSize: '13px', margin: '4px 0 0' }}>Email is required.</p>
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
                <label htmlFor="exit-terms-accept" style={{ fontSize: '15px', color: textColor, cursor: 'pointer', lineHeight: 1.5 }}>
                  I accept the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: textColor, textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>Terms of Use</a>
                  {' '}and{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: textColor, textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>Privacy Policy</a>
                </label>
              </div>
              {exitTermsError && <p style={{ color: errColor, fontSize: '13px', margin: '4px 0 0' }}>Please accept the Terms of Use and Privacy Policy.</p>}
            </div>
          </>
        )}
        {reminderStatus === 'sent' && (
          <p style={{ color: '#D4AF37', fontSize: '16px', margin: 0, fontWeight: 600 }}>We&apos;ll remind you!</p>
        )}
      </div>

      {reminderStatus !== 'sent' && (
        /* CHANGE 5: on mobile (pinButtons=false) use an explicit 32px gap above the
           buttons instead of the auto-collapsed spacing. */
        <div style={{ marginTop: pinButtons ? 'auto' : '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button type="button" onClick={handleRemindMe} style={{ ...actionBtnStyle }}>
            Remind me later
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
            No thanks
          </button>
        </div>
      )}
    </div>
  )
}

/* Below 1024px the overlay top bar. CHANGE 2: the logo matches the site nav bar
   exactly (same classes + base inline styles as Nav.tsx) but rendered in black. */
function TopBar({ onClose, subtitle }: { onClose: () => void; subtitle: string }) {
  return (
    <div style={{
      flexShrink: 0,
      minHeight: '56px',
      background: '#ffffff',
      borderBottom: '1px solid rgba(10,17,40,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
    }}>
      <div>
        <div className="nav-logo-text" style={{ color: NAVY, fontSize: '20px', fontWeight: 500, letterSpacing: '0.1em', fontFamily: 'Georgia, serif' }}>Gwags</div>
        <div className="nav-logo-subtitle" style={{ color: NAVY, fontSize: '12px', letterSpacing: '0.2em', marginTop: '1px' }}>{subtitle}</div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
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
   keeps its step/state when the user goes to the reminder and back (CHANGE 4). */
function StackedBody({ lang, mode, exitMode, onX, onBack, onClose, includeFaqInline }: {
  lang: Lang
  mode: 'phone' | 'tablet'
  exitMode: boolean
  onX: () => void
  onBack: () => void
  onClose: () => void
  includeFaqInline: boolean
}) {
  const d = t[lang].donationOverlay
  const n = t[lang].nav
  return (
    <>
      <TopBar onClose={onX} subtitle={n.subtitle} />
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', display: 'flex', flexDirection: 'column' }}>
        {/* Donate pane — FIX 5: flexShrink 0 so expanding the FAQ below scrolls
            rather than reflowing/pushing the portal content up */}
        <div style={{ display: exitMode ? 'none' : 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div className="donation-photo" style={{ background: '#E6E3DC', width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: 'rgba(10,17,40,0.3)', fontSize: '12px', letterSpacing: '0.12em' }}>Photo</span>
          </div>
          <div style={{ padding: '24px 20px 40px' }}>
            <p style={{ color: NAVY, fontSize: '15px', lineHeight: 1.8, margin: '0 0 24px' }}>
              {d.sideText}<a href="mailto:donate@gwags.org" className="donate-email-link"><strong>donate@gwags.org</strong></a>.
            </p>
            <Elements stripe={stripePromise}>
              <DonateForm lang={lang} mode={mode} />
            </Elements>
            {includeFaqInline && <DonationFAQ lang={lang} mode="phone" />}
          </div>
        </div>
        {/* Exit-reminder pane — CHANGE 3: dark gray background, white content */}
        <div style={{ display: exitMode ? 'flex' : 'none', flexDirection: 'column', flex: 1, minHeight: '100%', background: REMINDER_BG, padding: '24px 20px 40px' }}>
          <ExitReminder theme="dark" hideHeader={false} pinButtons={false} onClose={onClose} onConfirmClose={onClose} onBack={onBack} />
        </div>
      </div>
    </>
  )
}

export default function DonationOverlay({ lang, onClose }: OverlayProps) {
  const d = t[lang].donationOverlay
  const [exitMode, setExitMode] = useState(false)
  const [vp, setVp] = useState<'desktop' | 'tablet' | 'phone'>('desktop')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const phoneMq = window.matchMedia('(max-width: 767px)')
    const tabletMq = window.matchMedia('(min-width: 768px) and (max-width: 1023px)')
    const update = () => setVp(phoneMq.matches ? 'phone' : tabletMq.matches ? 'tablet' : 'desktop')
    update()
    phoneMq.addEventListener('change', update)
    tabletMq.addEventListener('change', update)
    return () => { phoneMq.removeEventListener('change', update); tabletMq.removeEventListener('change', update) }
  }, [])

  const handleX = () => {
    if (exitMode) onClose()
    else setExitMode(true)
  }

  /* ── Phone (<768px): full-screen white takeover ── */
  if (vp === 'phone') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <StackedBody lang={lang} mode="phone" exitMode={exitMode} onX={handleX} onBack={() => setExitMode(false)} onClose={onClose} includeFaqInline />
      </div>
    )
  }

  /* ── Tablet (768–1024px): narrow, tall card on a dark overlay (CHANGE 7).
       FIX 6: card max-width reduced from 700px to 640px. ── */
  if (vp === 'tablet') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', width: '90vw', maxWidth: '640px', maxHeight: '92vh' }}>
          <div style={{ width: '100%', flex: '1 1 auto', minHeight: 0, background: '#ffffff', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            <StackedBody lang={lang} mode="tablet" exitMode={exitMode} onX={handleX} onBack={() => setExitMode(false)} onClose={onClose} includeFaqInline={false} />
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
        aria-label="Close"
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
                <Elements stripe={stripePromise}>
                  <DonateForm lang={lang} mode="desktop" />
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
                <ExitReminder onClose={onClose} onConfirmClose={onClose} onBack={() => setExitMode(false)} />
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
