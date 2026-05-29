import Link from 'next/link'
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
        <p className="body-text" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '18px', lineHeight: 1.78, marginBottom: '40px' }}>
          {c.body}
        </p>
        <div className="cta-buttons" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/get-involved"
            style={{ background: '#D4AF37', color: '#0A1128', fontSize: '14px', fontWeight: 500, padding: '14px 32px', borderRadius: '3px', cursor: 'pointer', letterSpacing: '0.06em', textDecoration: 'none', display: 'inline-block' }}
          >
            {c.btn1}
          </Link>
          <a
            href="/#initiatives"
            style={{ background: 'none', color: 'rgba(255,255,255,0.92)', fontSize: '14px', padding: '14px 32px', border: '0.5px solid rgba(255,255,255,0.3)', borderRadius: '3px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}
          >
            {c.btn2}
          </a>
        </div>
      </div>
    </section>
  )
}
