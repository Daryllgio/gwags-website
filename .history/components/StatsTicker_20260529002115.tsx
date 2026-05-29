import { Lang, t } from '@/lib/translations'

interface StatsTickerProps {
  lang: Lang
}

export default function StatsTicker({ lang }: StatsTickerProps) {
  const s = t[lang].stats

  return (
    <div style={{ background: '#0F1E3D', borderTop: '0.5px solid rgba(212,175,55,0.14)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {[
        { n: s.s1n, l: s.s1l },
        { n: s.s2n, l: s.s2l },
        { n: s.s3n, l: s.s3l },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            padding: '24px 28px',
            textAlign: 'center' as const,
            borderRight: i < 2 ? '0.5px solid rgba(212,175,55,0.11)' : 'none',
          }}
        >
          <div style={{ color: '#D4AF37', fontSize: '32px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1 }}>
            {item.n}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', letterSpacing: '0.14em', marginTop: '8px' }}>
            {item.l}
          </div>
        </div>
      ))}
    </div>
  )
}