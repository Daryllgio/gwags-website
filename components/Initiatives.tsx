import { Lang, t } from '@/lib/translations'
import { IconSchool, IconSeedling, IconMedicalCross, IconHeart } from '@tabler/icons-react'

interface InitiativesProps {
  lang: Lang
}

const icons = [IconSchool, IconSeedling, IconMedicalCross, IconHeart]

const routes = [
  '/initiatives/scholars',
  '/initiatives/mbal-lekeaka-fund',
  '/initiatives/health-outreach',
  '/initiatives/youth-development',
]

const imagePlaceholders = [
  'Photo: Scholars Program',
  'Photo: Mbal Lekeaka Fund',
  'Photo: Health Outreach',
  'Photo: Ajong Foretia Orphan Support',
]

export default function Initiatives({ lang }: InitiativesProps) {
  const ini = t[lang].initiatives

  return (
    <section id="initiatives" className="site-section ini-section" style={{ background: '#050F22', padding: '55px 80px' }}>
        <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', marginBottom: '14px' }}>
          {ini.eyebrow}
        </p>
        <h2 style={{ color: '#fff', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '14px', maxWidth: '440px' }}>
          {ini.h2}
        </h2>
        <p className="body-text" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '18px', lineHeight: 1.75, maxWidth: '500px', marginBottom: '52px' }}>
          {ini.body}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="initiatives-grid">
          {ini.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <a
                key={i}
                href={routes[i]}
                className="initiative-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#070E20',
                  border: '0.5px solid rgba(212,175,55,0.18)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                {/* To replace with a real image: swap this div for
                    <img src="/images/initiatives/[name].jpg" alt="..." style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                    or use Next.js <Image> with fill and a relative-positioned wrapper */}
                <div className="ini-img-ph" style={{ height: '250px', width: '100%', background: '#0F1E3D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '0.1em' }}>
                    {imagePlaceholders[i]}
                  </span>
                </div>

                <div className="ini-card-body" style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="ini-card-icon" style={{ marginBottom: '16px' }}>
                    <Icon size={24} color="#D4AF37" />
                  </div>
                  <div className="ini-card-title" style={{ color: '#fff', fontSize: '18px', fontWeight: 500, marginBottom: '12px', lineHeight: 1.35 }}>
                    {item.title}
                  </div>
                  <p className="body-text ini-card-desc" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '17px', lineHeight: 1.68, flex: 1 }}>
                    {item.desc}
                  </p>
                </div>
              </a>
            )
          })}
        </div>

    </section>
  )
}
