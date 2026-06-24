'use client'
import { useState } from 'react'
import { Lang, t } from '@/lib/translations'

interface WhyGwagsProps {
  lang: Lang
}

export default function WhyGwags({ lang }: WhyGwagsProps) {
  const w = t[lang].whyGwags
  const [idx, setIdx] = useState(0)

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '0.5px solid rgba(10,17,40,0.1)',
    borderTop: '2px solid #D4AF37',
    borderRadius: '0 0 6px 6px',
    padding: '32px 24px 28px',
    textAlign: 'center',
  }

  return (
    <section className="site-section" style={{ background: '#F7F6F3', padding: '80px 28px' }}>
      <div style={{ maxWidth: '1170px', margin: '0 auto' }}>
        <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', marginBottom: '14px' }}>
          {w.eyebrow}
        </p>
        <h2 style={{ color: '#0A1128', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '14px', maxWidth: '520px' }}>
          {w.h2}
        </h2>
        <p className="body-text whygwags-body" style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.8, maxWidth: '560px', marginBottom: '52px' }}>
          {w.body}
        </p>

        {/* Grid — tablet and desktop */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="whygwags-grid">
          {w.items.map((item, i) => (
            <div key={i} className="wg-card" style={cardStyle}>
              <div className="wg-card-title" style={{ fontSize: '18px', fontWeight: 500, color: '#0A1128', marginBottom: '10px' }}>
                {item.title}
              </div>
              <p className="body-text wg-card-desc" style={{ fontSize: '17px', color: '#5A5A5A', lineHeight: 1.68, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel — mobile only */}
        <div className="whygwags-carousel" style={{ display: 'none', flexDirection: 'column', gap: '12px' }}>
          {/* Arrow row — full width, arrows at left and right */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setIdx(i => Math.max(0, i - 1))}
              disabled={idx === 0}
              aria-label="Previous"
              style={{
                width: '36px',
                height: '36px',
                background: '#D4AF37',
                border: 'none',
                borderRadius: '4px',
                cursor: idx === 0 ? 'default' : 'pointer',
                opacity: idx === 0 ? 0.3 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <line x1="17" y1="7" x2="6" y2="7" stroke="#0A1128" strokeWidth="1.5" strokeLinecap="round"/>
                <polyline points="10,2 4,7 10,12" stroke="#0A1128" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </button>

            <button
              onClick={() => setIdx(i => Math.min(w.items.length - 1, i + 1))}
              disabled={idx === w.items.length - 1}
              aria-label="Next"
              style={{
                width: '36px',
                height: '36px',
                background: '#D4AF37',
                border: 'none',
                borderRadius: '4px',
                cursor: idx === w.items.length - 1 ? 'default' : 'pointer',
                opacity: idx === w.items.length - 1 ? 0.3 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <line x1="1" y1="7" x2="12" y2="7" stroke="#0A1128" strokeWidth="1.5" strokeLinecap="round"/>
                <polyline points="8,2 14,7 8,12" stroke="#0A1128" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Card — full width below arrows */}
          <div className="wg-card" style={cardStyle}>
            <div className="wg-card-title" style={{ fontSize: '18px', fontWeight: 500, color: '#0A1128', marginBottom: '10px' }}>
              {w.items[idx].title}
            </div>
            <p className="body-text wg-card-desc" style={{ fontSize: '17px', color: '#5A5A5A', lineHeight: 1.68, margin: 0 }}>
              {w.items[idx].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
