'use client'
import { useRef, useState } from 'react'
import { useLang } from '@/lib/useLang'
import { t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SearchableDropdown from '@/components/SearchableDropdown'
import MultiSelectDropdown from '@/components/MultiSelectDropdown'
import RegionStateField from '@/components/RegionStateField'
import DateField from '@/components/DateField'
import SocialMediaRows, { SocialRow } from '@/components/SocialMediaRows'
import FileUploadField from '@/components/FileUploadField'
import WordCountTextarea from '@/components/WordCountTextarea'
import { COUNTRIES, COUNTRY_LABELS_FR } from '@/lib/countries'
import { FUND_SECTORS, FUND_SECTOR_LABELS_FR, FUND_REFERRAL, FUND_REFERRAL_LABELS_FR } from '@/lib/formOptions'

const NAVY = '#0A1128'
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const DOC_ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png'
const BUDGET_ACCEPT = '.pdf,.doc,.docx,.xls,.xlsx'

export default function MbalLekeakaApplicationPage() {
  const [lang, toggleLang] = useLang()
  const p = t[lang].mbalLekeakaApplicationPage
  const c = t[lang].common

  const [form, setForm] = useState({
    orgName: '', yearEstablished: '', country: '', region: '', city: '',
    sectorOther: '', hasLegalStatus: '', website: '',
    contactFirstName: '', contactLastName: '', contactRole: '', contactPhone: '', contactEmail: '',
    projectTitle: '', projectCountry: '', projectRegion: '', projectCity: '',
    targetBeneficiaries: '', estimatedBeneficiaries: '', totalBudget: '',
    q1: '', q2: '', q3: '', q4: '',
    referral: '', referralOther: '', honeypot: '',
  })
  const [idempotencyKey] = useState(() => crypto.randomUUID())
  const [sectors, setSectors] = useState<string[]>([])
  const [legalDoc, setLegalDoc] = useState<File | null>(null)
  const [socialRows, setSocialRows] = useState<SocialRow[]>([{ platform: '', url: '' }])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [detailedBudget, setDetailedBudget] = useState<File | null>(null)

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const submittingRef = useRef(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const clearErr = (k: string) => setErrors(prev => { const n = { ...prev }; delete n[k]; return n })
  const err = (k: string) => !!errors[k]

  const countryLabels = lang === 'fr' ? COUNTRY_LABELS_FR : undefined
  const sectorLabels = lang === 'fr' ? FUND_SECTOR_LABELS_FR : undefined
  const referralLabels = lang === 'fr' ? FUND_REFERRAL_LABELS_FR : undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submittingRef.current) return

    const nextErrors: Record<string, boolean> = {}
    if (!form.country) nextErrors.country = true
    if (!form.region) nextErrors.region = true
    if (sectors.length === 0) nextErrors.sectors = true
    if (sectors.includes('Other') && !form.sectorOther.trim()) nextErrors.sectorOther = true
    if (!form.hasLegalStatus) nextErrors.hasLegalStatus = true
    if (form.hasLegalStatus === 'yes' && !legalDoc) nextErrors.legalDoc = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.contactEmail.trim())) nextErrors.contactEmail = true
    if (!form.projectCountry) nextErrors.projectCountry = true
    if (!form.projectRegion) nextErrors.projectRegion = true
    if (!startDate) nextErrors.startDate = true
    if (!endDate) nextErrors.endDate = true
    if (startDate && endDate && endDate < startDate) nextErrors.dateOrder = true
    if (!detailedBudget) nextErrors.detailedBudget = true
    if (form.referral === 'Other' && !form.referralOther.trim()) nextErrors.referralOther = true

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    submittingRef.current = true
    setStatus('loading')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('lang', lang)
      fd.append('idempotencyKey', idempotencyKey)
      fd.append('sectors', JSON.stringify(sectors))
      fd.append('socialMedia', JSON.stringify(socialRows.filter(r => r.platform && r.url)))
      fd.append('startDate', startDate)
      fd.append('endDate', endDate)
      if (legalDoc) fd.append('legalDoc', legalDoc)
      if (detailedBudget) fd.append('detailedBudget', detailedBudget)

      const res = await fetch('/api/apply/mbal-lekeaka-fund', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({
        orgName: '', yearEstablished: '', country: '', region: '', city: '',
        sectorOther: '', hasLegalStatus: '', website: '',
        contactFirstName: '', contactLastName: '', contactRole: '', contactPhone: '', contactEmail: '',
        projectTitle: '', projectCountry: '', projectRegion: '', projectCity: '',
        targetBeneficiaries: '', estimatedBeneficiaries: '', totalBudget: '',
        q1: '', q2: '', q3: '', q4: '',
        referral: '', referralOther: '', honeypot: '',
      })
      setSectors([])
      setLegalDoc(null)
      setSocialRows([{ platform: '', url: '' }])
      setStartDate('')
      setEndDate('')
      setDetailedBudget(null)
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

            <div className="form-field">
              <label className="form-label">{p.labels.orgName} <span>*</span></label>
              <input required className="form-input" type="text" value={form.orgName} onChange={set('orgName')} />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.yearEstablished} <span>*</span></label>
              <input required className="form-input" type="number" min="1800" max="2100" value={form.yearEstablished} onChange={set('yearEstablished')} />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.country} <span>*</span></label>
                <SearchableDropdown
                  options={COUNTRIES}
                  value={form.country}
                  onChange={v => { setForm(prev => ({ ...prev, country: v, region: '' })); clearErr('country') }}
                  error={err('country')}
                  labels={countryLabels}
                  placeholder={c.searchPlaceholder}
                  noMatchesText={c.noMatches}
                />
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.region} <span>*</span></label>
                <RegionStateField
                  country={form.country}
                  value={form.region}
                  onChange={v => { setForm(prev => ({ ...prev, region: v })); clearErr('region') }}
                  error={err('region')}
                  searchPlaceholder={c.searchPlaceholder}
                  noMatchesText={c.noMatches}
                  textPlaceholder={p.regionTextPlaceholder}
                  disabledPlaceholder={c.selectCountryFirst}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.city} <span>*</span></label>
              <input required className="form-input" type="text" value={form.city} onChange={set('city')} />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.sector} <span>*</span></label>
              <p className="form-char-count" style={{ textAlign: 'left', margin: '0 0 2px' }}>{c.selectAllThatApply}</p>
              <MultiSelectDropdown
                options={FUND_SECTORS}
                values={sectors}
                onChange={v => { setSectors(v); clearErr('sectors') }}
                error={err('sectors')}
                labels={sectorLabels}
                placeholder={c.searchPlaceholder}
                removeLabel={c.remove}
              />
              {sectors.includes('Other') && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    required
                    className="form-input"
                    type="text"
                    placeholder={c.otherSpecify}
                    value={form.sectorOther}
                    onChange={e => { set('sectorOther')(e); clearErr('sectorOther') }}
                    style={err('sectorOther') ? { borderColor: '#c0392b' } : undefined}
                  />
                </div>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.legalStatusQuestion} <span>*</span></label>
              <SearchableDropdown
                searchable={false}
                options={['yes', 'no']}
                value={form.hasLegalStatus}
                onChange={v => { setForm(prev => ({ ...prev, hasLegalStatus: v })); clearErr('hasLegalStatus') }}
                error={err('hasLegalStatus')}
                labels={{ yes: c.yes, no: c.no }}
                placeholder={c.selectPlaceholder}
                noMatchesText={c.noMatches}
              />
              {form.hasLegalStatus === 'yes' && (
                <div style={{ marginTop: '10px' }}>
                  <FileUploadField
                    file={legalDoc}
                    onChange={f => { setLegalDoc(f); clearErr('legalDoc') }}
                    accept={DOC_ACCEPT}
                    formatsLabel={`${c.acceptedFormats}: PDF, DOC, DOCX, JPG, PNG`}
                    maxSizeBytes={MAX_FILE_SIZE_BYTES}
                    maxSizeLabel={`${c.maxSize}: 5 MB`}
                    chooseLabel={c.chooseFile}
                    removeLabel={c.removeFile}
                    invalidTypeError={c.fileInvalidType}
                    tooLargeError={c.fileTooLarge}
                    error={err('legalDoc')}
                  />
                </div>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.website}</label>
              <input className="form-input" type="url" placeholder="https://" value={form.website} onChange={set('website')} />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.socialMedia}</label>
              <SocialMediaRows
                rows={socialRows}
                onChange={setSocialRows}
                addLabel={c.addAnother}
                removeLabel={c.remove}
                platformPlaceholder={c.platformPlaceholder}
                urlPlaceholder={c.urlPlaceholder}
                noMatchesText={c.noMatches}
              />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.contactFirstName} <span>*</span></label>
                <input required className="form-input" type="text" value={form.contactFirstName} onChange={set('contactFirstName')} />
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.contactLastName} <span>*</span></label>
                <input required className="form-input" type="text" value={form.contactLastName} onChange={set('contactLastName')} />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.contactRole} <span>*</span></label>
              <input required className="form-input" type="text" value={form.contactRole} onChange={set('contactRole')} />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.contactPhone} <span>*</span></label>
                <input required className="form-input" type="tel" value={form.contactPhone} onChange={set('contactPhone')} />
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.contactEmail} <span>*</span></label>
                <input
                  required
                  className="form-input"
                  type="email"
                  value={form.contactEmail}
                  onChange={e => { set('contactEmail')(e); clearErr('contactEmail') }}
                  style={err('contactEmail') ? { borderColor: '#c0392b' } : undefined}
                />
                {err('contactEmail') && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{p.emailInvalid}</p>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.projectTitle} <span>*</span></label>
              <input required className="form-input" type="text" value={form.projectTitle} onChange={set('projectTitle')} />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.projectCountry} <span>*</span></label>
                <SearchableDropdown
                  options={COUNTRIES}
                  value={form.projectCountry}
                  onChange={v => { setForm(prev => ({ ...prev, projectCountry: v, projectRegion: '' })); clearErr('projectCountry') }}
                  error={err('projectCountry')}
                  labels={countryLabels}
                  placeholder={c.searchPlaceholder}
                  noMatchesText={c.noMatches}
                />
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.projectRegion} <span>*</span></label>
                <RegionStateField
                  country={form.projectCountry}
                  value={form.projectRegion}
                  onChange={v => { setForm(prev => ({ ...prev, projectRegion: v })); clearErr('projectRegion') }}
                  error={err('projectRegion')}
                  searchPlaceholder={c.searchPlaceholder}
                  noMatchesText={c.noMatches}
                  textPlaceholder={p.regionTextPlaceholder}
                  disabledPlaceholder={c.selectCountryFirst}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.projectCity} <span>*</span></label>
              <input required className="form-input" type="text" value={form.projectCity} onChange={set('projectCity')} />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.targetBeneficiaries} <span>*</span></label>
              <input required className="form-input" type="text" placeholder={p.targetBeneficiariesPlaceholder} value={form.targetBeneficiaries} onChange={set('targetBeneficiaries')} />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.estimatedBeneficiaries} <span>*</span></label>
              <input required className="form-input" type="number" min="0" placeholder={p.estimatedBeneficiariesPlaceholder} value={form.estimatedBeneficiaries} onChange={set('estimatedBeneficiaries')} />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-field">
                <label className="form-label">{p.labels.startDate} <span>*</span></label>
                <DateField value={startDate} onChange={v => { setStartDate(v); clearErr('startDate'); clearErr('dateOrder') }} lang={lang} error={err('startDate') || err('dateOrder')} placeholder={c.datePlaceholder} />
              </div>
              <div className="form-field">
                <label className="form-label">{p.labels.endDate} <span>*</span></label>
                <DateField value={endDate} onChange={v => { setEndDate(v); clearErr('endDate'); clearErr('dateOrder') }} lang={lang} error={err('endDate') || err('dateOrder')} placeholder={c.datePlaceholder} />
              </div>
            </div>
            {err('dateOrder') && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '-14px 0 0' }}>{p.dateOrderError}</p>}

            <div className="form-field">
              <label className="form-label">{p.labels.totalBudget} <span>*</span></label>
              <input required className="form-input" type="text" placeholder={p.totalBudgetPlaceholder} value={form.totalBudget} onChange={set('totalBudget')} />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.q1} <span>*</span></label>
              <WordCountTextarea value={form.q1} onChange={v => setForm(prev => ({ ...prev, q1: v }))} maxWords={300} wordsLabel={c.words} rows={6} required />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.q2} <span>*</span></label>
              <WordCountTextarea value={form.q2} onChange={v => setForm(prev => ({ ...prev, q2: v }))} maxWords={500} wordsLabel={c.words} rows={8} required />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.q3} <span>*</span></label>
              <WordCountTextarea value={form.q3} onChange={v => setForm(prev => ({ ...prev, q3: v }))} maxWords={200} wordsLabel={c.words} rows={5} required />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.q4}</label>
              <WordCountTextarea value={form.q4} onChange={v => setForm(prev => ({ ...prev, q4: v }))} maxWords={200} wordsLabel={c.words} rows={5} />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.detailedBudget} <span>*</span></label>
              <FileUploadField
                file={detailedBudget}
                onChange={f => { setDetailedBudget(f); clearErr('detailedBudget') }}
                accept={BUDGET_ACCEPT}
                formatsLabel={`${c.acceptedFormats}: PDF, DOC, DOCX, XLS, XLSX`}
                maxSizeBytes={MAX_FILE_SIZE_BYTES}
                maxSizeLabel={`${c.maxSize}: 5 MB`}
                chooseLabel={c.chooseFile}
                removeLabel={c.removeFile}
                invalidTypeError={c.fileInvalidType}
                tooLargeError={c.fileTooLarge}
                error={err('detailedBudget')}
              />
            </div>

            <div className="form-field">
              <label className="form-label">{p.labels.referral}</label>
              <SearchableDropdown
                searchable={false}
                options={FUND_REFERRAL}
                value={form.referral}
                onChange={v => { setForm(prev => ({ ...prev, referral: v })); clearErr('referralOther') }}
                labels={referralLabels}
                placeholder={c.selectPlaceholder}
                noMatchesText={c.noMatches}
              />
              {form.referral === 'Other' && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    required
                    className="form-input"
                    type="text"
                    placeholder={c.otherSpecify}
                    value={form.referralOther}
                    onChange={e => { set('referralOther')(e); clearErr('referralOther') }}
                    style={err('referralOther') ? { borderColor: '#c0392b' } : undefined}
                  />
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
