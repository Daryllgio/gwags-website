import { Lang, t } from '@/lib/translations'

interface WhyGwagsProps {
  lang: Lang
}

export default function WhyGwags({ lang }: WhyGwagsProps) {
  const w = t[lang].whyGwags

  return (
    <section className="site-section" style={{ background: '#F7F6F3', padding: '80px 28px' }}>
      <div style={{ maxWidth: '1170px', margin: '0 auto' }}>
        <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', marginBottom: '14px' }}>
          {w.eyebrow}
        </p>
        <h2 style={{ color: '#0A1128', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '14px', maxWidth: '520px' }}>
          {w.h2}
        </h2>
        <p className="body-text" style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.8, maxWidth: '560px', marginBottom: '52px' }}>
          {w.body}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="whygwags-grid">
          {w.items.map((item, i) => (
              <div
                key={i}
                className="wg-card"
                style={{
                  background: '#fff',
                  border: '0.5px solid rgba(10,17,40,0.1)',
                  borderTop: '2px solid #D4AF37',
                  borderRadius: '0 0 6px 6px',
                  padding: '32px 24px 28px',
                  textAlign: 'center',
                }}
              >
                <div className="wg-card-title" style={{ fontSize: '18px', fontWeight: 500, color: '#0A1128', marginBottom: '10px' }}>
                  {item.title}
                </div>
                <p className="body-text wg-card-desc" style={{ fontSize: '17px', color: '#5A5A5A', lineHeight: 1.68 }}>
                  {item.desc}
                </p>
              </div>
            ))}
        </div>
      </div>

    </section>
  )
}
