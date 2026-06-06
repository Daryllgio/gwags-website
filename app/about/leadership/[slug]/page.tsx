'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Lang, t } from '@/lib/translations'

const NAVY = '#0A1128'
const GOLD = '#D4AF37'

/* ── People data ─────────────────────────────────────────────────────────── */

const PEOPLE: Record<string, { name: string; role: string; bio: string }> = {
  'daryll-giovanny-bikak-mbal': {
    name: 'D. Giovanny Bikak Mbal',
    role: 'Chair, Board Member',
    bio: "Founder of Gwags and Chair of the Board, Giovanny leads the institution's governance and strategic direction. He established Gwags in 2021 with a vision to build the institutional infrastructure needed by organizations committed to creating lasting impact.",
  },
  'vianney-tanifor': {
    name: 'Vianney Tanifor',
    role: 'Board Member',
    bio: "Vianney brings expertise in organizational development and community engagement to the Gwags governance board. His experience supports the foundation's mission to build credible, well-structured institutions.",
  },
  'noa-winner': {
    name: 'Noa Winner',
    role: 'Board Member',
    bio: "Noa contributes strategic oversight and partnership expertise to the Gwags governance board, supporting the institution's long-term institutional and operational direction.",
  },
  'placeholder-executive-director': {
    name: '[Name Placeholder]',
    role: 'Executive Director',
    bio: "The Executive Director oversees the day-to-day operations of Gwags, working closely with the governance board to implement the institution's strategic priorities and ensure program delivery.",
  },
  'placeholder-director-programs': {
    name: '[Name Placeholder]',
    role: 'Director of Programs',
    bio: "The Director of Programs leads the design, delivery, and evaluation of Gwags's active portfolio of initiatives across education, health, and community development.",
  },
  'placeholder-director-operations': {
    name: '[Name Placeholder]',
    role: 'Director of Operations',
    bio: 'The Director of Operations manages the internal processes and organizational infrastructure that enable Gwags to operate effectively across its programs and partnerships.',
  },
  'placeholder-director-communications': {
    name: '[Name Placeholder]',
    role: 'Director of Communications & Partnerships',
    bio: "The Director of Communications & Partnerships leads Gwags's external engagement, institutional communications, and the development of strategic partnerships.",
  },
  'placeholder-director-resource': {
    name: '[Name Placeholder]',
    role: 'Director of Resource Mobilization',
    bio: "The Director of Resource Mobilization leads Gwags's efforts to secure funding, build donor relationships, and develop the financial pathways needed to sustain and grow the institution's work.",
  },
  'gloria-alana-asopjio': {
    name: 'Gloria Alana Asopjio',
    role: 'Founding Member',
    bio: "Gloria contributed to the early development of Gwags during its founding years, playing a key role in shaping the institution's initial direction and community programs in Cameroon.",
  },
  'alissa-kenne-mokem': {
    name: 'Alissa Kenne Mokem',
    role: 'Founding Member',
    bio: 'Alissa was part of the founding team that established Gwags in 2021, contributing to the early initiatives that laid the groundwork for the institution\'s growth and formalization.',
  },
}

/* ── Silhouette (same style as leadership cards) ─────────────────────────── */

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
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')

  const person = PEOPLE[params.slug]
  const m = t[lang].moreAbout

  if (!person) {
    return (
      <main style={{ background: '#ffffff' }}>
        <Nav lang={lang} onToggleLang={toggleLang} />
        <div style={{ padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ color: NAVY, fontSize: '20px' }}>Profile not found.</p>
          <Link href="/about/leadership" style={{ color: GOLD, fontSize: '16px', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
            ← Back to Leadership
          </Link>
        </div>
        <Footer lang={lang} />
      </main>
    )
  }

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <style>{`
        /* ── Photo ── */
        .pp-photo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }
        .pp-photo {
          width: 540px;
          height: 420px;
          max-width: 100%;
          background: #e8e8e8;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 1024px) {
          .pp-photo { width: 100%; height: 340px; }
        }
        @media (max-width: 768px) {
          .pp-photo { height: 280px; }
        }

        /* ── Name ── */
        .pp-name {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 3rem;
          font-weight: 700;
          color: ${NAVY};
          margin: 0 0 6px 0;
          line-height: 1.1;
        }
        @media (max-width: 1024px) { .pp-name { font-size: 2.25rem; } }
        @media (max-width: 768px)  { .pp-name { font-size: 1.75rem; } }

        /* ── Role ── */
        .pp-role {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 3rem;
          font-weight: 300;
          color: #555;
          margin: 0 0 32px 0;
          line-height: 1.1;
        }
        @media (max-width: 1024px) { .pp-role { font-size: 2.25rem; } }
        @media (max-width: 768px)  { .pp-role { font-size: 1.75rem; } }

        /* ── Bio ── */
        .pp-bio {
          font-size: 18px;
          color: ${NAVY};
          line-height: 1.85;
          max-width: 672px;
          margin: 0 0 64px 0;
        }
        @media (max-width: 768px) { .pp-bio { font-size: 16px; } }

        /* ── Page container ── */
        .pp-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 64px 60px 0;
        }
        @media (max-width: 1024px) { .pp-container { padding: 56px 40px 0; } }
        @media (max-width: 768px)  { .pp-container { padding: 48px 24px 0; } }

        /* ── More-about container ── */
        .pp-ma-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 56px 60px 80px;
        }
        @media (max-width: 1024px) { .pp-ma-container { padding: 48px 40px 72px; } }
        @media (max-width: 768px)  { .pp-ma-container { padding: 40px 24px 64px; } }

        /* ── More-about heading ── */
        .pp-ma-heading {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 2rem;
          font-weight: 700;
          color: ${NAVY};
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin: 0 0 48px 0;
          line-height: 1.2;
        }
        @media (max-width: 768px) { .pp-ma-heading { font-size: 1.5rem; margin-bottom: 36px; } }

        /* ── More-about grid ── */
        .pp-ma-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        @media (max-width: 900px)  { .pp-ma-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; } }
        @media (max-width: 560px)  { .pp-ma-grid { grid-template-columns: 1fr; gap: 32px; } }

        /* ── "Learn more" hover: gold + left-to-right underline, desktop only ── */
        .pp-learn-more {
          display: inline-block;
          position: relative;
          color: ${NAVY};
          font-size: 15px;
          text-decoration: none;
          letter-spacing: 0.01em;
        }
        .pp-learn-more::after {
          content: '';
          display: block;
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: ${GOLD};
          transition: width 0.3s ease;
        }
        @media (hover: hover) {
          .pp-learn-more:hover { color: ${GOLD}; }
          .pp-learn-more:hover::after { width: 100%; }
        }
      `}</style>

      <Nav lang={lang} onToggleLang={toggleLang} />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="pp-container">

        {/* 1 — Photo
            ──────────────────────────────────────────────────────────────────
            To replace with a real photo, swap the .pp-photo div for:

              <div className="pp-photo" style={{ overflow: 'hidden', position: 'relative', background: 'none' }}>
                <img
                  src="/images/leadership/[slug].jpg"
                  alt="[Person name]"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>

            Or with Next.js Image (preferred):
              <div className="pp-photo" style={{ overflow: 'hidden', position: 'relative', background: 'none' }}>
                <Image
                  src="/images/leadership/[slug].jpg"
                  alt="[Person name]"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
            ──────────────────────────────────────────────────────────────────
        */}
        <div className="pp-photo-wrap">
          <div className="pp-photo">
            <PersonSilhouette size={80} />
          </div>
        </div>

        {/* 2 — Name & Role */}
        <h1 className="pp-name">{person.name}</h1>
        <p  className="pp-role">{person.role}</p>

        {/* 3 — Bio */}
        <p className="pp-bio">{person.bio}</p>

      </div>

      {/* 4 — Full-width divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(10,17,40,0.12)', margin: 0 }} />

      {/* 5 — More about the foundation */}
      <div className="pp-ma-container">

        <h2 className="pp-ma-heading">More about the foundation</h2>

        <div className="pp-ma-grid">
          {m.cards.map((card, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: NAVY,
                  marginBottom: '10px',
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </div>
              <p
                style={{
                  fontSize: '16px',
                  color: '#4A4A4A',
                  lineHeight: 1.7,
                  margin: '0 0 14px',
                }}
              >
                {card.desc}
              </p>
              <Link href={card.href} className="pp-learn-more">
                {card.link} →
              </Link>
            </div>
          ))}
        </div>

      </div>

      <Footer lang={lang} />
    </main>
  )
}
