'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Lang, t } from '@/lib/translations'

const NAVY = '#0A1128'

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
    bio: 'Vianney brings expertise in organizational development and community engagement to the Gwags governance board. His experience supports the foundation\'s mission to build credible, well-structured institutions.',
  },
  'noa-winner': {
    name: 'Noa Winner',
    role: 'Board Member',
    bio: "Noa contributes strategic oversight and partnership expertise to the Gwags governance board, supporting the institution's long-term institutional and operational direction.",
  },
  'placeholder-executive-director': {
    name: '[Name Placeholder]',
    role: 'Executive Director',
    bio: 'The Executive Director oversees the day-to-day operations of Gwags, working closely with the governance board to implement the institution\'s strategic priorities and ensure program delivery.',
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
    bio: 'Gloria contributed to the early development of Gwags during its founding years, playing a key role in shaping the institution\'s initial direction and community programs in Cameroon.',
  },
  'alissa-kenne-mokem': {
    name: 'Alissa Kenne Mokem',
    role: 'Founding Member',
    bio: 'Alissa was part of the founding team that established Gwags in 2021, contributing to the early initiatives that laid the groundwork for the institution\'s growth and formalization.',
  },
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function PersonSilhouette() {
  return (
    <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="22" r="12" fill="rgba(255,255,255,0.12)" />
      <path d="M8 56c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="rgba(255,255,255,0.12)" strokeWidth="4" strokeLinecap="round" />
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
          <Link href="/about/leadership" style={{ color: '#D4AF37', fontSize: '16px', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
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
        /* Profile hero heights */
        .profile-hero { height: 380px; }
        @media (max-width: 1024px) { .profile-hero { height: 280px; } }
        @media (max-width: 768px)  { .profile-hero { height: 220px; } }

        /* Name and role sizes */
        .profile-name { font-size: 52px; }
        @media (max-width: 1024px) { .profile-name { font-size: 36px !important; } }
        @media (max-width: 768px)  { .profile-name { font-size: 28px !important; } }

        .profile-role { font-size: 28px; }
        @media (max-width: 1024px) { .profile-role { font-size: 22px !important; } }
        @media (max-width: 768px)  { .profile-role { font-size: 18px !important; } }

        /* Bio size */
        .profile-bio { font-size: 18px; }
        @media (max-width: 768px) { .profile-bio { font-size: 16px !important; } }

        /* Content wrapper left padding */
        .profile-content { padding-left: 80px; padding-right: 40px; }
        @media (max-width: 1024px) { .profile-content { padding-left: 48px; padding-right: 28px; } }
        @media (max-width: 768px)  { .profile-content { padding-left: 24px; padding-right: 24px; } }

        /* Bio negative margin — desktop: -24px, tablet: -12px, phone: 0 */
        .profile-bio { margin-left: -24px; }
        @media (max-width: 1024px) { .profile-bio { margin-left: -12px !important; } }
        @media (max-width: 768px)  { .profile-bio { margin-left: 0 !important; } }

        /* Separator negative margin — desktop: -60px, tablet: -30px, phone: 0 */
        .profile-separator { margin-left: -60px; }
        @media (max-width: 1024px) { .profile-separator { margin-left: -30px !important; } }
        @media (max-width: 768px)  { .profile-separator { margin-left: 0 !important; } }

        /* More about negative margin — desktop: -80px, tablet: -40px, phone: 0 */
        .profile-more-about { margin-left: -80px; }
        @media (max-width: 1024px) { .profile-more-about { margin-left: -40px !important; } }
        @media (max-width: 768px)  { .profile-more-about { margin-left: 0 !important; } }

        /* More About cards grid */
        .profile-ma-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 1024px) { .profile-ma-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .profile-ma-grid { grid-template-columns: 1fr; } }

        /* More About card hover */
        .profile-ma-card { transition: transform 0.25s ease; }
        .profile-ma-card:hover { transform: translateY(-4px); }
        @media (hover: none) { .profile-ma-card:hover { transform: none !important; } }
      `}</style>

      <Nav lang={lang} onToggleLang={toggleLang} />

      {/* Section 1 — Hero image banner
          ─────────────────────────────────────────────────────────────────────
          To replace with a real photo, swap the div below for:

            <div className="profile-hero" style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
              <img
                src="/images/leadership/[slug].jpg"
                alt="[Person name]"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>

          Or with Next.js Image (preferred):
            <div className="profile-hero" style={{ width: '100%', position: 'relative' }}>
              <Image src="/images/leadership/[slug].jpg" alt="[Person name]" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
          ─────────────────────────────────────────────────────────────────────
      */}
      <div
        className="profile-hero"
        style={{
          width: '100%',
          background: '#0F1E3D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PersonSilhouette />
      </div>

      {/* Content wrapper */}
      <div className="profile-content">

        {/* Section 2 — Name and role */}
        <div style={{ marginTop: '32px' }}>
          <h1
            className="profile-name"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 700,
              color: NAVY,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            {person.name}
          </h1>
          <p
            className="profile-role"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 400,
              color: '#4A4A4A',
              margin: '8px 0 0',
            }}
          >
            {person.role}
          </p>
        </div>

        {/* Section 3 — Bio */}
        <p
          className="profile-bio"
          style={{
            color: '#4A4A4A',
            lineHeight: 1.85,
            maxWidth: '700px',
            marginTop: '24px',
          }}
        >
          {person.bio}
        </p>

        {/* Section 4 — Separator */}
        <hr
          className="profile-separator"
          style={{
            border: 'none',
            borderTop: '1px solid rgba(10,17,40,0.12)',
            marginTop: '48px',
            marginRight: 0,
          }}
        />

        {/* Section 5 — More about the institution */}
        <div
          className="profile-more-about"
          style={{
            marginTop: '48px',
            paddingBottom: '80px',
            paddingLeft: '20px',
          }}
        >
          <p
            className="eyebrow"
            style={{
              color: '#D4AF37',
              fontSize: '16px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              marginBottom: '36px',
              fontFamily: 'inherit',
            }}
          >
            {m.heading}
          </p>

          <div className="profile-ma-grid">
            {m.cards.map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className="profile-ma-card"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  border: '0.5px solid rgba(10,17,40,0.08)',
                  padding: '28px 28px 32px',
                  background: '#ffffff',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '20px',
                    fontWeight: 600,
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
                    margin: '0 0 16px',
                  }}
                >
                  {card.desc}
                </p>
                <span style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.02em' }}>
                  {card.link} →
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <Footer lang={lang} />
    </main>
  )
}
