'use client'
import { useLang } from '@/lib/useLang'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { t } from '@/lib/translations'

const NAVY = '#0A1128'
const GOLD = '#D4AF37'

/* ── People data ─────────────────────────────────────────────────────────── */

const PEOPLE: Record<string, { name: string; role: string; roleFr?: string; bio: string; bioFr?: string; linkedin: string }> = {
  'daryll-giovanny-bikak-mbal': {
    name: 'Giovanny Bikak Mbal',
    role: 'Chair, Board Member',
    roleFr: 'Président du Conseil d\'administration',
    bio: "As Chair, Giovanny shapes and approves the institution's strategies, advocates for the institution's issues, and sets the organization's overall direction. He also serves as Interim Executive Director.",
    bioFr: "En tant que Président, Giovanny façonne et approuve les stratégies de l'institution, défend les causes de l'institution et définit l'orientation générale de l'organisation. Il occupe également le poste de Directeur Exécutif par intérim.",
    linkedin: 'https://www.linkedin.com/in/giovannybikakmbal/',
  },
  'vianney-tanifor': {
    name: 'Vianney Tanifor',
    role: 'Board Member',
    bio: "Vianney brings expertise in organizational development and community engagement to the Gwags governance board. His experience supports the foundation's mission to build credible, well-structured institutions.",
    linkedin: 'https://www.linkedin.com/in/vianney-tanifor-9a76b0280/',
  },
  'noa-winner': {
    name: 'Winner Noa',
    role: 'Board Member',
    bio: "Noa contributes strategic oversight and partnership expertise to the Gwags governance board, supporting the institution's long-term institutional and operational direction.",
    linkedin: 'https://www.linkedin.com/in/winnernoa/',
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
    role: 'Director of Communications',
    bio: "The Director of Communications leads Gwags's external engagement, institutional communications, and the development of strategic partnerships.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'placeholder-director-resource': {
    name: '[Name Placeholder]',
    role: 'Director of Development',
    bio: "The Director of Development leads Gwags's efforts to secure funding, build donor relationships, and develop the financial pathways needed to sustain and grow the institution's work.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'gloria-alana-asopjio': {
    name: 'Gloria Alana Asopjio',
    role: 'Founding Member',
    bio: "Gloria was one of the founding members of the Gwags Foundation, leading outreach coordination and the procurement of resources for the foundation's early programs.",
    bioFr: "Gloria a été l'une des membres fondatrices de la Fondation Gwags, dirigeant la coordination de la sensibilisation et l'approvisionnement en ressources pour les premiers programmes de la fondation.",
    linkedin: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
  },
  'alissa-kenne-mokem': {
    name: 'Alissa Kenne Mokem',
    role: 'Founding Member',
    bio: "Alissa was one of the founding members of the Gwags Foundation, managing the foundation's financial operations.",
    bioFr: "Alissa a été l'une des membres fondatrices de la Fondation Gwags, gérant les opérations financières de la fondation.",
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
  const [lang, toggleLang] = useLang()

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
      style={{
        background: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <Nav lang={lang} onToggleLang={toggleLang} />

      {/* ── Photo · Name · Role · Connect · Bio ── */}
      <div className="pp-img-col">

        <div className="pp-photo">
          <PersonSilhouette size={80} />
        </div>

        <div className="pp-header-block">
          <div>
            <h1 className="pp-name">{person.name}</h1>
            <p  className="pp-role">{lang === 'fr' && person.roleFr ? person.roleFr : person.role}</p>
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

        <p className="pp-bio">{lang === 'fr' && person.bioFr ? person.bioFr : person.bio}</p>

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
