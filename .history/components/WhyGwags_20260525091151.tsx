import { Lang, t } from '@/lib/translations'
const icons = [IconAward, IconWorld, IconRocket, IconCoin, IconEye, IconShield]

interface WhyGwagsProps {
  lang: Lang
}

const icons = [
  <IconCertificate size={28} color="#D4AF37" />,
  <IconNetwork size={28} color="#D4AF37" />,
  <IconRocket size={28} color="#D4AF37" />,
  <IconCoins size={28} color="#D4AF37" />,
  <IconEye size={28} color="#D4AF37" />,
  <IconShieldCheck size={28} color="#D4AF37" />,
]

export default function WhyGwags({ lang }: WhyGwagsProps) {
  const w = t[lang].whyGwags

  return (
    <section style={{ background: '#F7F6F3', padding: '80px 28px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '0.22em', marginBottom: '14px' }}>
          {w.eyebrow}
        </p>
        <h2 style={{ color: '#0A1128', fontSize: '30px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '14px', maxWidth: '520px' }}>
          {w.h2}
        </h2>
        <p style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: 1.8, maxWidth: '560px', marginBottom: '52px' }}>
          {w.body}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {w.items.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                border: '0.5px solid rgba(10,17,40,0.1)',
                borderTop: '2px solid #D4AF37',
                borderRadius: '0 0 6px 6px',
                padding: '32px 24px 28px',
                textAlign: 'center',
              }}
            >
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                {icons[i]}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#0A1128', marginBottom: '10px' }}>
                {item.title}
              </div>
              <p style={{ fontSize: '14px', color: '#5A5A5A', lineHeight: 1.68 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .whygwags-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .whygwags-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}