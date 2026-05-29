import { Lang, t } from '@/lib/translations'
import { IconCertificate, IconNetwork, IconRocket, IconCoins, IconEye, IconShield } from '@tabler/icons-react'

interface WhyGwagsProps {
  lang: Lang
}

const icons = [IconCertificate, IconNetwork, IconRocket, IconCoins, IconEye, IconShield]

export default function WhyGwags({ lang }: WhyGwagsProps) {
  const w = t[lang].whyGwags

  return (
    <section style={{ background: '#F7F6F3', padding: '80px 28px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ color: '#D4AF37', fontSize: '13px', letterSpacing: '0.22em', marginBottom: '14px' }}>
          {w.eyebrow}
        </p>
        <h2 style={{ color: '#0A1128', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '14px', maxWidth: '520px' }}>
          {w.h2}
        </h2>
        <p style={{ color: '#4A4A4A', fontSize: '20px', lineHeight: 1.8, maxWidth: '560px', marginBottom: '52px' }}>
          {w.body}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="whygwags-grid">
          {w.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className="whygwags-card"
                style={{
                  background: '#fff',
                  border: '0.5px solid rgba(10,17,40,0.1)',
                  borderTop: '2px solid #D4AF37',
                  borderRadius: '0 0 6px 6px',
                  padding: '32px 24px 28px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  <Icon size={28} color="#D4AF37" />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 500, color: '#0A1128', marginBottom: '10px' }}>
                  {item.title}
                </div>
                <p style={{ fontSize: '17px', color: '#5A5A5A', lineHeight: 1.68 }}>
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .whygwags-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .whygwags-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(212,175,55,0.12);
        }
        @media (max-width: 768px) {
          .whygwags-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
