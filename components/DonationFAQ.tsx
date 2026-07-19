'use client'
import { useState, useRef, useEffect } from 'react'
import { Lang, t } from '@/lib/translations'

const NAVY = '#0A1128'
const SOLID_BLUE = 'rgb(30, 100, 200)'
const ORIGINAL_BORDER = 'rgba(10,17,40,0.2)'
const ERR_RED = '#c0392b'
const MAX_REPORT = 500

type FaqKey = 'secure' | 'receipt' | 'cancel' | 'report'
const ALL_KEYS: FaqKey[] = ['secure', 'receipt', 'cancel', 'report']

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', flexShrink: 0 }}>
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XIcon({ color = NAVY }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <line x1="1" y1="1" x2="13" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="1" x2="1" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* The "Report a problem" form — reused inside the desktop/tablet popup and the phone accordion. */
function ReportForm({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const r = t[lang].donationFaq.report
  const [text, setText] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [textErr, setTextErr] = useState(false)
  const [confirmErr, setConfirmErr] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async () => {
    let bad = false
    if (!text.trim()) { setTextErr(true); bad = true }
    if (!confirm) { setConfirmErr(true); bad = true }
    if (bad) return
    try {
      await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
    } catch { /* best-effort */ }
    setSent(true)
    setTimeout(onClose, 1200)
  }

  if (sent) {
    return <p style={{ color: '#2d7a2d', fontSize: '13px', margin: 0 }}>{r.sent}</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <textarea
          value={text}
          onChange={e => { if (e.target.value.length <= MAX_REPORT) { setText(e.target.value); setTextErr(false) } }}
          placeholder={r.placeholder}
          rows={4}
          style={{
            width: '100%', padding: '10px 12px',
            border: `1.5px solid ${textErr ? ERR_RED : ORIGINAL_BORDER}`,
            borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit',
            color: NAVY, outline: 'none', resize: 'vertical', boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8A8A8A', marginTop: '2px' }}>
          <span style={{ color: ERR_RED }}>{textErr ? r.textRequired : ''}</span>
          <span>{text.length}/{MAX_REPORT}</span>
        </div>
      </div>
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: NAVY, cursor: 'pointer', lineHeight: 1.4 }}>
        <input
          type="checkbox"
          checked={confirm}
          onChange={e => { setConfirm(e.target.checked); if (e.target.checked) setConfirmErr(false) }}
          style={{ marginTop: '2px', accentColor: SOLID_BLUE, flexShrink: 0 }}
        />
        <span>{r.confirm}</span>
      </label>
      {confirmErr && <p style={{ color: ERR_RED, fontSize: '11px', margin: 0 }}>{r.confirmRequired}</p>}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" onClick={submit}
          style={{ flex: 1, padding: '10px', background: SOLID_BLUE, color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          {r.submit}
        </button>
        <button type="button" onClick={onClose}
          style={{ flex: 1, padding: '10px', background: '#ffffff', color: NAVY, border: `1.5px solid ${ORIGINAL_BORDER}`, borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          {r.cancel}
        </button>
      </div>
    </div>
  )
}

export default function DonationFAQ({ lang, mode }: { lang: Lang; mode: 'desktop' | 'tablet' | 'phone' }) {
  const f = t[lang].donationFaq
  const [openItem, setOpenItem] = useState<FaqKey | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const label = (key: FaqKey) => f[key].q

  /* Outside-click closes info popups only; the Report popup stays open until X/Cancel. */
  useEffect(() => {
    if (mode === 'phone') return
    if (!openItem || openItem === 'report') return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (popupRef.current && !popupRef.current.contains(target) && !target.closest('.faq-trigger')) {
        setOpenItem(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [openItem, mode])

  const toggle = (key: FaqKey) => {
    // Once the Report popup is open, only its own X/Cancel can close it.
    if (openItem === 'report') return
    setOpenItem(prev => (prev === key ? null : key))
  }

  /* ── Phone: vertical accordion ──
     - only the top divider (borderTop on the container) — no per-item dividers.
     - chevron on the LEFT, text on the right.
     - item text reduced 15px → 13.5px.
     - chevron points right when closed, rotates down when open (ChevronIcon, animated).
     - CHANGE 6: gap above the divider (24px, was 8px) and below it (24px = 14px
       container padding + the first button's own 10px top padding, was ~16px) are
       now equal.
     - CHANGE 7: answer text indented 24px (chevron 14px + 10px gap) to align with
       the question text instead of the chevron.
     - CHANGE 8: per-item padding reduced 16px → 10px, so the gap between two closed
       items drops from 32px (16+16) to 20px (10+10). */
  if (mode === 'phone') {
    const itemPad = '10px 0'
    const answerIndent = 24
    return (
      <div style={{ marginTop: '24px', borderTop: '1px solid rgba(10,17,40,0.1)', paddingTop: '14px' }}>
        {ALL_KEYS.map(key => {
          const isOpen = openItem === key
          return (
            <div key={key}>
              <button
                type="button"
                className="faq-trigger"
                onClick={() => setOpenItem(prev => (prev === key ? null : key))}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px',
                  background: 'none', border: 'none', padding: itemPad, cursor: 'pointer',
                  fontFamily: 'inherit', color: NAVY, fontSize: '13.5px', fontWeight: 500, textAlign: 'left',
                }}
              >
                <span style={{ color: NAVY, display: 'flex' }}><ChevronIcon open={isOpen} /></span>
                <span>{label(key)}</span>
              </button>
              {isOpen && (
                <div style={{ padding: `0 0 18px ${answerIndent}px` }}>
                  {key === 'report'
                    ? <ReportForm lang={lang} onClose={() => setOpenItem(null)} />
                    : <p style={{ fontSize: '14px', color: '#4A4A4A', lineHeight: 1.65, margin: 0 }}>{f[key].a}</p>}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  /* ── Desktop (row) / Tablet (2×2) popups ── */
  const containerStyle: React.CSSProperties = mode === 'tablet'
    ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', width: '100%', maxWidth: '520px' }
    : { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px' }

  return (
    <div style={containerStyle}>
      {ALL_KEYS.map(key => {
        const isOpen = openItem === key
        const isReport = key === 'report'
        return (
          <div key={key} style={{ position: 'relative', display: 'flex', justifyContent: mode === 'tablet' ? 'flex-start' : 'center' }}>
            <button
              type="button"
              className="faq-trigger"
              onClick={() => toggle(key)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                color: '#ffffff', fontSize: '13px', fontFamily: 'inherit',
                textDecoration: isOpen ? 'underline' : 'none', textUnderlineOffset: '3px', whiteSpace: 'nowrap',
              }}
            >
              {label(key)}
            </button>
            {isOpen && (
              <div
                ref={popupRef}
                style={{
                  position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)',
                  background: '#ffffff', color: NAVY, border: '1px solid rgba(0,0,0,0.15)', borderRadius: '8px',
                  padding: '14px', width: isReport ? '300px' : '260px', maxWidth: '80vw',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.20)', zIndex: 20, textAlign: 'left',
                }}
              >
                {isReport ? (
                  <>
                    {/* CHANGE 9: bolded question heading, X stays on the same row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: NAVY, margin: 0 }}>{label(key)}</p>
                      <button type="button" aria-label="Close" onClick={() => setOpenItem(null)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexShrink: 0, marginTop: '2px' }}>
                        <XIcon />
                      </button>
                    </div>
                    <ReportForm lang={lang} onClose={() => setOpenItem(null)} />
                  </>
                ) : (
                  <>
                    {/* CHANGE 9: bolded question heading above the answer */}
                    <p style={{ fontSize: '13px', fontWeight: 700, color: NAVY, margin: '0 0 8px' }}>{label(key)}</p>
                    <p style={{ fontSize: '13px', color: NAVY, lineHeight: 1.6, margin: 0 }}>{f[key].a}</p>
                  </>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
