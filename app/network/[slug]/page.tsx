'use client'
import { useLang } from '@/lib/useLang'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { t } from '@/lib/translations'
import { getOrg, localized } from '@/lib/network'

const NAVY = '#0A1128'
const GOLD = '#D4AF37'

function OrgIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="24" width="36" height="30" rx="2" stroke="#b8b6b0" strokeWidth="3" />
      <path d="M10 24 L32 10 L54 24" stroke="#b8b6b0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="26" y="38" width="12" height="16" stroke="#b8b6b0" strokeWidth="3" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function OrgDetailPage({ params }: { params: { slug: string } }) {
  const [lang, toggleLang] = useLang()
  const n = t[lang].network
  const dt = n.detail
  const org = getOrg(params.slug)

  if (!org) {
    return (
      <main style={{ background: '#ffffff' }}>
        <Nav lang={lang} onToggleLang={toggleLang} />
        <div style={{ padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ color: NAVY, fontSize: '20px' }}>{dt.notFound}</p>
          <Link href="/network" style={{ color: GOLD, fontSize: '16px', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
            ← {dt.back}
          </Link>
        </div>
        <Footer lang={lang} />
      </main>
    )
  }

  const details = [
    { label: dt.sectorLabel, value: localized(org.sector, lang) },
    { label: dt.countryLabel, value: localized(org.country, lang) },
    { label: dt.yearLabel, value: org.year },
    { label: dt.initiativesLabel, value: org.activeInitiatives },
  ]

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      {/* Hero — image, name, sector/location subtitle (Leadership-profile-style treatment) */}
      <section className="nw-detail-hero">
        <div className="nw-detail-hero-inner">
          <div className="nw-detail-img">
            <OrgIcon />
          </div>
          <div>
            <h1 className="nw-detail-name">{org.name}</h1>
            <p className="nw-detail-subtitle">{localized(org.sector, lang)} · {localized(org.country, lang)}</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="ip-section ip-section-white">
        <div className="ip-content-inner">
          <div className="ip-grid">
            <h2 className="ip-section-heading">{dt.aboutHeading}</h2>
            <div>
              <p className="ip-section-body">{dt.aboutText}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="ip-divider" />

      {/* Details */}
      <section className="ip-section ip-section-white">
        <div className="ip-content-inner">
          <div className="ip-grid">
            <h2 className="ip-section-heading">{dt.detailsHeading}</h2>
            <div className="nw-details-grid">
              {details.map((d, i) => (
                <div key={i} className="nw-detail-item">
                  <span className="nw-detail-label">{d.label}:</span>{' '}
                  <span className="nw-detail-value">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="ip-divider" />

      {/* Connect */}
      <section className="ip-section ip-section-white">
        <div className="ip-content-inner">
          <div className="ip-grid">
            <h2 className="ip-section-heading">{dt.connectHeading}</h2>
            <div className="nw-connect-col">
              <a href={org.website} target="_blank" rel="noopener noreferrer" className="card-learn-more" style={{ color: NAVY }}>
                {dt.websiteLabel}
              </a>
              <div className="nw-connect-row">
                <a href={org.instagram} target="_blank" rel="noopener noreferrer" className="pp-connect" aria-label="Instagram">
                  <div className="pp-connect-circle"><InstagramIcon /></div>
                </a>
                <a href={org.linkedin} target="_blank" rel="noopener noreferrer" className="pp-connect" aria-label="LinkedIn">
                  <div className="pp-connect-circle"><span className="pp-connect-in">in</span></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  )
}
