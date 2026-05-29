import { Lang, t } from '@/lib/translations'
import { IconSchool, IconSeedling, IconMedicalCross, IconHeart } from '@tabler/icons-react'

interface InitiativesProps {
  lang: Lang
}

const icons = [IconSchool, IconSeedling, IconMedicalCross, IconHeart]

export default function Initiatives({ lang }: InitiativesProps) {
  const ini = t[lang].initiatives

  return (
    <section style={{ background: '#050F22', padding: '80px 28px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ color: '#D4AF37', fontSize: '13px', letterSpacing: '0.22em', marginBottom: '14px' }}>
          {ini.eyebrow}
        </p>
        <h2 style={{ color: '#fff', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '14px', maxWidth: '440px' }}>
          {ini.h2}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '20px', lineHeight: 1.75, maxWidth: '500px', marginBottom: '52px' }}>
          {ini.body}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="initiatives-grid">
          {ini.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className="initiative-card"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '0.5px solid rgba(212,175,55,0.18)',
                  borderRadius: '6px',
                  padding: '32px 24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <Icon size={24} color="#D4AF37" />
                </div>
                <div style={{ color: '#fff', fontSize: '18px', fontWeight: 500, marginBottom: '12px', lineHeight: 1.35 }}>
                  {item.title}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', lineHeight: 1.68, flex: 1 }}>
                  {item.desc}
                </p>
                <div style={{ marginTop: '22px', color: '#D4AF37', fontSize: '11px', letterSpacing: '0.1em', borderBottom: '0.5px solid rgba(212,175,55,0.38)', paddingBottom: '2px', alignSelf: 'flex-start' }}>
                  {item.tag}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .initiative-card {
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .initiative-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212,175,55,0.55) !important;
        }
        @media (max-width: 900px) {
          .initiatives-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .initiatives-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
