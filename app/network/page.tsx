'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/useLang'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { t } from '@/lib/translations'
import { NETWORK_ORGS, localized } from '@/lib/network'

const NAVY = '#0A1128'

function OrgCard({ slug, name, sector, country }: { slug: string; name: string; sector: string; country: string }) {
  const href = `/network/${slug}`
  return (
    <div className="nw-card">
      <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
        <div className="nw-card-img">
          <span style={{ color: 'rgba(10,17,40,0.3)', fontSize: '12px', letterSpacing: '0.12em' }}>Logo</span>
        </div>
      </Link>
      <div className="nw-card-body">
        <Link href={href} className="nw-card-title-link ini-card-title-link" style={{ display: 'block' }}>
          <span className="nw-card-name ini-title-underline" style={{ color: NAVY }}>{name}</span>
        </Link>
        <p className="nw-card-sector">{sector}</p>
        <p className="nw-card-country">{country}</p>
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

      <div className="px-8 py-16 max-w-7xl mx-auto lp-container">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10 lp-header">
          <h1
            className="font-semibold uppercase leading-tight lp-heading"
            style={{ color: NAVY, fontSize: '37px', fontFamily: 'inherit' }}
          >
            {n.heading}
          </h1>
          <p className="leading-relaxed self-center lp-subtitle" style={{ color: NAVY, fontSize: '18px' }}>
            {n.description}
          </p>
        </div>
        <hr style={{ borderColor: 'rgba(10,17,40,0.12)', marginBottom: '40px' }} />

        {/* Search */}
        <div className="mb-14" style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
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

        {/* Organization cards */}
        {filtered.length === 0 ? (
          <p className="text-center py-20" style={{ color: NAVY, fontSize: '18px' }}>{n.noResults}</p>
        ) : (
          <div className="nw-grid">
            {filtered.map(org => (
              <OrgCard
                key={org.slug}
                slug={org.slug}
                name={org.name}
                sector={localized(org.sector, lang)}
                country={localized(org.country, lang)}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="nw-cta">
          <span className="nw-cta-text">{n.cta.text}</span>
          <Link href="/partner" className="card-learn-more" style={{ color: NAVY }}>
            {n.cta.link}
          </Link>
        </div>

      </div>

      <Footer lang={lang} />
    </main>
  )
}
