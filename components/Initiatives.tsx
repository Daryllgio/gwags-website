import { Lang, t } from '@/lib/translations'

interface InitiativesProps {
  lang: Lang
}

const routes = [
  '/initiatives/scholars',
  '/initiatives/mbal-lekeaka-fund',
  '/initiatives/health-outreach',
  '/initiatives/ajong-foretia',
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
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="eyebrow" style={{ color: '#D4AF37', letterSpacing: '0.22em', marginBottom: '14px' }}>
          {ini.eyebrow}
        </p>
        <h2 style={{ color: '#fff', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '14px', maxWidth: '440px' }}>
          {ini.h2}
        </h2>
        <p className="body-text" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '18px', lineHeight: 1.75, maxWidth: '500px', marginBottom: '52px' }}>
          {ini.body}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="initiatives-grid">
          {ini.items.map((item, i) => (
              <div key={i} className="initiative-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <a href={routes[i]} style={{ display: 'block', textDecoration: 'none' }}>
                  <div className="ini-img-ph" style={{ height: '220px', width: '100%', background: '#0F1E3D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: '4px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '0.1em' }}>
                      {imagePlaceholders[i]}
                    </span>
                  </div>
                </a>

                <div className="ini-card-body" style={{ padding: '14px 0 20px 0', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <a href={routes[i]} className="ini-card-title ini-card-title-link" style={{ color: '#fff', fontSize: '18px', fontWeight: 500, marginBottom: '12px', lineHeight: 1.35, display: 'block', textDecoration: 'none' }}>
                    <span className="ini-title-underline">{item.title}</span>
                  </a>
                  <p className="body-text ini-card-desc" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '17px', lineHeight: 1.68, flex: 1 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
