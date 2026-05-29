'use client'
import { useState } from 'react'
import { Lang, t } from '@/lib/translations'

interface NavProps {
  lang: Lang
  onToggleLang: () => void
}

export default function Nav({ lang, onToggleLang }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const n = t[lang].nav

  return (
    <nav style={{ background: '#0A1128', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <div>
          <div style={{ color: '#D4AF37', fontSize: '20px', fontWeight: 500, letterSpacing: '0.1em', fontFamily: 'Georgia, serif' }}>Gwags</div>
          <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '9px', letterSpacing: '0.2em', marginTop: '1px' }}>GLOBAL IMPACT INSTITUTION</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          {[n.about, n.initiatives, n.network, n.getInvolved, n.contact].map((link) => (
            <a key={link} href="#" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.04em' }}>
              {link}
            </a>
          ))}
          <button
            onClick={onToggleLang}
            style={{ background: 'none', border: '0.5px solid rgba(212,175,55,0.6)', color: '#D4AF37', fontSize: '11px', padding: '4px 12px', borderRadius: '3px', cursor: 'pointer', letterSpacing: '0.08em' }}
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: '#D4AF37', fontSize: '24px', cursor: 'pointer' }}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: '#0F1E3D', padding: '16px 28px 24px', borderTop: '0.5px solid rgba(212,175,55,0.15)' }} className="mobile-menu">
          {[n.about, n.initiatives, n.network, n.getInvolved, n.contact].map((link) => (
            <a key={link} href="#" onClick={() => setMenuOpen(false)} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '15px', padding: '12px 0', textDecoration: 'none', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
              {link}
            </a>
          ))}
          <button
            onClick={() => { onToggleLang(); setMenuOpen(false) }}
            style={{ marginTop: '16px', background: 'none', border: '0.5px solid rgba(212,175,55,0.6)', color: '#D4AF37', fontSize: '12px', padding: '6px 16px', borderRadius: '3px', cursor: 'pointer' }}
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}