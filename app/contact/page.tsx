'use client'
import { useState } from 'react'
import { useLang } from '@/lib/useLang'
import { t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { COUNTRIES } from '@/lib/countries'

const NAVY = '#0A1128'
const MAX_MSG = 500

export default function ContactPage() {
  const [lang, toggleLang] = useLang()
  const p = t[lang].contactPage

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    country: '', message: '', website: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [emailError, setEmailError] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/.test(form.email.trim())) {
      setEmailError(true)
      return
    }
    setEmailError(false)
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ firstName: '', lastName: '', email: '', phone: '', country: '', message: '', website: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 28px' }}>
        <h1 style={{ color: NAVY, fontSize: '36px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.2, marginBottom: '12px' }}>
          {p.heading}
        </h1>
        <p className="body-text" style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.75, marginBottom: '48px' }}>
          {p.subheading}
        </p>

        {status === 'success' ? (
          <div style={{ padding: '32px', background: '#f0f7f0', borderRadius: '8px', color: '#2d7a2d', fontSize: '17px', textAlign: 'center' }}>
            {p.success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={set('website')}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* First + Last name row */}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.firstName} <span>*</span></label>
                <input required className="form-input" type="text" value={form.firstName} onChange={set('firstName')} />
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.lastName} <span>*</span></label>
                <input required className="form-input" type="text" value={form.lastName} onChange={set('lastName')} />
              </div>
            </div>

            {/* Email + Phone row */}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.email} <span>*</span></label>
                <input
                  required
                  className="form-input"
                  type="email"
                  value={form.email}
                  onChange={e => { set('email')(e); setEmailError(false) }}
                  style={emailError ? { borderColor: '#c0392b' } : undefined}
                />
                {emailError && <p style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>Please enter a valid email address.</p>}
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.phone}</label>
                <input className="form-input" type="tel" placeholder={p.phonePlaceholder} value={form.phone} onChange={set('phone')} />
              </div>
            </div>

            {/* Country */}
            <div className="form-field">
              <label className="form-label">{p.labels.country} <span>*</span></label>
              <select required className="form-input form-select" value={form.country} onChange={set('country')}>
                <option value="" disabled>—</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Message */}
            <div className="form-field">
              <label className="form-label">{p.labels.message} <span>*</span></label>
              <textarea
                required
                className="form-input form-textarea"
                placeholder={p.messagePlaceholder}
                value={form.message}
                onChange={e => {
                  if (e.target.value.length <= MAX_MSG) set('message')(e)
                }}
                rows={6}
              />
              <p className="form-char-count">{form.message.length}/{MAX_MSG}</p>
            </div>

            {status === 'error' && (
              <p style={{ color: '#c0392b', fontSize: '15px', margin: 0 }}>{p.error}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="form-submit-btn"
            >
              {status === 'loading' ? '...' : p.submit}
            </button>
          </form>
        )}
      </div>

      <Footer lang={lang} />
    </main>
  )
}
