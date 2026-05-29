import { Lang, t } from '@/lib/translations'

interface OurStoryProps {
  lang: Lang
}

export default function OurStory({ lang }: OurStoryProps) {
  const s = t[lang].ourStory

  return (
    <section style={{ background: '#fff', padding: '80px 28px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ maxWidth: '460px', marginBottom: '56px' }}>
          <p style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', marginBottom: '14px' }}>
            {s.eyebrow}
          </p>
          <h2 style={{ color: '#0A1128', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25 }}>
            {s.h2}
          </h2>
        </div>

        <div style={{ position: 'relative' }} className="timeline-wrapper">
          <div style={{ position: 'absolute', top: '14px', left: 0, right: 0, height: '0.5px', background: 'rgba(212,175,55,0.32)' }} className="timeline-bar" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }} className="timeline-grid">
            {s.items.map((item, i) => (
              <div key={i} style={{ paddingTop: '32px', paddingRight: '32px', position: 'relative' }} className="timeline-item">
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#D4AF37', marginBottom: '22px', position: 'relative', zIndex: 1 }} />
                <div style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '7px' }}>
                  {item.era}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 500, color: '#0A1128', marginBottom: '10px' }}>
                  {item.title}
                </div>
                <p style={{ fontSize: '17px', color: '#5A5A5A', lineHeight: 1.68 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-bar { display: none !important; }
          .timeline-grid { grid-template-columns: 1fr !important; }
          .timeline-item {
            padding-left: 28px !important;
            padding-top: 0 !important;
            padding-bottom: 28px !important;
            border-left: 0.5px solid rgba(212,175,55,0.35) !important;
            position: relative !important;
          }
          .timeline-item > div:first-child {
            position: absolute !important;
            left: -5px !important;
            top: 4px !important;
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
