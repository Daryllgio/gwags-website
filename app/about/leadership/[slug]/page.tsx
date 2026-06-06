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

// Controls how far left the profile image sits from the page edge —
// increase to push right, decrease to push left.
const PROFILE_IMAGE_LEFT_OFFSET = '400px'

// Controls how far left the More About section and divider line start —
// this should be further left than the image offset above (smaller value).
const FOUNDATION_SECTION_LEFT_OFFSET = '36px'

// Controls how wide the bio text column stretches —
// increase to allow wider text, decrease to keep it narrower.
const PROFILE_BIO_MAX_WIDTH = '620px'

// Width of the profile photo placeholder (swap in a real <img> at this width).
const PHOTO_WIDTH = '540px'

// Height of the profile photo placeholder.
const PHOTO_HEIGHT = '420px'

// Vertical space between the nav bar bottom and the top of the photo.
const PAGE_TOP_PADDING = '60px'

// Right-side padding for image/bio column and More About section.
const PAGE_RIGHT_PADDING = '60px'

/* ═══════════════════════════════════════════════════════════════════════════ */

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
    bio: "Alissa was part of the founding team that established Gwags in 2021, contributing to the early initiatives that laid the groundwork for the institution's growth and formalization.",
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
    /*
     * .pp-root holds CSS custom properties initialised from the JS constants
     * above. Media queries in the <style> block below override them at each
     * breakpoint, so every measurement flows from one source of truth.
     */
    <main
      className="pp-root"
      style={{
        background: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        /* Inject layout constants as CSS variables so media queries can scale them */
        ['--img-left' as string]:        PROFILE_IMAGE_LEFT_OFFSET,
        ['--foundation-left' as string]: FOUNDATION_SECTION_LEFT_OFFSET,
        ['--bio-max-width' as string]:   PROFILE_BIO_MAX_WIDTH,
        ['--photo-w' as string]:         PHOTO_WIDTH,
        ['--photo-h' as string]:         PHOTO_HEIGHT,
        ['--page-top' as string]:        PAGE_TOP_PADDING,
        ['--page-right' as string]:      PAGE_RIGHT_PADDING,
      }}
    >
      <style>{`
        /* ── Tablet: scale down all offsets ── */
        @media (max-width: 1024px) {
          .pp-root {
            --img-left:        48px;   /* reduced from ${PROFILE_IMAGE_LEFT_OFFSET} */
            --foundation-left: 24px;   /* reduced from ${FOUNDATION_SECTION_LEFT_OFFSET} */
            --photo-h:         340px;
            --page-top:        48px;
            --page-right:      40px;
          }
        }

        /* ── Phone: minimal offsets, full-width photo ── */
        @media (max-width: 768px) {
          .pp-root {
            --img-left:        20px;
            --foundation-left: 16px;
            --bio-max-width:   calc(100vw - 40px);
            --photo-w:         calc(100vw - 40px);
            --photo-h:         280px;
            --page-top:        36px;
            --page-right:      20px;
          }
        }

        /* ────────────────────────────────────────────────── */
        /* Image + name + role + bio column                   */
        /* ────────────────────────────────────────────────── */

        .pp-img-col {
          margin-left:  var(--img-left);
          padding-top:  var(--page-top);
          padding-right: var(--page-right);
        }

        /* Photo placeholder
           ─────────────────────────────────────────────────
           To swap in a real photo, replace the .pp-photo div with:

             <div class="pp-photo" style="background:none;overflow:hidden;position:relative;">
               <img src="/images/leadership/[slug].jpg" alt="[name]"
                    style="width:100%;height:100%;object-fit:cover;object-position:top center;" />
             </div>

           Or with Next.js Image:
             <div class="pp-photo" style="background:none;overflow:hidden;position:relative;">
               <Image src="..." alt="..." fill style={{objectFit:'cover',objectPosition:'top center'}} />
             </div>
           ─────────────────────────────────────────────────
        */
        .pp-photo {
          width:          var(--photo-w);
          height:         var(--photo-h);
          max-width:      100%;
          background:     #e8e8e8;
          border-radius:  1rem;           /* rounded-2xl */
          display:        flex;
          align-items:    center;
          justify-content: center;
          margin-bottom:  36px;
        }

        .pp-name {
          font-family:  Georgia, "Times New Roman", serif;
          font-size:    3rem;             /* text-5xl */
          font-weight:  700;
          color:        ${NAVY};
          margin:       0 0 6px;
          line-height:  1.1;
        }

        /* Role: same size as name, thinnest available weight */
        .pp-role {
          font-family:  Georgia, "Times New Roman", serif;
          font-size:    3rem;             /* text-5xl — matches name size */
          font-weight:  100;              /* font-thin — thinnest weight Georgia supports */
          color:        #555;             /* slightly muted, still clearly readable */
          margin:       0 0 28px;
          line-height:  1.1;
        }

        .pp-bio {
          font-size:    18px;
          color:        ${NAVY};
          line-height:  1.85;
          max-width:    var(--bio-max-width);
          margin:       0 0 48px;
        }

        @media (max-width: 1024px) {
          .pp-name { font-size: 2.25rem; }
          .pp-role { font-size: 2.25rem; }
        }
        @media (max-width: 768px) {
          .pp-name { font-size: 1.75rem; }
          .pp-role { font-size: 1.75rem; }
          .pp-bio  { font-size: 16px;    }
        }

        /* ────────────────────────────────────────────────── */
        /* Divider                                            */
        /* ────────────────────────────────────────────────── */

        .pp-divider {
          border:        none;
          border-top:    2px solid rgba(10,17,40,0.12); /* border-t-2, slightly thicker */
          margin-left:   var(--foundation-left);         /* aligns with More About heading */
          margin-right:  0;
          margin-top:    0;
          margin-bottom: 0;
        }

        /* ────────────────────────────────────────────────── */
        /* More About the Foundation                          */
        /* ────────────────────────────────────────────────── */

        .pp-foundation-col {
          margin-left:   var(--foundation-left);
          padding-top:   56px;
          padding-bottom: 80px;
          padding-right: var(--page-right);
        }
        @media (max-width: 768px) {
          .pp-foundation-col { padding-top: 40px; padding-bottom: 64px; }
        }

        /* Section heading: all-caps, black, large bold — not an eyebrow label */
        .pp-ma-heading {
          font-family:    Georgia, "Times New Roman", serif;
          font-size:      2rem;           /* at least text-3xl */
          font-weight:    700;
          color:          ${NAVY};        /* black, not gold */
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin:         0 0 48px;
          line-height:    1.2;
        }
        @media (max-width: 768px) {
          .pp-ma-heading { font-size: 1.5rem; margin-bottom: 32px; }
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

        /* "Learn more" — gold color + left-to-right sliding underline on hover.
           Desktop only: uses @media (hover: hover) so touch devices are unaffected. */
        .pp-learn-more {
          display:         inline-block;
          position:        relative;
          color:           ${NAVY};
          font-size:       15px;
          text-decoration: none;
        }
        .pp-learn-more::after {
          content:          '';
          position:         absolute;
          bottom:           -2px;
          left:             0;
          width:            0;
          height:           1.5px;
          background:       ${GOLD};
          transition:       width 0.3s ease;
        }
        @media (hover: hover) {
          .pp-learn-more:hover          { color: ${GOLD}; }
          .pp-learn-more:hover::after   { width: 100%; }
        }
      `}</style>

      <Nav lang={lang} onToggleLang={toggleLang} />

      {/* ── Image · Name · Role · Bio — all start at PROFILE_IMAGE_LEFT_OFFSET ── */}
      <div className="pp-img-col">

        <div className="pp-photo">
          <PersonSilhouette size={80} />
        </div>

        <h1 className="pp-name">{person.name}</h1>
        <p  className="pp-role">{person.role}</p>
        <p  className="pp-bio" >{person.bio}</p>

      </div>

      {/* ── Divider — starts at FOUNDATION_SECTION_LEFT_OFFSET ── */}
      <hr className="pp-divider" />

      {/* ── More About — starts at FOUNDATION_SECTION_LEFT_OFFSET ── */}
      <div className="pp-foundation-col">

        <h2 className="pp-ma-heading">MORE ABOUT THE FOUNDATION</h2>

        <div className="pp-ma-grid">
          {m.cards.map((card, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily:   'Georgia, "Times New Roman", serif',
                  fontSize:     '18px',
                  fontWeight:   700,
                  color:        NAVY,
                  marginBottom: '10px',
                  lineHeight:   1.3,
                }}
              >
                {card.title}
              </div>
              <p
                style={{
                  fontSize:   '16px',
                  color:      '#4A4A4A',
                  lineHeight: 1.7,
                  margin:     '0 0 14px',
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
