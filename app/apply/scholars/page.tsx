'use client'
import { useRef, useState } from 'react'
import { useLang } from '@/lib/useLang'
import { t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WordCountTextarea from '@/components/WordCountTextarea'
import FileUploadField from '@/components/FileUploadField'
import { YEAR_OF_STUDY, YEAR_OF_STUDY_LABELS_FR, SCHOLARS_REFERRAL, SCHOLARS_REFERRAL_LABELS_FR } from '@/lib/formOptions'

const NAVY = '#0A1128'
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png'

export default function ScholarsApplicationPage() {
  const [lang, toggleLang] = useLang()
  const p = t[lang].scholarsApplicationPage
  const c = t[lang].common

  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    university: '', fieldOfStudy: '', yearOfStudy: '',
    writtenResponse: '', referral: '', referralOther: '', honeypot: '',
  })
  const [transcript, setTranscript] = useState<File | null>(null)
  const [idempotencyKey] = useState(() => crypto.randomUUID())
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [emailError, setEmailError] = useState(false)
  const [yearError, setYearError] = useState(false)
  const [transcriptError, setTranscriptError] = useState(false)
  const [referralOtherError, setReferralOtherError] = useState(false)
  const submittingRef = useRef(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const referralLabels = lang === 'fr' ? SCHOLARS_REFERRAL_LABELS_FR : undefined
  const yearLabels = lang === 'fr' ? YEAR_OF_STUDY_LABELS_FR : undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submittingRef.current) return

    let hasError = false
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setEmailError(true); hasError = true
    } else setEmailError(false)
    if (!form.yearOfStudy) { setYearError(true); hasError = true } else setYearError(false)
    if (!transcript) { setTranscriptError(true); hasError = true } else setTranscriptError(false)
    if (form.referral === 'Other' && !form.referralOther.trim()) { setReferralOtherError(true); hasError = true } else setReferralOtherError(false)
    if (hasError) return

    submittingRef.current = true
    setStatus('loading')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('lang', lang)
      fd.append('idempotencyKey', idempotencyKey)
      if (transcript) fd.append('transcript', transcript)

      const res = await fetch('/api/apply/scholars', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ firstName: '', lastName: '', phone: '', email: '', university: '', fieldOfStudy: '', yearOfStudy: '', writtenResponse: '', referral: '', referralOther: '', honeypot: '' })
      setTranscript(null)
    } catch {
      setStatus('error')
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="form-page-container" style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 28px' }}>
        <h1 className="form-page-h1" style={{ color: NAVY, fontSize: '36px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.2, marginBottom: '12px' }}>
          {p.heading}
        </h1>
        <p className="form-page-subheading" style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.75, marginBottom: '48px' }}>
          {p.subheading}
        </p>

        {status === 'success' ? (
          <div className="form-success-banner" style={{ padding: '32px', background: '#f0f7f0', borderRadius: '8px', color: '#2d7a2d', fontSize: '17px', textAlign: 'center' }}>
            {p.success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <input type="text" name="honeypot" value={form.honeypot} onChange={set('honeypot')} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

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

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.phone} <span>*</span></label>
                <input required className="form-input" type="tel" value={form.phone} onChange={set('phone')} />
              </div>
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
                {emailError && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{p.emailInvalid}</p>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.university} <span>*</span></label>
              <input required className="form-input" type="text" value={form.university} onChange={set('university')} />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.fieldOfStudy} <span>*</span></label>
                <input required className="form-input" type="text" value={form.fieldOfStudy} onChange={set('fieldOfStudy')} />
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.yearOfStudy} <span>*</span></label>
                <select
                  className="form-input form-select"
                  value={form.yearOfStudy}
                  onChange={e => { set('yearOfStudy')(e); setYearError(false) }}
                  style={yearError ? { borderColor: '#c0392b' } : undefined}
                >
                  <option value="">{p.yearOfStudyPlaceholder}</option>
                  {YEAR_OF_STUDY.map(y => <option key={y} value={y}>{yearLabels?.[y] ?? y}</option>)}
                </select>
                {yearError && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{p.yearOfStudyRequired}</p>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.writtenResponse} <span>*</span></label>
              <WordCountTextarea
                value={form.writtenResponse}
                onChange={v => setForm(prev => ({ ...prev, writtenResponse: v }))}
                placeholder={p.writtenResponsePlaceholder}
                wordsLabel={c.words}
                rows={7}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.transcript} <span>*</span></label>
              <FileUploadField
                file={transcript}
                onChange={f => { setTranscript(f); setTranscriptError(false) }}
                accept={ACCEPT}
                formatsLabel={`${c.acceptedFormats}: PDF, DOC, DOCX, JPG, PNG`}
                maxSizeBytes={MAX_FILE_SIZE_BYTES}
                maxSizeLabel={`${c.maxSize}: 5 MB`}
                chooseLabel={c.chooseFile}
                removeLabel={c.removeFile}
                invalidTypeError={c.fileInvalidType}
                tooLargeError={c.fileTooLarge}
                error={transcriptError}
              />
              {transcriptError && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{p.transcriptRequired}</p>}
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.referral}</label>
              <select className="form-input form-select" value={form.referral} onChange={e => { set('referral')(e); setReferralOtherError(false) }}>
                <option value=""></option>
                {SCHOLARS_REFERRAL.map(r => <option key={r} value={r}>{referralLabels?.[r] ?? r}</option>)}
              </select>
              {form.referral === 'Other' && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    required
                    className="form-input"
                    type="text"
                    placeholder={c.otherSpecify}
                    value={form.referralOther}
                    onChange={e => { set('referralOther')(e); setReferralOtherError(false) }}
                    style={referralOtherError ? { borderColor: '#c0392b' } : undefined}
                  />
                  {referralOtherError && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{c.otherSpecifyRequired}</p>}
                </div>
              )}
            </div>

            {status === 'error' && (
              <p className="form-error-msg" style={{ color: '#c0392b', fontSize: '15px', margin: 0 }}>{p.error}</p>
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
