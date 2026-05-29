import { Lang, t } from '@/lib/translations'
import { IconSchool, IconSeeding, IconStethoscope, IconHeart } from '@tabler/icons-react'

interface InitiativesProps {
  lang: Lang
}

const icons = [
  <IconSchool size={24} color="#D4AF37" />,
  <IconSeeding size={24} color="#D4AF37" />,
  <IconStethoscope size={24} color="#D4AF37" />,
  <IconHeart size={24} color="#D4AF37" />,
]

export default function Initiatives({ lang }: InitiativesProps) {
  const ini = t[lang].initiatives

  return (
    <section style={{ background: '#050F22', padding: '80px 28px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '0.22em', marginBottom: '14px' }}>
          {ini.eyebrow}
        </p>
        <h2 style={{ color: '#fff', fontSize: '30px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '14px', maxWidth: '440px' }}>
          {ini.h2}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '17px', lineHeight: 1.75, maxWidth: '500px', marginBottom: '52px' }}>
          {ini.body}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: 'rgba(212,175,55,0.1)', gap: '1px' }}>
          {ini.items.map((item, i) => (
            <div
              key={i}
              style={{ background: '#070E20', padding: '32px 24px 28px', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ marginBottom: '16px' }}>{icons[i]}</div>
              <div style={{ color: '#fff', fontSize: '15px', fontWeight: 500, marginBottom: '12px', lineHeight: 1.35 }}>
                {item.title}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '14px', lineHeight: 1.68, flex: 1 }}>
                {item.desc}
              </p>
              <div style={{ marginTop: '22px', color: '#D4AF37', fontSize: '11px', letterSpacing: '0.1em', borderBottom: '0.5px solid rgba(212,175,55,0.38)', paddingBottom: '2px', alignSelf: 'flex-start' }}>
                {item.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .initiatives-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .initiatives-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}