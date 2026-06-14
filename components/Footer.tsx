import Link from 'next/link'
import { Lang, t } from '@/lib/translations'

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

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
            {/* LOGO: Replace this div with <Image src="/images/gwags-logo.svg" alt="Gwags" /> when your logo file is ready */}
            <div className="footer-logo-ph" style={{ width: '120px', height: '36px', background: 'rgba(212,175,55,0.1)', border: '1px dashed rgba(212,175,55,0.4)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <span style={{ color: 'rgba(212,175,55,0.5)', fontSize: '10px', letterSpacing: '0.15em' }}>LOGO</span>
            </div>
            <p className="footer-tagline" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '18px', lineHeight: 1.82, maxWidth: '320px', marginBottom: '0' }}>
              {f.tagline}
            </p>
            <div className="footer-social-row">
              <a href="https://www.instagram.com/gwags_foundation/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/company/gwags-foundation/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-heading" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '15px', fontWeight: 600, letterSpacing: '0.2em', marginBottom: '18px' }}>
              {f.col1.heading}
            </h4>
            {f.col1.links.map((link) => (
              <Link key={link.label} href={link.href} className="footer-link" style={{ display: 'block', color: 'rgba(255,255,255,0.92)', fontSize: '16px', marginBottom: '12px', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="footer-col-heading" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '15px', fontWeight: 600, letterSpacing: '0.2em', marginBottom: '18px' }}>
              {f.col2.heading}
            </h4>
            {f.col2.links.map((link) => (
              <Link key={link.label} href={link.href} className="footer-link" style={{ display: 'block', color: 'rgba(255,255,255,0.92)', fontSize: '16px', marginBottom: '12px', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
          </div>

        </div>

        <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <span className="footer-copy" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
            {f.copy}
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* TODO: Create this page */}
            <Link href="/privacy" className="footer-privacy-terms" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', textDecoration: 'none' }}>{f.privacy}</Link>
            {/* TODO: Create this page */}
            <Link href="/terms" className="footer-privacy-terms" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', textDecoration: 'none' }}>{f.terms}</Link>
          </div>
        </div>

      </div>

    </footer>
  )
}
