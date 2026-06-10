'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Lang, t } from '@/lib/translations'

const NAVY = '#0A1128'
const GOLD = '#D4AF37'

/* ═══════════════════════════════════════════════════════════════════════════
   LAYOUT CONSTANTS — edit these to adjust spacing without touching layout code
   ═══════════════════════════════════════════════════════════════════════════ */

// Controls how far left the profile content sits from the page edge on desktop.
const PROFILE_IMAGE_LEFT_OFFSET = '320px'

// Controls where the More About section and divider start from the left.
const FOUNDATION_SECTION_LEFT_OFFSET = '200px'

// Controls how wide the bio text column stretches.
const PROFILE_BIO_MAX_WIDTH = '620px'

// Vertical space between the nav bar and the top of the content.
const PAGE_TOP_PADDING = '60px'

// Right-side padding for content columns and More About section.
const PAGE_RIGHT_PADDING = '60px'

/* ═══════════════════════════════════════════════════════════════════════════ */

/* ── People data ─────────────────────────────────────────────────────────── */

const PEOPLE: Record<string, { name: string; role: string; bio: string; linkedin: string }> = {
  'daryll-giovanny-bikak-mbal': {
    name: 'D. Giovanny Bikak Mbal',
    role: 'Chair, Board Member',
    bio: "Founder of Gwags and Chair of the Board, Giovanny leads the institution's governance and strategic direction. He established Gwags in 2021 with a vision to build the institutional infrastructure needed by organizations committed to creating lasting impact.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'vianney-tanifor': {
    name: 'Vianney Tanifor',
    role: 'Board Member',
    bio: "Vianney brings expertise in organizational development and community engagement to the Gwags governance board. His experience supports the foundation's mission to build credible, well-structured institutions.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'noa-winner': {
    name: 'Noa Winner',
    role: 'Board Member',
    bio: "Noa contributes strategic oversight and partnership expertise to the Gwags governance board, supporting the institution's long-term institutional and operational direction.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'placeholder-executive-director': {
    name: '[Name Placeholder]',
    role: 'Executive Director',
    bio: "The Executive Director oversees the day-to-day operations of Gwags, working closely with the governance board to implement the institution's strategic priorities and ensure program delivery.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'placeholder-director-programs': {
    name: '[Name Placeholder]',
    role: 'Director of Programs',
    bio: "The Director of Programs leads the design, delivery, and evaluation of Gwags's active portfolio of initiatives across education, health, and community development.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'placeholder-director-operations': {
    name: '[Name Placeholder]',
    role: 'Director of Operations',
    bio: 'The Director of Operations manages the internal processes and organizational infrastructure that enable Gwags to operate effectively across its programs and partnerships.',
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'placeholder-director-communications': {
    name: '[Name Placeholder]',
    role: 'Director of Communications & Partnerships',
    bio: "The Director of Communications & Partnerships leads Gwags's external engagement, institutional communications, and the development of strategic partnerships.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'placeholder-director-resource': {
    name: '[Name Placeholder]',
    role: 'Director of Resource Mobilization',
    bio: "The Director of Resource Mobilization leads Gwags's efforts to secure funding, build donor relationships, and develop the financial pathways needed to sustain and grow the institution's work.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'gloria-alana-asopjio': {
    name: 'Gloria Alana Asopjio',
    role: 'Founding Member',
    bio: "Gloria contributed to the early development of Gwags during its founding years, playing a key role in shaping the institution's initial direction and community programs in Cameroon.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'alissa-kenne-mokem': {
    name: 'Alissa Kenne Mokem',
    role: 'Founding Member',
    bio: "Alissa was part of the founding team that established Gwags in 2021, contributing to the early initiatives that laid the groundwork for the institution's growth and formalization.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
}

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
    <main
      className="pp-root"
      style={{
        background: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <style>{`
        /* ── Desktop defaults ── */
        .pp-root {
          --img-left:        ${PROFILE_IMAGE_LEFT_OFFSET};
          --foundation-left: ${FOUNDATION_SECTION_LEFT_OFFSET};
          --bio-max-width:   ${PROFILE_BIO_MAX_WIDTH};
          --page-top:        ${PAGE_TOP_PADDING};
          --page-right:      ${PAGE_RIGHT_PADDING};
        }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .pp-root {
            --img-left:        20px;
            --foundation-left: 20px;
            --page-top:        48px;
            --page-right:      40px;
          }
        }

        /* ── Phone ── */
        @media (max-width: 768px) {
          .pp-root {
            --img-left:        20px;
            --foundation-left: 20px;
            --bio-max-width:   calc(100vw - 40px);
            --page-top:        36px;
            --page-right:      20px;
          }
        }

        /* ────────────────────────────────────────────────── */
        /* Content column                                      */
        /* ────────────────────────────────────────────────── */

        .pp-img-col {
          margin-left:   320px;
          padding-top:   60px;
          padding-right: 60px;
          max-width:     680px;
        }
        @media (max-width: 1024px) {
          .pp-img-col {
            margin-left:   170px;
            padding-top:   48px;
            padding-right: 0px;
          }
        }
        @media (max-width: 768px) {
          .pp-img-col {
            margin-left:   20px;
            padding-top:   36px;
            padding-right: 20px;
          }
        }

        /* Photo placeholder
           ─────────────────────────────────────────────────
           To swap in a real photo, replace the .pp-photo div with:

             <div class="pp-photo" style="background:none;overflow:hidden;position:relative;">
               <img src="/images/leadership/[slug].jpg" alt="[name]"
                    style="width:100%;height:100%;object-fit:cover;object-position:top center;" />
             </div>
           ─────────────────────────────────────────────────
        */
        .pp-photo {
          width:           340px;
          height:          420px;
          max-width:       100%;
          background:      #e8e8e8;
          border-radius:   12px;
          display:         flex;
          align-items:     center;
          justify-content: center;
          margin:          0 0 36px 0;
        }
        @media (max-width: 1024px) {
          .pp-photo { width: 400px; height: 320px; }
        }
        @media (max-width: 768px) {
          .pp-photo {
            width:  100%;
            height: 280px;
            margin: 0 0 36px 0;
          }
        }

        /* ────────────────────────────────────────────────── */
        /* Name · Role · Connect block                        */
        /* ────────────────────────────────────────────────── */

        .pp-header-block {
          display:               grid;
          grid-template-columns: 340px auto;
          align-items:           start;
          margin-bottom:         28px;
        }
        @media (max-width: 1024px) {
          .pp-header-block { grid-template-columns: 400px auto; }
        }

        .pp-name {
          font-family: Georgia, "Times New Roman", serif;
          font-size:   37px;
          font-weight: 200;
          color:       ${NAVY};
          margin:      0 0 6px;
          line-height: 1.1;
        }

        .pp-role {
          font-family: Georgia, "Times New Roman", serif;
          font-size:   45px;
          font-weight: 200;
          color:       #555;
          margin:      0;
          line-height: 1.1;
        }

        /* ── LinkedIn Connect ── */
        .pp-connect {
          display:         flex;
          flex-direction:  row;
          gap:             12px;
          align-items:     center;
          text-decoration: none;
          flex-shrink:     0;
        }
        .pp-connect-label {
          color:       ${NAVY};
          font-size:   16px;
          font-weight: 500;
          white-space: nowrap;
          transition:  color 0.2s ease;
        }
        .pp-connect-circle {
          width:           30px;
          height:          30px;
          border-radius:   50%;
          border:          1.5px solid ${NAVY};
          display:         flex;
          align-items:     center;
          justify-content: center;
          color:           ${NAVY};
          flex-shrink:     0;
          transition:      border-color 0.2s ease, color 0.2s ease;
        }
        .pp-connect-in {
          font-size:   16px;
          font-weight: 700;
          line-height: 1;
          user-select: none;
        }
        @media (max-width: 768px) {
          .pp-connect-in { font-size: 15px; }
        }
        @media (max-width: 480px) {
          .pp-connect-in { font-size: 14px; }
        }
        @media (hover: hover) {
          .pp-connect:hover .pp-connect-label  { color: ${GOLD}; }
          .pp-connect:hover .pp-connect-circle { border-color: ${GOLD}; color: ${GOLD}; }
        }

        /* ── iPad: connect stacks vertically but stays right of name/role ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .pp-connect {
            flex-direction: column;
            align-items:    flex-start;
            gap:            8px;
          }
        }

        /* ── Phone: full column stack ── */
        @media (max-width: 768px) {
          .pp-header-block {
            display:        flex;
            flex-direction: column;
            align-items:    flex-start;
            margin-bottom:  0;
          }
          .pp-connect {
            flex-direction: column;
            align-items:    flex-start;
            gap:            8px;
            margin-left:    0;
            margin-top:     16px;
            margin-bottom:  28px;
            padding-top:    0;
          }
        }

        /* ────────────────────────────────────────────────── */
        /* Bio                                                 */
        /* ────────────────────────────────────────────────── */

        .pp-bio {
          font-size:   18px;
          color:       ${NAVY};
          line-height: 1.85;
          max-width:   500px;
          margin:      0 0 48px;
        }
        @media (max-width: 768px) {
          .pp-bio { max-width: calc(100vw - 40px); }
        }

        .pp-card-title {
          font-size:    19px;
          font-weight:  600;
          font-family:  Georgia, "Times New Roman", serif;
          color:        ${NAVY};
          margin-bottom: 10px;
          line-height:  1.3;
        }

        .pp-card-desc {
          font-size:   17px;
          color:       #4A4A4A;
          line-height: 1.7;
          margin:      0 0 14px;
        }

        .pp-learn-more {
          display:         inline-block;
          position:        relative;
          color:           ${NAVY};
          font-size:       17px;
          text-decoration: none;
        }
        .pp-learn-more::after {
          content:    '';
          position:   absolute;
          bottom:     -2px;
          left:       0;
          width:      0;
          height:     1.5px;
          background: ${GOLD};
          transition: width 0.3s ease;
        }
        @media (hover: hover) {
          .pp-learn-more:hover        { color: ${GOLD}; }
          .pp-learn-more:hover::after { width: 100%; }
        }

        @media (max-width: 1024px) {
          .pp-name { font-size: 30px !important; }
          .pp-role { font-size: 30px; }
          .pp-bio  { font-size: 17px; }
        }
        @media (max-width: 768px) {
          .pp-name       { font-size: 28px !important; }
          .pp-role       { font-size: 28px; }
          .pp-bio        { font-size: 16px; }
          .pp-card-title { font-size: 18px; }
          .pp-card-desc  { font-size: 16px; }
          .pp-learn-more { font-size: 16px; }
        }
        @media (max-width: 480px) {
          .pp-name       { font-size: 26px !important; }
          .pp-role       { font-size: 26px; }
          .pp-bio        { font-size: 15px; }
          .pp-card-title { font-size: 17px; }
          .pp-card-desc  { font-size: 15px; }
          .pp-learn-more { font-size: 15px; }
        }

        /* ────────────────────────────────────────────────── */
        /* Divider                                            */
        /* ────────────────────────────────────────────────── */

        .pp-divider {
          border:        none;
          border-top:    2px solid rgba(10,17,40,0.12);
          margin-left:   200px;
          margin-right:  60px;
          margin-top:    0;
          margin-bottom: 0;
        }
        @media (max-width: 1024px) {
          .pp-divider { margin-left: 20px; margin-right: 40px; }
        }
        @media (max-width: 768px) {
          .pp-divider { margin-left: 20px; margin-right: 20px; }
        }

        /* ────────────────────────────────────────────────── */
        /* More About the Foundation                          */
        /* ────────────────────────────────────────────────── */

        .pp-foundation-col {
          margin-left:    200px;
          padding-top:    56px;
          padding-bottom: 80px;
          padding-right:  60px;
        }
        @media (max-width: 1024px) {
          .pp-foundation-col {
            margin-left:   20px;
            padding-right: 40px;
          }
        }
        @media (max-width: 768px) {
          .pp-foundation-col {
            margin-left:    20px;
            padding-top:    40px;
            padding-bottom: 64px;
            padding-right:  20px;
          }
        }

        .pp-ma-heading {
          font-family:    Georgia, "Times New Roman", serif;
          font-size:      45px !important;
          font-weight:    200;
          color:          ${NAVY};
          letter-spacing: 0.03em;
          margin:         0 0 48px;
          line-height:    1.2;
        }
        @media (max-width: 1024px) {
          .pp-ma-heading { font-size: 33px !important; }
        }
        @media (max-width: 768px) {
          .pp-ma-heading { font-size: 28px !important; margin-bottom: 32px; }
        }
        @media (max-width: 480px) {
          .pp-ma-heading { font-size: 26px !important; }
        }

        /* 3-column grid */
        .pp-ma-grid {
          display:               grid;
          grid-template-columns: repeat(3, 1fr);
          gap:                   40px;
          max-width:             1000px;
        }
        @media (max-width: 900px) {
          .pp-ma-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
        }
        @media (max-width: 560px) {
          .pp-ma-grid { grid-template-columns: 1fr; gap: 28px; }
        }

      `}</style>

      <Nav lang={lang} onToggleLang={toggleLang} />

      {/* ── Photo · Name · Role · Connect · Bio ── */}
      <div className="pp-img-col">

        <div className="pp-photo">
          <PersonSilhouette size={80} />
        </div>

        <div className="pp-header-block">
          <div>
            <h1 className="pp-name">{person.name}</h1>
            <p  className="pp-role">{person.role}</p>
          </div>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="pp-connect"
          >
            <span className="pp-connect-label">Connect</span>
            <div className="pp-connect-circle">
              <span className="pp-connect-in">in</span>
            </div>
          </a>
        </div>

        <p className="pp-bio">{person.bio}</p>

      </div>

      {/* ── Divider ── */}
      <hr className="pp-divider" />

      {/* ── More About ── */}
      <div className="pp-foundation-col">

        <h2 className="pp-ma-heading">More About the Foundation</h2>

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

      <Footer lang={lang} />
    </main>
  )
}
