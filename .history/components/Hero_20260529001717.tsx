'use client'
import { Lang, t } from '@/lib/translations'

interface HeroProps {
  lang: Lang
}

export default function Hero({ lang }: HeroProps) {
  const h = t[lang].hero

  return (
    <section style={{ background: '#0A1128', padding: '88px 28px 96px', position: 'relative', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>

      <div className="hero-circle" style={{ position: 'absolute', right: '-100px', top: '-100px', width: '600px', height: '600px', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '50%' }} />
      <div className="hero-circle" style={{ position: 'absolute', right: '-25px', top: '-25px', width: '450px', height: '450px', border: '1px solid rgba(212,175,55,0.20)', borderRadius: '50%' }} />
      <div className="hero-circle" style={{ position: 'absolute', right: '60px', top: '60px', width: '280px', height: '280px', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '50%' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p className="hero-eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.25em', marginBottom: '24px' }}>
          {h.eyebrow}
        </p>

        <h1 className="hero-h1" style={{ color: '#fff', fontSize: '42px', fontWeight: 400, lineHeight: 1.18, maxWidth: '580px', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>
          {h.h1Line1}<br />
          {h.h1Line2} <em style={{ color: '#D4AF37', fontStyle: 'normal' }}>{h.h1Highlight}</em><br />
          {h.h1Line3}
        </h1>

        <p className="hero-body" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '20px', lineHeight: 1.78, maxWidth: '500px', marginBottom: '44px' }}>
          {h.body}
        </p>

        <div className="hero-buttons" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button style={{ background: '#D4AF37', color: '#0A1128', fontSize: '14px', fontWeight: 500, padding: '14px 32px', border: 'none', borderRadius: '3px', cursor: 'pointer', letterSpacing: '0.06em' }}>
            {h.btn1}
          </button>
          <button style={{ background: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '14px', padding: '14px 32px', border: '0.5px solid rgba(255,255,255,0.3)', borderRadius: '3px', cursor: 'pointer' }}>
            {h.btn2}
          </button>
        </div>
      </div>

    </section>
  )
}
