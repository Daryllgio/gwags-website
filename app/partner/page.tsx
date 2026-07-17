'use client'
import { useState } from 'react'
import { useLang } from '@/lib/useLang'
import { t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SearchableDropdown from '@/components/SearchableDropdown'
import { COUNTRIES, SECTORS } from '@/lib/countries'

const NAVY = '#0A1128'
const MAX_DESC = 300
const MAX_MSG = 1000

export default function PartnerPage() {
  const [lang, toggleLang] = useLang()
  const p = t[lang].partnerPage

  const [form, setForm] = useState({
    contactName: '', orgName: '', orgEmail: '', orgPhone: '',
    website: '', country: '', city: '', sector: '', sectorOther: '',
    orgDesc: '', message: '', honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [emailError, setEmailError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [sectorError, setSectorError] = useState(false)
  const [sectorOtherError, setSectorOtherError] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let hasError = false
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/.test(form.orgEmail.trim())) {
      setEmailError(true)
      hasError = true
    } else {
      setEmailError(false)
    }
    if (!form.country) {
      setCountryError(true)
      hasError = true
    } else {
      setCountryError(false)
    }
    if (!form.sector) {
      setSectorError(true)
      hasError = true
    } else {
      setSectorError(false)
    }
    if (form.sector === 'Other' && !form.sectorOther.trim()) {
      setSectorOtherError(true)
      hasError = true
    } else {
      setSectorOtherError(false)
    }
    if (hasError) return
    setStatus('loading')
    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sector: form.sector === 'Other' ? form.sectorOther.trim() : form.sector }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ contactName: '', orgName: '', orgEmail: '', orgPhone: '', website: '', country: '', city: '', sector: '', sectorOther: '', orgDesc: '', message: '', honeypot: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="form-page-container" style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 28px' }}>
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
            <input type="text" name="honeypot" value={form.honeypot} onChange={set('honeypot')} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            {/* Contact Person Name */}
            <div className="form-field">
              <label className="form-label">{p.labels.contactName} <span>*</span></label>
              <input required className="form-input" type="text" value={form.contactName} onChange={set('contactName')} />
            </div>

            {/* Org Name + Website */}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.orgName} <span>*</span></label>
                <input required className="form-input" type="text" value={form.orgName} onChange={set('orgName')} />
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.website} <span>*</span></label>
                <input required className="form-input" type="url" placeholder="https://" value={form.website} onChange={set('website')} />
              </div>
            </div>

            {/* Org Email + Phone */}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.orgEmail} <span>*</span></label>
                <input
                  required
                  className="form-input"
                  type="email"
                  value={form.orgEmail}
                  onChange={e => { set('orgEmail')(e); setEmailError(false) }}
                  style={emailError ? { borderColor: '#c0392b' } : undefined}
                />
                {emailError && <p style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>Please enter a valid email address.</p>}
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.orgPhone}</label>
                <input className="form-input" type="tel" placeholder={p.phonePlaceholder} value={form.orgPhone} onChange={set('orgPhone')} />
              </div>
            </div>

            {/* Country + City */}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.country} <span>*</span></label>
                <SearchableDropdown
                  options={COUNTRIES}
                  value={form.country}
                  onChange={v => { setForm(prev => ({ ...prev, country: v })); setCountryError(false) }}
                  error={countryError}
                />
                {countryError && <p style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>Please select a country.</p>}
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.city} <span>*</span></label>
                <input required className="form-input" type="text" value={form.city} onChange={set('city')} />
              </div>
            </div>

            {/* Sector */}
            <div className="form-field">
              <label className="form-label">{p.labels.sector} <span>*</span></label>
              <SearchableDropdown
                options={SECTORS}
                value={form.sector}
                onChange={v => { setForm(prev => ({ ...prev, sector: v, sectorOther: v === 'Other' ? prev.sectorOther : '' })); setSectorError(false); setSectorOtherError(false) }}
                error={sectorError}
              />
              {sectorError && <p style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>Please select a sector.</p>}
              {form.sector === 'Other' && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    required
                    className="form-input"
                    type="text"
                    placeholder="Please specify your sector"
                    value={form.sectorOther}
                    onChange={e => { set('sectorOther')(e); setSectorOtherError(false) }}
                    style={sectorOtherError ? { borderColor: '#c0392b' } : undefined}
                  />
                  {sectorOtherError && <p style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>Please specify your sector.</p>}
                </div>
              )}
            </div>

            {/* Org description */}
            <div className="form-field">
              <label className="form-label">{p.labels.orgDesc} <span>*</span></label>
              <textarea
                required
                className="form-input form-textarea"
                placeholder={p.orgDescPlaceholder}
                value={form.orgDesc}
                onChange={e => { if (e.target.value.length <= MAX_DESC) set('orgDesc')(e) }}
                rows={4}
              />
              <p className="form-char-count">{form.orgDesc.length}/{MAX_DESC}</p>
            </div>

            {/* Message */}
            <div className="form-field">
              <label className="form-label">{p.labels.message} <span>*</span></label>
              <textarea
                required
                className="form-input form-textarea"
                placeholder={p.messagePlaceholder}
                value={form.message}
                onChange={e => { if (e.target.value.length <= MAX_MSG) set('message')(e) }}
                rows={6}
              />
              <p className="form-char-count">{form.message.length}/{MAX_MSG}</p>
            </div>

            {status === 'error' && (
              <p style={{ color: '#c0392b', fontSize: '15px', margin: 0 }}>{p.error}</p>
            )}

            <button type="submit" disabled={status === 'loading'} className="form-submit-btn">
              {status === 'loading' ? '...' : p.submit}
            </button>
          </form>
        )}
      </div>

      <Footer lang={lang} />
    </main>
  )
}
