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
    <section className="more-about-section" style={{ background: '#ffffff', padding: '40px 28px' }}>
      <div style={{ maxWidth: '1169px', margin: '0 auto' }}>

        <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', fontWeight: 400, letterSpacing: '0.15em', marginBottom: '16px', fontFamily: 'inherit' }}>
          {m.heading}
        </p>
        <h2 style={{ color: '#0A1128', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, "Times New Roman", serif', lineHeight: 1.25, marginBottom: '48px' }}>
          {m.h2}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }} className="more-about-grid">
          {m.cards.map((card, i) => (
            <div key={i} className="more-about-card">
              {/* To replace with a real image: swap this div for
                  <img src="/images/about/[name].jpg" alt="..." style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                  or use Next.js <Image> with fill and a relative-positioned wrapper */}
              <div className="ma-img-ph" style={{ height: '220px', width: '100%', background: '#F7F6F3', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                <span style={{ color: 'rgba(10,17,40,0.3)', fontSize: '13px', letterSpacing: '0.1em' }}>
                  {imagePlaceholders[i]}
                </span>
              </div>

              <div className="ma-card-body" style={{ padding: '16px 0 24px 0' }}>
                <div className="ma-card-title" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 600, color: '#0A1128', marginBottom: '10px', lineHeight: 1.3 }}>
                  {card.title}
                </div>
                <p className="body-text ma-card-desc" style={{ fontSize: '17px', color: '#4A4A4A', lineHeight: 1.7 }}>
                  {card.desc}
                </p>
                <Link href={card.href} className="card-learn-more" style={{ color: '#0A1128', marginTop: '12px' }}>
                  {card.link}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
