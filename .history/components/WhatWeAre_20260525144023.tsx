import { Lang, t } from '@/lib/translations'

interface WhatWeAreProps {
  lang: Lang
}

export default function WhatWeAre({ lang }: WhatWeAreProps) {
  const w = t[lang].whatWeAre

  return (
    <section style={{ background: '#fff', padding: '80px 28px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }} className="whatweare-grid">

        <div>
          <p style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '0.22em', marginBottom: '16px' }}>
            {w.eyebrow}
          </p>
          <h2 style={{ color: '#0A1128', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '20px' }}>
            {w.h2}
          </h2>
          <p style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.82, marginBottom: '16px' }}>{w.p1}</p>
          <p style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.82, marginBottom: '16px' }}>{w.p2}</p>
          <p style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.82, marginBottom: '28px' }}>{w.p3}</p>
          <a href="#" style={{ color: '#D4AF37', fontSize: '17px', textDecoration: 'none', borderBottom: '0.5px solid rgba(212,175,55,0.5)', paddingBottom: '2px', letterSpacing: '0.06em' }}>
            {w.link}
          </a>
        </div>

        <div style={{ paddingTop: '8px' }}>
          {w.pillars.map((pillar, i) => (
            <div
              key={i}
              style={{
                padding: '18px 0',
                borderTop: '0.5px solid rgba(10,17,40,0.09)',
                borderBottom: i === w.pillars.length - 1 ? '0.5px solid rgba(10,17,40,0.09)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div style={{ width: '6px', height: '6px', background: '#D4AF37', borderRadius: '50%', flexShrink: 0 }} />
                <div style={{ fontSize: '18px', fontWeight: 500, color: '#0A1128' }}>{pillar.title}</div>
              </div>
              <p style={{ color: '#5A5A5A', fontSize: '17px', lineHeight: 1.7, paddingLeft: '16px' }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .whatweare-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  )
}
