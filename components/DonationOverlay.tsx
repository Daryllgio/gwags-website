'use client'
import { useState, useEffect, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lang, t } from '@/lib/translations'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

const ONCE_AMOUNTS = [1000, 500, 100, 50, 25, 5]
const MONTHLY_AMOUNTS = [200, 100, 50, 30, 10, 5]

const NAVY = '#0A1128'
const SELECTED_BG = 'rgba(30, 100, 200, 0.12)'
const SELECTED_BORDER = 'rgb(30, 100, 200)'
const SOLID_BLUE = 'rgb(30, 100, 200)'
const ORIGINAL_BORDER = 'rgba(10,17,40,0.2)'
const ERR_RED = '#c0392b'

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

function DonateForm({ lang }: { lang: Lang }) {
  const d = t[lang].donationOverlay
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
    <div style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* FIX 1: only the active step renders; key retriggers the fade+shift each change */}
      <div key={step} className="donate-step" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

        {/* ── Step 1: Amount ── */}
        {step === 1 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff' }}>
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
                {f === 'once' ? d.giveOnce : d.monthly}
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

          {/* CHANGE 2: marginTop auto pins button to panel bottom */}
          <button type="button" onClick={handleStep1Next} style={{ ...actionBtnStyle, marginTop: 'auto' }}>
            {donateLabel}
          </button>
        </div>
        )}

        {/* ── Step 2: Contact info ── */}
        {step === 2 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '2px', background: '#ffffff' }}>
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
            style={{ ...actionBtnStyle, marginTop: 'auto' }}
          >
            Continue
          </button>
        </div>
        )}

        {/* ── Step 3: Payment ── */}
        {step === 3 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '2px', background: '#ffffff' }}>
          {status === 'success' ? (
            <p style={{ color: '#2d7a2d', fontSize: '15px', margin: 0 }}>Thank you for your donation.</p>
          ) : (
            <>
              {/* Top group: header + card inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <StepHeader title="Payment" onBack={() => setStep(2)} />

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

function ExitReminder({ onClose, onConfirmClose, onBack }: { onClose: () => void; onConfirmClose: () => void; onBack: () => void }) {
  const [reminderEmail, setReminderEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [reminderStatus, setReminderStatus] = useState<'idle' | 'sent'>('idle')
  const [exitTermsAccepted, setExitTermsAccepted] = useState(false)
  const [exitTermsError, setExitTermsError] = useState(false)

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
                color: '#ffffff',
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
          <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, margin: 0, fontFamily: 'inherit', textAlign: 'center' }}>
            Maybe next time?
          </h3>
          <div />
        </div>
        <hr style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '10px 0 0', borderStyle: 'solid', borderWidth: '0 0 1px' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
        <BellIcon />
        <p style={{ color: '#ffffff', fontSize: '16px', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
          Please leave your email address below, and we&apos;ll send you a gentle reminder later.
        </p>
        {reminderStatus !== 'sent' && (
          <>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <label style={{ display: 'block', color: '#ffffff', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
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
                  border: `1.5px solid ${emailError ? '#ff6b6b' : '#ffffff'}`,
                  borderRadius: '6px',
                  background: 'transparent',
                  color: '#ffffff',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
              {emailError && (
                <p style={{ color: '#ff6b6b', fontSize: '13px', margin: '4px 0 0' }}>Email is required.</p>
              )}
            </div>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ marginTop: '1px' }}>
                  <CustomCheckbox
                    id="exit-terms-accept"
                    checked={exitTermsAccepted}
                    onChange={checked => { setExitTermsAccepted(checked); if (checked) setExitTermsError(false) }}
                    uncheckedBorderColor="rgba(255,255,255,0.5)"
                    uncheckedBg="transparent"
                  />
                </div>
                <label htmlFor="exit-terms-accept" style={{ fontSize: '15px', color: '#ffffff', cursor: 'pointer', lineHeight: 1.5 }}>
                  I accept the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>Terms of Use</a>
                  {' '}and{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '2px' }}>Privacy Policy</a>
                </label>
              </div>
              {exitTermsError && <p style={{ color: '#ff6b6b', fontSize: '13px', margin: '4px 0 0' }}>Please accept the Terms of Use and Privacy Policy.</p>}
            </div>
          </>
        )}
        {reminderStatus === 'sent' && (
          <p style={{ color: '#D4AF37', fontSize: '16px', margin: 0, fontWeight: 600 }}>We&apos;ll remind you!</p>
        )}
      </div>

      {reminderStatus !== 'sent' && (
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              border: 'none',
              background: '#ffffff',
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

export default function DonationOverlay({ lang, onClose }: OverlayProps) {
  const d = t[lang].donationOverlay
  const [exitMode, setExitMode] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleX = () => {
    if (exitMode) {
      onClose()
    } else {
      setExitMode(true)
    }
  }

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

      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          maxWidth: '900px',
          width: '100%',
          minHeight: '530px',
          maxHeight: '90vh',
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
                <DonateForm lang={lang} />
              </Elements>
            </div>

            {/* Panel 2: Exit reminder */}
            <div style={{
              minWidth: '100%',
              padding: '48px 36px 20px',
              background: '#2A2A2A',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <ExitReminder onClose={onClose} onConfirmClose={onClose} onBack={() => setExitMode(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
