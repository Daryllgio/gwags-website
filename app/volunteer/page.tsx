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
import CountryCodeField from '@/components/CountryCodeField'
import FileUploadField from '@/components/FileUploadField'
import { COUNTRIES, COUNTRY_LABELS_FR } from '@/lib/countries'
import {
  VOLUNTEER_GENDER, VOLUNTEER_GENDER_LABELS_FR,
  VOLUNTEER_STATUS, VOLUNTEER_STATUS_LABELS_FR,
  VOLUNTEER_AVAILABILITY, VOLUNTEER_AVAILABILITY_LABELS_FR,
  VOLUNTEER_REFERRAL, VOLUNTEER_REFERRAL_LABELS_FR,
  VOLUNTEER_SKILLS, VOLUNTEER_SKILL_LABELS_FR,
} from '@/lib/formOptions'
import { VOLUNTEER_LANGUAGES } from '@/lib/languages'
import { getDialCode } from '@/lib/locations'

const NAVY = '#0A1128'
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
const CV_ACCEPT = '.pdf,.doc,.docx'

export default function VolunteerApplicationPage() {
  const [lang, toggleLang] = useLang()
  const p = t[lang].volunteerApplicationPage
  const c = t[lang].common

  const [form, setForm] = useState({
    firstName: '', lastName: '', gender: '', email: '',
    phoneCountry: 'Cameroon', phone: '', country: '', region: '', city: '',
    currentStatus: '', fieldOrProfession: '',
    availability: '', referral: '', referralOther: '', skillsOther: '', honeypot: '',
  })
  const [idempotencyKey] = useState(() => crypto.randomUUID())
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [languages, setLanguages] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [cv, setCv] = useState<File | null>(null)

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const submittingRef = useRef(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const clearErr = (k: string) => setErrors(prev => { const n = { ...prev }; delete n[k]; return n })
  const err = (k: string) => !!errors[k]

  const countryLabels = lang === 'fr' ? COUNTRY_LABELS_FR : undefined
  const genderLabels = lang === 'fr' ? VOLUNTEER_GENDER_LABELS_FR : undefined
  const statusLabels = lang === 'fr' ? VOLUNTEER_STATUS_LABELS_FR : undefined
  const availabilityLabels = lang === 'fr' ? VOLUNTEER_AVAILABILITY_LABELS_FR : undefined
  const referralLabels = lang === 'fr' ? VOLUNTEER_REFERRAL_LABELS_FR : undefined
  const skillLabels = lang === 'fr' ? VOLUNTEER_SKILL_LABELS_FR : undefined

  // Label for the single conditional field shown below Current Status —
  // depends on which status is selected; no field at all for Unemployed.
  const conditionalStatusLabel = form.currentStatus === 'Student' ? p.fieldOfStudyLabel
    : form.currentStatus === 'Employed' ? p.jobTitleLabel
    : form.currentStatus === 'Self-employed' ? p.occupationLabel
    : form.currentStatus === 'Other' ? p.pleaseSpecifyLabel
    : ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submittingRef.current) return

    const nextErrors: Record<string, boolean> = {}
    if (!dateOfBirth) nextErrors.dateOfBirth = true
    if (!form.gender) nextErrors.gender = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) nextErrors.email = true
    if (!form.country) nextErrors.country = true
    if (!form.region) nextErrors.region = true
    if (!form.currentStatus) nextErrors.currentStatus = true
    if (form.currentStatus && form.currentStatus !== 'Unemployed' && !form.fieldOrProfession.trim()) nextErrors.fieldOrProfession = true
    if (languages.length === 0) nextErrors.languages = true
    if (skills.length === 0) nextErrors.skills = true
    if (skills.includes('Other') && !form.skillsOther.trim()) nextErrors.skillsOther = true
    if (!form.availability) nextErrors.availability = true
    if (!cv) nextErrors.cv = true
    if (!form.referral) nextErrors.referral = true
    if (form.referral === 'Other' && !form.referralOther.trim()) nextErrors.referralOther = true

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    submittingRef.current = true
    setStatus('loading')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.set('phone', `${getDialCode(form.phoneCountry)} ${form.phone}`.trim())
      fd.append('lang', lang)
      fd.append('idempotencyKey', idempotencyKey)
      fd.append('dateOfBirth', dateOfBirth)
      fd.append('languages', JSON.stringify(languages))
      fd.append('skills', JSON.stringify(skills))
      if (cv) fd.append('cv', cv)

      const res = await fetch('/api/volunteer', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({
        firstName: '', lastName: '', gender: '', email: '',
        phoneCountry: 'Cameroon', phone: '', country: '', region: '', city: '',
        currentStatus: '', fieldOrProfession: '',
        availability: '', referral: '', referralOther: '', skillsOther: '', honeypot: '',
      })
      setDateOfBirth('')
      setLanguages([])
      setSkills([])
      setCv(null)
    } catch {
      setStatus('error')
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="form-page-container" style={{ maxWidth: '820px', margin: '0 auto', padding: '80px 28px' }}>
        <h1 className="form-page-h1" style={{ color: NAVY, fontSize: '36px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.2, marginBottom: '48px' }}>
          {p.heading}
        </h1>

        {status === 'success' ? (
          <div className="form-success-banner" style={{ padding: '32px', background: '#f0f7f0', borderRadius: '8px', color: '#2d7a2d', fontSize: '17px', textAlign: 'center' }}>
            {p.success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <input type="text" name="honeypot" value={form.honeypot} onChange={set('honeypot')} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            {/* SECTION: About you */}
            <div className="form-section-group">
              <h2 className="form-section-heading">{p.aboutSectionHeading}</h2>

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
                  <label className="form-label">{p.labels.dateOfBirth} <span>*</span></label>
                  <DateField
                    value={dateOfBirth}
                    onChange={v => { setDateOfBirth(v); clearErr('dateOfBirth') }}
                    lang={lang}
                    error={err('dateOfBirth')}
                    placeholder={c.datePlaceholder}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">{p.labels.gender} <span>*</span></label>
                  <SearchableDropdown
                    searchable={false}
                    options={VOLUNTEER_GENDER}
                    value={form.gender}
                    onChange={v => { setForm(prev => ({ ...prev, gender: v })); clearErr('gender') }}
                    error={err('gender')}
                    labels={genderLabels}
                    placeholder={p.genderPlaceholder}
                    noMatchesText={c.noMatches}
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-field">
                  <label className="form-label">{p.labels.email} <span>*</span></label>
                  <input
                    required
                    className="form-input"
                    type="email"
                    value={form.email}
                    onChange={e => { set('email')(e); clearErr('email') }}
                    style={err('email') ? { borderColor: '#c0392b' } : undefined}
                  />
                  {err('email') && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{p.emailInvalid}</p>}
                </div>
                <div className="form-field">
                  <label className="form-label">{p.labels.phone} <span>*</span></label>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '8px' }}>
                    <CountryCodeField
                      value={form.phoneCountry}
                      onChange={v => setForm(prev => ({ ...prev, phoneCountry: v }))}
                      lang={lang}
                      noMatchesText={c.noMatches}
                    />
                    <input required className="form-input" type="tel" value={form.phone} onChange={set('phone')} />
                  </div>
                </div>
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-field">
                  <label className="form-label">{p.labels.country} <span>*</span></label>
                  <SearchableDropdown
                    options={COUNTRIES}
                    value={form.country}
                    onChange={v => { setForm(prev => ({ ...prev, country: v, region: '', city: '' })); clearErr('country') }}
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
                <input
                  required
                  className="form-input"
                  type="text"
                  value={form.city}
                  onChange={set('city')}
                  disabled={!form.country || !form.region}
                  placeholder={!form.country ? c.selectCountryFirst : (!form.region ? c.selectRegionFirst : undefined)}
                />
              </div>
            </div>

            {/* SECTION: Background */}
            <div className="form-section-group">
              <h2 className="form-section-heading">{p.backgroundSectionHeading}</h2>

              <div className="form-field">
                <label className="form-label">{p.labels.currentStatus} <span>*</span></label>
                <SearchableDropdown
                  searchable={false}
                  options={VOLUNTEER_STATUS}
                  value={form.currentStatus}
                  onChange={v => {
                    setForm(prev => ({ ...prev, currentStatus: v, fieldOrProfession: '' }))
                    clearErr('currentStatus')
                    clearErr('fieldOrProfession')
                  }}
                  error={err('currentStatus')}
                  labels={statusLabels}
                  placeholder={p.statusPlaceholder}
                  noMatchesText={c.noMatches}
                  belowTrigger={form.currentStatus && form.currentStatus !== 'Unemployed' && (
                    <div style={{ marginTop: '10px' }}>
                      <label className="form-label">{conditionalStatusLabel} <span>*</span></label>
                      <input
                        required
                        className="form-input"
                        type="text"
                        value={form.fieldOrProfession}
                        onChange={e => { set('fieldOrProfession')(e); clearErr('fieldOrProfession') }}
                        style={err('fieldOrProfession') ? { borderColor: '#c0392b' } : undefined}
                      />
                    </div>
                  )}
                />
              </div>

              <div className="form-field">
                <label className="form-label">{p.labels.languages} <span>*</span></label>
                <p className="form-select-hint">{p.multiSelectHint}</p>
                <MultiSelectDropdown
                  searchable
                  options={VOLUNTEER_LANGUAGES}
                  values={languages}
                  onChange={v => { setLanguages(v); clearErr('languages') }}
                  error={err('languages')}
                  placeholder={c.selectPlaceholder}
                  searchPlaceholder={p.languagesSearchPlaceholder}
                  noMatchesText={c.noMatches}
                  removeLabel={c.remove}
                />
                {err('languages') && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{p.languagesRequired}</p>}
              </div>
            </div>

            {/* SECTION: Volunteering */}
            <div className="form-section-group">
              <h2 className="form-section-heading">{p.volunteeringSectionHeading}</h2>

              <div className="form-field">
                <label className="form-label">{p.labels.skills} <span>*</span></label>
                <p className="form-select-hint">{p.multiSelectHint}</p>
                <MultiSelectDropdown
                  searchable
                  options={VOLUNTEER_SKILLS}
                  values={skills}
                  onChange={v => {
                    setSkills(v)
                    clearErr('skills')
                    if (!v.includes('Other')) { clearErr('skillsOther'); setForm(prev => ({ ...prev, skillsOther: '' })) }
                  }}
                  error={err('skills')}
                  labels={skillLabels}
                  placeholder={c.selectPlaceholder}
                  searchPlaceholder={p.skillsSearchPlaceholder}
                  noMatchesText={c.noMatches}
                  removeLabel={c.remove}
                  belowTrigger={skills.includes('Other') && (
                    <div style={{ marginTop: '10px' }}>
                      <input
                        required
                        className="form-input"
                        type="text"
                        placeholder={c.otherSpecify}
                        value={form.skillsOther}
                        onChange={e => { set('skillsOther')(e); clearErr('skillsOther') }}
                        style={err('skillsOther') ? { borderColor: '#c0392b' } : undefined}
                      />
                      <p className="form-select-hint" style={{ margin: '4px 0 0' }}>{p.skillsOtherHelper}</p>
                    </div>
                  )}
                />
                {err('skills') && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{p.skillsRequired}</p>}
              </div>

              <div className="form-field">
                <label className="form-label">{p.labels.availability} <span>*</span></label>
                <SearchableDropdown
                  searchable={false}
                  options={VOLUNTEER_AVAILABILITY}
                  value={form.availability}
                  onChange={v => { setForm(prev => ({ ...prev, availability: v })); clearErr('availability') }}
                  error={err('availability')}
                  labels={availabilityLabels}
                  placeholder={p.availabilityPlaceholder}
                  noMatchesText={c.noMatches}
                />
              </div>
            </div>

            {/* SECTION: Additional information */}
            <div className="form-section-group">
              <h2 className="form-section-heading">{p.additionalInfoSectionHeading}</h2>

              <div className="form-field">
                <label className="form-label">{p.labels.cv} <span>*</span></label>
                <FileUploadField
                  file={cv}
                  onChange={f => { setCv(f); clearErr('cv') }}
                  accept={CV_ACCEPT}
                  formatsLabel={p.cvFormatsLabel}
                  maxSizeBytes={MAX_FILE_SIZE_BYTES}
                  maxSizeLabel={p.cvMaxSizeLabel}
                  chooseLabel={c.chooseFile}
                  removeLabel={c.removeFile}
                  invalidTypeError={c.fileInvalidType}
                  tooLargeError={p.cvTooLarge}
                  error={err('cv')}
                />
                {err('cv') && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{p.cvRequired}</p>}
              </div>

              <div className="form-field">
                <label className="form-label">{p.labels.referral} <span>*</span></label>
                <SearchableDropdown
                  searchable={false}
                  options={VOLUNTEER_REFERRAL}
                  value={form.referral}
                  onChange={v => {
                    setForm(prev => ({ ...prev, referral: v, referralOther: v !== 'Other' ? '' : prev.referralOther }))
                    clearErr('referral')
                    clearErr('referralOther')
                  }}
                  error={err('referral')}
                  labels={referralLabels}
                  placeholder={c.selectPlaceholder}
                  noMatchesText={c.noMatches}
                  belowTrigger={form.referral === 'Other' && (
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
                />
                {err('referral') && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{p.referralRequired}</p>}
              </div>
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
