'use client'
import { useLang } from '@/lib/useLang'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { t } from '@/lib/translations'
import { PEOPLE } from '@/lib/leadershipPeople'

const NAVY = '#0A1128'
const GOLD = '#D4AF37'

/* ── Silhouette ──────────────────────────────────────────────────────────── */

function PersonSilhouette({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="22" r="12" fill="#c8c8c8" />
      <path d="M8 56c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="#c8c8c8" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ProfilePage({ params }: { params: { slug: string } }) {
  const [lang, toggleLang] = useLang()

  const person = PEOPLE[params.slug]
  const m = t[lang].moreAbout

  if (!person) {
    return (
      <main style={{ background: '#ffffff' }}>
        <Nav lang={lang} onToggleLang={toggleLang} />
        <div style={{ padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ color: NAVY, fontSize: '20px' }}>{t[lang].common.profileNotFound}</p>
          <Link href="/about/leadership" style={{ color: GOLD, fontSize: '16px', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
            ← {lang === 'fr' ? 'Retour à la Gouvernance' : 'Back to Leadership'}
          </Link>
        </div>
        <Footer lang={lang} />
      </main>
    )
  }

  return (
    <main
      style={{
        background: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="pp-page-wrap">

        {/* ── Photo · Name · Role · Connect · Bio ── */}
        <div className="pp-img-col">

          <div className="pp-photo" style={{ position: 'relative', overflow: 'hidden' }}>
            {person.image ? (
              <Image src={person.image} alt={person.name} fill style={{ objectFit: 'cover', objectPosition: person.imagePosition ?? 'top' }} />
            ) : (
              <PersonSilhouette size={80} />
            )}
          </div>

          <div className="pp-header-block">
            <div>
              <h1 className="pp-name">{person.name}</h1>
              <p  className="pp-role">{lang === 'fr' && person.roleFr ? person.roleFr : person.role}</p>
            </div>
            {person.linkedin && (
              <div className="pp-connect">
                <span className="pp-connect-label">{lang === 'fr' ? 'Suivre' : 'Connect'}</span>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-connect-circle"
                >
                  <span className="pp-connect-in">in</span>
                </a>
              </div>
            )}
          </div>

          {(() => {
            const content = lang === 'fr' && person.bioFr ? person.bioFr : person.bio
            const paragraphs = Array.isArray(content) ? content : [content]
            return paragraphs.map((para, i) => (
              <p key={i} className="pp-bio" style={i < paragraphs.length - 1 ? { marginBottom: '20px' } : undefined}>{para}</p>
            ))
          })()}

        </div>

        {/* ── Divider ── */}
        <hr className="pp-divider" />

        {/* ── More About ── */}
        <div className="pp-foundation-col">

          <h2 className="pp-ma-heading">{lang === 'fr' ? "Plus sur l'Institution" : 'More About the Institution'}</h2>

          <div className="pp-ma-grid">
            {m.cards.map((card, i) => (
              <div key={i}>
                <div className="pp-card-title">
                  {card.title}
                </div>
                <p className="pp-card-desc">
                  {card.desc}
                </p>
                <Link href={card.href} className="pp-learn-more">
                  {card.link}
                </Link>
              </div>
            ))}
          </div>

        </div>

      </div>

      <Footer lang={lang} />
    </main>
  )
}
