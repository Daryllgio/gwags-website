import Link from 'next/link'
import { Lang, t } from '@/lib/translations'

interface MoreAboutProps {
  lang: Lang
}

const imagePlaceholders = [
  'Photo: Our Story',
  'Photo: How We Work',
  'Photo: Our Network',
]

export default function MoreAbout({ lang }: MoreAboutProps) {
  const m = t[lang].moreAbout

  return (
    <section style={{ background: '#ffffff', padding: '40px 28px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <h2 className="ma-heading" style={{ color: '#D4AF37', fontSize: '16px', fontWeight: 400, letterSpacing: '0.15em', marginBottom: '48px', fontFamily: 'inherit' }}>
          {m.heading}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }} className="more-about-grid">
          {m.cards.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="more-about-card"
              style={{
                display: 'block',
                textDecoration: 'none',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '0.5px solid rgba(10,17,40,0.08)',
              }}
            >
              {/* To replace with a real image: swap this div for
                  <img src="/images/about/[name].jpg" alt="..." style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                  or use Next.js <Image> with fill and a relative-positioned wrapper */}
              <div className="ma-img-ph" style={{ height: '260px', width: '100%', background: '#F7F6F3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(10,17,40,0.3)', fontSize: '13px', letterSpacing: '0.1em' }}>
                  {imagePlaceholders[i]}
                </span>
              </div>

              <div className="ma-card-body" style={{ padding: '24px 28px 32px' }}>
                <div className="ma-card-title" style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 600, color: '#0A1128', marginBottom: '10px', lineHeight: 1.3 }}>
                  {card.title}
                </div>
                <p className="body-text" style={{ fontSize: '16px', color: '#4A4A4A', lineHeight: 1.7, marginBottom: '16px' }}>
                  {card.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
