import { Lang, t } from '@/lib/translations'

interface CTAProps {
  lang: Lang
}

export default function CTA({ lang }: CTAProps) {
  const c = t[lang].cta

  return (
    <section className="cta-section" style={{ background: '#0F1E3D', padding: '96px 28px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="cta-h2" style={{ color: '#fff', fontSize: '36px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '20px' }}>
          {c.h2}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '18px', lineHeight: 1.78, marginBottom: '40px' }}>
          {c.body}
        </p>
        <div className="cta-buttons" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{ background: '#D4AF37', color: '#0A1128', fontSize: '14px', fontWeight: 500, padding: '14px 32px', border: 'none', borderRadius: '3px', cursor: 'pointer', letterSpacing: '0.06em' }}>
            {c.btn1}
          </button>
          <button style={{ background: 'none', color: 'rgba(255,255,255,0.92)', fontSize: '14px', padding: '14px 32px', border: '0.5px solid rgba(255,255,255,0.3)', borderRadius: '3px', cursor: 'pointer' }}>
            {c.btn2}
          </button>
        </div>
      </div>
    </section>
  )
}
