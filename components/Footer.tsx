import Link from 'next/link'
import { Lang, t } from '@/lib/translations'

interface FooterProps {
  lang: Lang
}

export default function Footer({ lang }: FooterProps) {
  const f = t[lang].footer

  return (
    <footer style={{ background: '#030B1A', padding: '56px 28px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', marginBottom: '48px' }} className="footer-grid">

          <div>
            <div style={{ color: '#D4AF37', fontSize: '20px', fontFamily: 'Georgia, serif', letterSpacing: '0.1em', marginBottom: '10px' }}>
              Gwags
            </div>
            <p className="footer-tagline" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '17px', lineHeight: 1.82, maxWidth: '320px', marginBottom: '0' }}>
              {f.tagline}
            </p>
          </div>

          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '0.2em', marginBottom: '18px' }}>
              {f.col1.heading}
            </h4>
            {f.col1.links.map((link) => (
              <Link key={link.label} href={link.href} className="footer-link" style={{ display: 'block', color: 'rgba(255,255,255,0.92)', fontSize: '17px', marginBottom: '12px', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '0.2em', marginBottom: '18px' }}>
              {f.col2.heading}
            </h4>
            {f.col2.links.map((link) => (
              <Link key={link.label} href={link.href} className="footer-link" style={{ display: 'block', color: 'rgba(255,255,255,0.92)', fontSize: '17px', marginBottom: '12px', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
          </div>

        </div>

        <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <span className="footer-copy" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>
            {f.copy}
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* TODO: Create this page */}
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', textDecoration: 'none' }}>{f.privacy}</Link>
            {/* TODO: Create this page */}
            <Link href="/terms" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', textDecoration: 'none' }}>{f.terms}</Link>
          </div>
        </div>

      </div>

    </footer>
  )
}
