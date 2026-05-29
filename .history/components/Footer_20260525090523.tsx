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
            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '13px', lineHeight: 1.82, maxWidth: '220px', marginBottom: '12px' }}>
              {f.tagline}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '12px' }}>
              {f.countries}
            </p>
          </div>

          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', letterSpacing: '0.2em', marginBottom: '18px' }}>
              {f.col1.heading}
            </h4>
            {f.col1.links.map((link) => (
              <a key={link} href="#" style={{ display: 'block', color: 'rgba(255,255,255,0.38)', fontSize: '13px', marginBottom: '12px', textDecoration: 'none' }}>
                {link}
              </a>
            ))}
          </div>

          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', letterSpacing: '0.2em', marginBottom: '18px' }}>
              {f.col2.heading}
            </h4>
            {f.col2.links.map((link) => (
              <a key={link} href="#" style={{ display: 'block', color: 'rgba(255,255,255,0.38)', fontSize: '13px', marginBottom: '12px', textDecoration: 'none' }}>
                {link}
              </a>
            ))}
          </div>

        </div>

        <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ color: 'rgba(255,255,255,0.16)', fontSize: '12px' }}>
            {f.copy}
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.16)', fontSize: '12px', textDecoration: 'none' }}>{f.privacy}</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.16)', fontSize: '12px', textDecoration: 'none' }}>{f.terms}</a>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  )
}