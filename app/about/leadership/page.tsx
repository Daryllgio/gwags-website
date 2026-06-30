'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import { useLang } from '@/lib/useLang'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'


const NAVY  = '#0A1128'
const GOLD  = '#D4AF37'

/* ── Data ─────────────────────────────────────────────────────────────── */

const governanceBoard = [
  {
    name: 'Giovanny Bikak Mbal',
    role: 'Chair, Board Member',
    bio:  "As Chair, Giovanny shapes and approves the institution's strategies, advocates for the institution's issues, and sets the organization's overall direction. He also serves as Interim Executive Director.",
    bioFr: "En tant que Président, Giovanny façonne et approuve les stratégies de l'institution, défend les causes de l'institution et définit l'orientation générale de l'organisation. Il occupe également le poste de Directeur Exécutif par intérim.",
    href: '/about/leadership/daryll-giovanny-bikak-mbal',
  },
  {
    name: 'Winner Noa',
    role: 'Board Member',
    bio:  "Noa contributes strategic oversight and partnership expertise to the Gwags governance board.",
    href: '/about/leadership/noa-winner',
  },
  {
    name: 'Vianney Tanifor',
    role: 'Board Member',
    bio:  'Vianney brings expertise in organizational development and community engagement to the Gwags governance board.',
    href: '/about/leadership/vianney-tanifor',
  },
]

const executiveTeam = [
  { name: '[Name Placeholder]', role: 'Director of Operations',                    bio: "[Name] manages the internal processes and daily operations that enable the organization's mission.",        bioFr: "[Nom] gère les processus internes et les opérations quotidiennes qui soutiennent la mission de l'organisation.", linkedinUrl: 'https://linkedin.com/in/placeholder' /* UPDATE: Replace with actual LinkedIn URL */ },
  { name: '[Name Placeholder]', role: 'Director of Communications', bio: "[Name] oversees Gwags's communications strategy and public presence across all platforms.",                   bioFr: "[Nom] supervise la stratégie de communication de Gwags et sa présence publique sur toutes les plateformes.", linkedinUrl: 'https://linkedin.com/in/placeholder' /* UPDATE: Replace with actual LinkedIn URL */ },
  { name: '[Name Placeholder]', role: 'Director of Development',         bio: "[Name] leads Gwags's fundraising strategy, including grant acquisition and institutional funding.",                   bioFr: "[Nom] dirige la stratégie de collecte de fonds de Gwags, incluant l'acquisition de subventions et le financement institutionnel.", linkedinUrl: 'https://linkedin.com/in/placeholder' /* UPDATE: Replace with actual LinkedIn URL */ },
]

const historicalLeadershipData = {
  en: [
    {
      name: 'Gloria Alana Asopjio',
      role: 'Founding Member',
      bio: "Gloria was one of the founding members of the Gwags Foundation, leading outreach coordination and the procurement of resources for the foundation's early programs.",
      href: '/about/leadership/gloria-alana-asopjio',
      linkedinUrl: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
    },
    {
      name: 'Alissa Kenne Mokem',
      role: 'Founding Member',
      bio: "Alissa was one of the founding members of the Gwags Foundation, managing the foundation's financial operations.",
      href: '/about/leadership/alissa-kenne-mokem',
      linkedinUrl: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
    },
  ],
  fr: [
    {
      name: 'Gloria Alana Asopjio',
      role: 'Membre fondatrice',
      bio: "Gloria a été l'une des membres fondatrices de la Gwags Foundation, dirigeant la coordination de la sensibilisation et l'approvisionnement en ressources pour les premiers programmes de la fondation.",
      href: '/about/leadership/gloria-alana-asopjio',
      linkedinUrl: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
    },
    {
      name: 'Alissa Kenne Mokem',
      role: 'Membre fondatrice',
      bio: "Alissa a été l'une des membres fondatrices de la Gwags Foundation, gérant les opérations financières de la fondation.",
      href: '/about/leadership/alissa-kenne-mokem',
      linkedinUrl: 'https://linkedin.com/in/placeholder', // UPDATE: Replace with actual LinkedIn URL
    },
  ],
}

const FILTER_OPTIONS = ['All', 'Governance Board', 'Executive Team']

/* ── Sub-components ───────────────────────────────────────────────────── */

function PersonIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="22" r="12" fill="#c8c8c8" />
      <path d="M8 56c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="#c8c8c8" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function PersonCard({ name, role, bio, href, showBio = true, showLink = true, linkedinUrl }: {
  name: string; role: string; bio?: string; href?: string; showBio?: boolean; showLink?: boolean; linkedinUrl?: string
}) {
  return (
    <div className="lp-person-card">
      {/* Photo placeholder */}
      <div
        className="lp-person-img w-full rounded-xl flex items-center justify-center"
        style={{ background: '#e8e8e8' }}
      >
        <PersonIcon />
      </div>

      {/* Name */}
      <p className="mt-3 lp-person-name" style={{ color: NAVY, fontSize: '22px', fontWeight: 600 }}>{name}</p>

      {/* Role */}
      <p className="lp-person-role" style={{ color: '#6B6B6B', fontSize: '22px', fontWeight: 400, marginTop: '1px' }}>{role}</p>

      {/* Bio */}
      {showBio && bio && (
        <p className="mt-2 leading-relaxed lp-person-bio" style={{ color: NAVY, fontSize: '17px', fontWeight: 400 }}>{bio}</p>
      )}

      {/* LinkedIn Connect */}
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pp-connect"
          style={{ marginTop: '12px' }}
        >
          <div className="pp-connect-circle">
            <span className="pp-connect-in">in</span>
          </div>
        </a>
      )}

      {/* View profile */}
      {showLink && href && (
        <a
          href={href}
          className="mt-3 inline-block view-profile-link"
          style={{ color: NAVY, fontSize: '17px', fontWeight: 500, textDecoration: 'none' }}
        >
          View profile
        </a>
      )}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-semibold uppercase mb-8 lp-section-title"
      style={{ color: NAVY, fontSize: '26px', fontFamily: 'inherit' }}
    >
      {children}
    </h2>
  )
}

/* Custom dropdown */
function TeamDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative inline-block" style={{ minWidth: '200px' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="lp-dropdown-trigger flex items-center justify-between w-full px-4 py-2 rounded-lg"
        style={{
          border: `1px solid #d1d5db`,
          color: NAVY,
          background: '#ffffff',
          fontSize: '16px',
        }}
      >
        <span>{value}</span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ marginLeft: '8px', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path d="M2 4l4 4 4-4" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 w-full rounded-lg shadow-lg z-10 overflow-hidden"
          style={{ top: 'calc(100% + 4px)', background: '#ffffff', border: '1px solid #d1d5db' }}
        >
          {FILTER_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className="lp-dropdown-option block w-full text-left px-4 py-2"
              style={{
                fontSize: '16px',
                color: opt === value ? GOLD : NAVY,
                background: opt === value ? '#f9f7f0' : '#ffffff',
              }}
            >
              {opt === 'All' ? 'All' : opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function LeadershipPage() {
  const [lang, toggleLang] = useLang()

  const [search,     setSearch]     = useState('')
  const [teamFilter, setTeamFilter] = useState('All')

  const filteredBoard = useMemo(() =>
    governanceBoard.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase())
    ), [search])

  const filteredExec = useMemo(() =>
    executiveTeam.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase())
    ), [search])

  const historicalLeadership = historicalLeadershipData[lang]

  const filteredHistorical = useMemo(() =>
    historicalLeadership.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase())
    ), [search, historicalLeadership])

  const showBoard      = (teamFilter === 'All' || teamFilter === 'Governance Board') && filteredBoard.length > 0
  const showExec       = (teamFilter === 'All' || teamFilter === 'Executive Team')   && filteredExec.length  > 0
  const showHistorical = teamFilter === 'All' && filteredHistorical.length > 0
  const noResults      = !showBoard && !showExec && !showHistorical

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="px-8 py-16 max-w-7xl mx-auto lp-container">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10 lp-header">
          <h1
            className="font-semibold uppercase leading-tight lp-heading"
            style={{ color: NAVY, fontSize: '37px', fontFamily: 'inherit' }}
          >
            Leadership
          </h1>
          <p className="leading-relaxed self-center lp-subtitle" style={{ color: NAVY, fontSize: '18px' }}>
            {lang === 'fr'
              ? "Nos équipes de gouvernance et exécutive rassemblent une expertise dans le leadership organisationnel, la mise en œuvre des programmes, les opérations et l'engagement communautaire. Nos leaders sont guidés par la mission de l'institution de construire l'infrastructure qui permet aux organisations de créer un impact à grande échelle."
              : "Our governance and executive teams bring together expertise across organizational leadership, program delivery, operations, and community engagement. Our leaders are guided by the institution's mission to build the infrastructure that enables organizations to create impact at scale."}
          </p>
        </div>
        <hr style={{ borderColor: 'rgba(10,17,40,0.12)', marginBottom: '40px' }} />

        {/* Search & filter */}
        <div className="mb-14" style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', flex: '0 0 auto', maxWidth: '420px', width: '100%' }}>
            <input
              type="text"
              placeholder="Search by name or role..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="lp-search-input"
              style={{
                flex: 1,
                border: 'none',
                borderBottom: `1.5px solid rgba(10,17,40,0.25)`,
                paddingBottom: '8px',
                fontSize: '16px',
                outline: 'none',
                background: 'transparent',
                color: NAVY,
              }}
            />
            <button
              className="lp-search-btn"
              style={{
                background: NAVY,
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              Search
            </button>
          </div>

          <TeamDropdown value={teamFilter} onChange={setTeamFilter} />
        </div>

        {/* No results */}
        {noResults && (
          <p className="text-center py-20" style={{ color: NAVY, fontSize: '18px' }}>No results found.</p>
        )}

        {/* Governance Board */}
        {showBoard && (
          <section className="mb-16">
            <SectionTitle>Governance Board</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBoard.map(p => <PersonCard key={p.href} {...p} bio={lang === 'fr' && (p as { bioFr?: string }).bioFr ? (p as { bioFr?: string }).bioFr! : p.bio} />)}
            </div>
          </section>
        )}

        {/* Executive Team */}
        {showExec && (
          <section className="mb-16">
            <SectionTitle>Executive Team</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExec.map((p, i) => <PersonCard key={i} {...p} showLink={false} bio={lang === 'fr' && (p as { bioFr?: string }).bioFr ? (p as { bioFr?: string }).bioFr! : p.bio} />)}
            </div>
          </section>
        )}

        {/* Historical Leadership */}
        {showHistorical && (
          <section className="mb-16">
            <SectionTitle>Historical Leadership</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHistorical.map(p => (
                <PersonCard key={p.name} name={p.name} role={p.role} bio={p.bio} href={p.href} showLink={false} linkedinUrl={p.linkedinUrl} />
              ))}
            </div>
          </section>
        )}

      </div>

      <Footer lang={lang} />
    </main>
  )
}
