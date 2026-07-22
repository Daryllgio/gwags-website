'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/useLang'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { t } from '@/lib/translations'
import { NETWORK_ORGS, localized } from '@/lib/network'

const NAVY = '#0A1128'

function OrgIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="24" width="36" height="30" rx="2" stroke="#b8b6b0" strokeWidth="3" />
      <path d="M10 24 L32 10 L54 24" stroke="#b8b6b0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="26" y="38" width="12" height="16" stroke="#b8b6b0" strokeWidth="3" />
    </svg>
  )
}

function OrgCard({ slug, name, description, sector, country }: { slug: string; name: string; description: string; sector: string; country: string }) {
  const href = `/network/${slug}`
  return (
    <div className="nw-card">
      <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
        <div className="nw-card-img">
          <OrgIcon />
        </div>
      </Link>
      <div className="nw-card-body">
        <Link href={href} className="nw-card-name">{name}</Link>
        <p className="nw-card-desc">{description}</p>
        <p className="nw-card-subtitle">{sector} · {country}</p>
        <a href={href} className="view-profile-link" style={{ color: NAVY, fontSize: '15.5px', fontWeight: 500 }}>
          View profile
        </a>
      </div>
    </div>
  )
}

export default function NetworkPage() {
  const [lang, toggleLang] = useLang()
  const n = t[lang].network
  const [search, setSearch] = useState('')

  const filtered = useMemo(() =>
    NETWORK_ORGS.filter(o =>
      o.name.toLowerCase().includes(search.toLowerCase())
    ), [search])

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="nw-page-container">

        {/* SECTION 1: Hero */}
        <div className="gi-page-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '150px', alignItems: 'start' }}>
          <h1 className="gi-hero-h1" style={{ color: NAVY, fontSize: '37px', fontFamily: 'var(--font-heading-serif), Georgia, serif', fontWeight: 600, lineHeight: 1.1, margin: 0, textTransform: 'uppercase' }}>
            {n.heading}
          </h1>
          <p className="gi-hero-desc" style={{ color: NAVY, fontSize: '18px', lineHeight: 1.75, margin: 0, alignSelf: 'center' }}>
            {n.description}
          </p>
        </div>
        <hr className="gi-divider" style={{ borderColor: 'rgba(10,17,40,0.12)' }} />

        {/* SECTION 2: Search */}
        <div className="mb-14" style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '56px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', flex: '0 0 auto', maxWidth: '420px', width: '100%' }}>
            <input
              type="text"
              placeholder={n.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="lp-search-input"
              style={{
                flex: 1,
                border: 'none',
                borderBottom: `1.5px solid rgba(10,17,40,0.25)`,
                paddingBottom: '8px',
                fontSize: '16px',
                outline: 'none',
                background: 'transparent',
                color: NAVY,
              }}
            />
            <button
              className="lp-search-btn"
              style={{
                background: NAVY,
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {n.searchButton}
            </button>
          </div>
        </div>

        {/* SECTION 3: Organization cards */}
        {filtered.length === 0 ? (
          <p className="text-center py-20" style={{ color: NAVY, fontSize: '18px' }}>{n.noResults}</p>
        ) : (
          <div className="nw-grid">
            {filtered.map(org => (
              <OrgCard
                key={org.slug}
                slug={org.slug}
                name={org.name}
                description={localized(org.description, lang)}
                sector={localized(org.sector, lang)}
                country={localized(org.country, lang)}
              />
            ))}
          </div>
        )}

        {/* SECTION 4: CTA */}
        <div className="nw-cta-section">
          <h2 className="nw-cta-heading">{n.cta.text}</h2>
          <p className="nw-cta-subtext">{n.cta.subtext}</p>
          <Link href="/partner" className="form-submit-btn" style={{ textDecoration: 'none', fontWeight: 500, background: '#D4AF37', color: '#0A1128' }}>
            {n.cta.link}
          </Link>
        </div>

      </div>

      <Footer lang={lang} />
    </main>
  )
}
