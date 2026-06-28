'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/useLang'
import { t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DonationOverlay from '@/components/DonationOverlay'

const NAVY = '#0A1128'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

const EYEBROW_STYLE: React.CSSProperties = {
  color: NAVY,
  fontSize: '13px',
  letterSpacing: '0.22em',
  fontWeight: 600,
  marginBottom: '20px',
}

export default function GetInvolvedPage() {
  const [lang, toggleLang] = useLang()
  const [donateOpen, setDonateOpen] = useState(false)
  const p = t[lang].getInvolvedPage

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="gi-page-container">
        {/* SECTION 1: Hero */}
        <div className="gi-page-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '120px', marginBottom: '40px', alignItems: 'start' }}>
          <h1 style={{ color: NAVY, fontSize: '37px', fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 600, lineHeight: 1.1, margin: 0 }}>
            {p.hero.heading}
          </h1>
          <p style={{ color: NAVY, fontSize: '18px', lineHeight: 1.75, margin: 0, alignSelf: 'center' }}>
            {p.hero.desc}
          </p>
        </div>
        <hr style={{ borderColor: 'rgba(10,17,40,0.12)', margin: '0 0 60px 0' }} />

        {/* SECTION 2: Partner + Support */}
        <div className="gi-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '60px' }}>
          <div>
            <p className="eyebrow" style={EYEBROW_STYLE}>{p.partner.eyebrow}</p>
            <p className="body-text" style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: 1.85, marginBottom: '28px' }}>
              {p.partner.text}
            </p>
            <Link href="/partner" className="gi-link gi-cta-link" style={{ color: '#4A4A4A' }}>
              {p.partner.cta}
            </Link>
          </div>

          <div>
            <p className="eyebrow" style={EYEBROW_STYLE}>{p.support.eyebrow}</p>
            <p className="body-text" style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: 1.85, marginBottom: '28px' }}>
              {p.support.text}
            </p>
            <button
              onClick={() => setDonateOpen(true)}
              className="donate-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: NAVY,
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '15px',
                padding: '14px 32px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span className="donate-heart"><HeartIcon /></span>
              {p.support.donate}
            </button>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(10,17,40,0.08)', margin: '0 0 60px 0' }} />

        {/* SECTION 3: Contact + Follow */}
        <div className="gi-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <div>
            <p className="eyebrow" style={EYEBROW_STYLE}>{p.contact.eyebrow}</p>
            <p className="body-text" style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: 1.85, marginBottom: '28px' }}>
              {p.contact.text}
            </p>
            <Link href="/contact" className="gi-link gi-cta-link" style={{ color: '#4A4A4A' }}>
              {p.contact.cta}
            </Link>
          </div>

          <div>
            <p className="eyebrow" style={EYEBROW_STYLE}>{p.follow.eyebrow}</p>
            <p className="body-text" style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: 1.85, marginBottom: '28px' }}>
              {p.follow.text}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://www.instagram.com/gwags_foundation/" target="_blank" rel="noopener noreferrer" className="gi-social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/company/gwags-foundation/" target="_blank" rel="noopener noreferrer" className="gi-social-link" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer lang={lang} />

      {donateOpen && <DonationOverlay lang={lang} onClose={() => setDonateOpen(false)} />}
    </main>
  )
}
