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
  const [menuVisible, setMenuVisible] = useState(false)
  const [activePanel, setActivePanel] = useState<'main' | 'about' | 'work'>('main')
  const [openDropdown, setOpenDropdown] = useState<'about' | 'work' | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const headerBarRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(64)
  const n = t[lang].nav
  const d = n.dropdowns

  useEffect(() => {
    function measure() {
      if (headerBarRef.current) {
        setHeaderHeight(headerBarRef.current.offsetHeight)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function openMenuFn() {
    setActivePanel('main')
    setMenuVisible(false)
    setMenuOpen(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuVisible(true))
    })
  }

  function closeMenuFn() {
    setMenuVisible(false)
    setTimeout(() => {
      setMenuOpen(false)
      setActivePanel('main')
    }, 300)
  }

  function toggleMenu() {
    if (menuOpen) { closeMenuFn() } else { openMenuFn() }
  }

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

  // Divider — only used after Back button in submenus
  const divider = (
    <div style={{ margin: '0 20px', height: '1px', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
  )

  const backArrow = (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', flexShrink: 0 }}>
      <path d="M15 7 L1 7 M7 1 L1 7 L7 13" />
    </svg>
  )

  const rightChevron = (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M1 1 L7 7 L1 13" />
    </svg>
  )

  return (
    <nav ref={navRef} style={{ background: '#0A1128', position: 'sticky', top: 0, zIndex: 50, width: '100%' }}>

      {/* Main bar */}
      <div ref={headerBarRef} className="nav-bar-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className="nav-logo-text" style={{ color: '#D4AF37', fontSize: '20px', fontWeight: 500, letterSpacing: '0.1em', fontFamily: 'Georgia, serif' }}>Gwags</div>
          <div className="nav-logo-subtitle" style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '0.2em', marginTop: '1px' }}>GLOBAL IMPACT INSTITUTION</div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* Desktop nav links — hidden below 1024px */}
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

            <Link href="/get-involved" className="nav-link">{n.getInvolved}</Link>
          </div>

          {/* Language toggle — always visible */}
          <button
            className="nav-lang-toggle"
            onClick={onToggleLang}
            style={{ background: 'none', border: '1px solid rgba(212,175,55,0.55)', color: '#D4AF37', fontSize: '16px', padding: '4px 12px', borderRadius: '3px', cursor: 'pointer', letterSpacing: '0.08em', marginLeft: '32px' }}
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>

          {/* Hamburger/X — hidden above 1024px */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMenu}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', minHeight: '44px', minWidth: '44px', alignItems: 'center', justifyContent: 'center', padding: '0', flexShrink: 0 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <div style={{ position: 'relative', width: '24px', height: '24px' }}>
              <svg
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"
                style={{ position: 'absolute', top: 0, left: 0, transition: 'opacity 0.25s ease', opacity: menuOpen ? 0 : 1, pointerEvents: 'none' }}
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <svg
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"
                style={{ position: 'absolute', top: 0, left: 0, transition: 'opacity 0.25s ease', opacity: menuOpen ? 1 : 0, pointerEvents: 'none' }}
              >
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </div>
          </button>

        </div>
      </div>

      {/* About dropdown — desktop only */}
      <div className={`nav-dropdown-panel${openDropdown === 'about' ? ' nav-dropdown-open' : ''}`}>
        <div className="nav-dropdown-inner">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 28px 36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.92)', fontSize: '16px', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '12px' }}>
                {d.about.heading}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.7, margin: '0', whiteSpace: 'pre-line' }}>
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

      {/* Our Work dropdown — desktop only */}
      <div className={`nav-dropdown-panel${openDropdown === 'work' ? ' nav-dropdown-open' : ''}`}>
        <div className="nav-dropdown-inner">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 28px 36px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', alignItems: 'start' }}>

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

      {/* Mobile fullscreen overlay — starts at bottom edge of header */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: headerHeight,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 48,
            background: '#0A1128',
            overflow: 'hidden',
            transform: menuVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Two-panel slider: main (left) + submenu (right), each 100vw */}
          <div
            style={{
              display: 'flex',
              width: '200%',
              height: '100%',
              transform: activePanel === 'main' ? 'translateX(0)' : 'translateX(-50%)',
              transition: 'transform 0.3s ease',
            }}
          >

            {/* ── Panel 1: Main menu ── */}
            <div style={{ width: '50%', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

              <button
                onClick={() => setActivePanel('about')}
                className="mob-item"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', color: '#fff', fontWeight: 600, padding: '20px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
              >
                <span>{n.about}</span>
                {rightChevron}
              </button>
              {divider}

              <button
                onClick={() => setActivePanel('work')}
                className="mob-item"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', color: '#fff', fontWeight: 600, padding: '20px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
              >
                <span>{n.initiatives}</span>
                {rightChevron}
              </button>
              {divider}

              <Link
                href="/get-involved"
                onClick={closeMenuFn}
                className="mob-item"
                style={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 600, padding: '20px', textDecoration: 'none' }}
              >
                {n.getInvolved}
              </Link>

            </div>

            {/* ── Panel 2: Submenus ── */}
            <div style={{ width: '50%', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

              {/* ── About us submenu ── */}
              {activePanel === 'about' && (
                <>
                  {/* Back — underlined text, divider below */}
                  <button
                    onClick={() => setActivePanel('main')}
                    className="mob-item"
                    style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', color: '#fff', fontWeight: 400, padding: '20px', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    {backArrow}
                    <span style={{ textDecoration: 'underline' }}>Back</span>
                  </button>
                  {divider}

                  {/* "About us" — main heading, 1px bigger than items */}
                  <div className="mob-heading" style={{ color: '#fff', fontWeight: 800, padding: '20px 20px 0' }}>
                    {d.about.heading}
                  </div>

                  {/* Description — 1px smaller than items */}
                  <p className="mob-desc" style={{ color: '#fff', lineHeight: 1.6, margin: '0', padding: '10px 20px 0', marginBottom: '35px' }}>
                    {d.about.description.replace(/\n/g, ' ')}
                  </p>

                  {/* "About the Gwags GII" — sub-heading, same size as items, bold */}
                  <div className="mob-item" style={{ color: '#fff', fontWeight: 800, padding: '0 20px', marginBottom: '10px' }}>
                    {d.about.subHeading}
                  </div>

                  {/* Links — 400 weight, 15px spacing between */}
                  {d.about.links.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenuFn}
                      className="mob-item"
                      style={{ display: 'block', color: '#fff', fontWeight: 400, padding: '0 20px', marginBottom: '15px', textDecoration: 'none' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}

              {/* ── Our Work submenu ── */}
              {activePanel === 'work' && (
                <>
                  {/* Back — underlined text, divider below */}
                  <button
                    onClick={() => setActivePanel('main')}
                    className="mob-item"
                    style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', color: '#fff', fontWeight: 400, padding: '20px', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    {backArrow}
                    <span style={{ textDecoration: 'underline' }}>Back</span>
                  </button>
                  {divider}

                  {/* "Our Work" — main heading, 1px bigger than items */}
                  <div className="mob-heading" style={{ color: '#fff', fontWeight: 800, padding: '20px 20px 0' }}>
                    {d.work.heading}
                  </div>

                  {/* Description — 1px smaller than items */}
                  <p className="mob-desc" style={{ color: '#fff', lineHeight: 1.6, margin: '0', padding: '10px 20px 0', marginBottom: '35px' }}>
                    {d.work.description}
                  </p>

                  {/* "Our Initiatives" — sub-heading, same size as items, bold */}
                  <div className="mob-item" style={{ color: '#fff', fontWeight: 800, padding: '0 20px', marginBottom: '10px' }}>
                    {d.work.initiativesLabel}
                  </div>

                  {/* Initiative links — 15px spacing between */}
                  {d.work.links.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenuFn}
                      className="mob-item"
                      style={{ display: 'block', color: '#fff', fontWeight: 400, padding: '0 20px', marginBottom: '15px', textDecoration: 'none' }}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* 30px large gap between Initiatives block and Network block (15px last-link margin + 15px spacer) */}
                  <div style={{ height: '20px' }} />

                  {/* "Our Network" — sub-heading, same size as items, bold */}
                  <div className="mob-item" style={{ color: '#fff', fontWeight: 800, padding: '0 20px', marginBottom: '10px' }}>
                    {d.work.networkLabel}
                  </div>

                  {/* Network description — same size as other descriptions */}
                  <p className="mob-desc" style={{ color: '#fff', lineHeight: 1.6, margin: '0', padding: '0 20px', marginBottom: '15px' }}>
                    {d.work.networkDescription}
                  </p>

                  {/* "Learn more" — bold, underlined, mob-desc size, links to /network */}
                  <Link
                    href="/network" // UPDATE: Add network page URL
                    onClick={closeMenuFn}
                    className="mob-desc"
                    style={{ display: 'inline-block', color: '#fff', fontWeight: 600, textDecoration: 'underline', padding: '0 20px', marginBottom: '32px' }}
                  >
                    {d.work.networkCta}
                  </Link>
                </>
              )}

            </div>

          </div>
        </div>
      )}

    </nav>
  )
}
