'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Lang, t } from '@/lib/translations'

interface NavProps {
  lang: Lang
  onToggleLang: () => void
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: 'inline-block',
        marginLeft: '5px',
        flexShrink: 0,
        transition: 'transform 0.3s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        opacity: 0.7,
      }}
    >
      <path d="M1 1 L5 5 L9 1" />
    </svg>
  )
}

export default function Nav({ lang, onToggleLang }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<'about' | 'work' | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<'about' | 'work' | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const n = t[lang].nav
  const d = n.dropdowns

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggleDropdown(name: 'about' | 'work') {
    setOpenDropdown(prev => prev === name ? null : name)
  }

  function toggleMobileSection(name: 'about' | 'work') {
    setMobileExpanded(prev => prev === name ? null : name)
  }

  return (
    <nav ref={navRef} style={{ background: '#0A1128', position: 'sticky', top: 0, zIndex: 50, width: '100%' }}>

      {/* Main bar */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ color: '#D4AF37', fontSize: '20px', fontWeight: 500, letterSpacing: '0.1em', fontFamily: 'Georgia, serif' }}>Gwags</div>
          <div className="nav-logo-subtitle" style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '0.2em', marginTop: '1px' }}>GLOBAL IMPACT INSTITUTION</div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          <button
            className="nav-btn-dropdown"
            onClick={() => toggleDropdown('about')}
            aria-expanded={openDropdown === 'about'}
          >
            {n.about}
            <Chevron open={openDropdown === 'about'} />
          </button>

          <button
            className="nav-btn-dropdown"
            onClick={() => toggleDropdown('work')}
            aria-expanded={openDropdown === 'work'}
          >
            {n.initiatives}
            <Chevron open={openDropdown === 'work'} />
          </button>

          <Link href="/network" className="nav-link">{n.network}</Link>
          <Link href="/get-involved" className="nav-link">{n.getInvolved}</Link>

          <button
            onClick={onToggleLang}
            style={{ background: 'none', border: '0.5px solid rgba(212,175,55,0.6)', color: '#D4AF37', fontSize: '11px', padding: '4px 12px', borderRadius: '3px', cursor: 'pointer', letterSpacing: '0.08em' }}
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => { setMenuOpen(!menuOpen); setMobileExpanded(null) }}
          style={{ display: 'none', background: 'none', border: 'none', color: '#D4AF37', fontSize: '24px', cursor: 'pointer', minHeight: '44px', minWidth: '44px' }}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* About dropdown */}
      <div className={`nav-dropdown-panel${openDropdown === 'about' ? ' nav-dropdown-open' : ''}`}>
        <div className="nav-dropdown-inner">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 28px 36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.92)', fontSize: '16px', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '12px' }}>
                {d.about.heading}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.7, margin: '0', maxWidth: '340px' }}>
                {d.about.description}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
              {d.about.links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-dropdown-link"
                  onClick={() => setOpenDropdown(null)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Work dropdown — three columns */}
      <div className={`nav-dropdown-panel${openDropdown === 'work' ? ' nav-dropdown-open' : ''}`}>
        <div className="nav-dropdown-inner">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 28px 36px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', alignItems: 'start' }}>

            {/* Left: heading, description, CTA */}
            <div>
              <div style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
                {d.work.heading}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                {d.work.description}
              </p>
              <Link href="/our-work" className="nav-dropdown-cta" onClick={() => setOpenDropdown(null)}>
                {d.work.cta} →
              </Link>
            </div>

            {/* Middle: Our Initiatives links */}
            <div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '16px' }}>
                {d.work.initiativesLabel}
              </div>
              {d.work.links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-dropdown-link"
                  onClick={() => setOpenDropdown(null)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: Our Network */}
            <div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '16px' }}>
                {d.work.networkLabel}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                {d.work.networkDescription}
              </p>
              <Link href="/network" className="nav-dropdown-cta" onClick={() => setOpenDropdown(null)}>
                {d.work.networkCta} →
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#0F1E3D', padding: '8px 28px 24px', borderTop: '0.5px solid rgba(212,175,55,0.15)' }}>

          {/* About section — collapsible */}
          <button
            onClick={() => toggleMobileSection('about')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '0.18em', padding: '14px 0 8px', cursor: 'pointer', textTransform: 'uppercase' as const }}
          >
            {d.about.heading}
            <Chevron open={mobileExpanded === 'about'} />
          </button>
          {mobileExpanded === 'about' && (
            <div>
              {d.about.links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ display: 'block', color: 'rgba(255,255,255,0.92)', fontSize: '16px', padding: '10px 0 10px 12px', textDecoration: 'none', borderBottom: '0.5px solid rgba(255,255,255,0.04)', minHeight: '44px', alignItems: 'center' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Our Work section — collapsible */}
          <button
            onClick={() => toggleMobileSection('work')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '0.18em', padding: '14px 0 8px', cursor: 'pointer', textTransform: 'uppercase' as const }}
          >
            {d.work.heading}
            <Chevron open={mobileExpanded === 'work'} />
          </button>
          {mobileExpanded === 'work' && (
            <div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', letterSpacing: '0.15em', padding: '8px 0 4px 12px' }}>
                {d.work.initiativesLabel}
              </div>
              {d.work.links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ display: 'block', color: 'rgba(255,255,255,0.92)', fontSize: '16px', padding: '10px 0 10px 12px', textDecoration: 'none', borderBottom: '0.5px solid rgba(255,255,255,0.04)', minHeight: '44px', alignItems: 'center' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.1)', margin: '12px 0' }} />

          {[{ label: n.network, href: '/network' }, { label: n.getInvolved, href: '/get-involved' }].map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.92)', fontSize: '15px', padding: '12px 0', textDecoration: 'none', borderBottom: '0.5px solid rgba(255,255,255,0.06)', minHeight: '44px' }}
            >
              {item.label}
            </Link>
          ))}

        </div>
      )}

    </nav>
  )
}
