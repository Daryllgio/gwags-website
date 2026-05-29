'use client'
import { Lang, t } from '@/lib/translations'

interface HeroProps {
  lang: Lang
}

export default function Hero({ lang }: HeroProps) {
  const h = t[lang].hero

  return (
    <section style={{ background: '#0A1128', padding: '88px 28px 96px', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', right: '-80px', top: '-80px', width: '500px', height: '500px', border: '1px solid rgba(212,175,55,0.08)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', right: '20px', top: '20px', width: '360px', height: '360px', border: '1px solid rgba(212,175,55,0.06)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', right: '120px', top: '120px', width: '200px', height: '200px', border: '1px solid rgba(212,175,55,0.05)', borderRadius: '50%' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#D4AF37', fontSize: '14px', letterSpacing: '0.25em', marginBottom: '24px' }}>
          {h.eyebrow}
        </p>

        <h1 style={{ color: '#fff', fontSize: '42px', fontWeight: 400, lineHeight: 1.18, maxWidth: '580px', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>
          {h.h1Line1}<br />
          {h.h1Line2} <em style={{ color: '#D4AF37', fontStyle: 'normal' }}>{h.h1Highlight}</em><br />
          {h.h1Line3}
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '20px', lineHeight: 1.78, maxWidth: '500px', marginBottom: '44px' }}>
          {h.body}
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
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