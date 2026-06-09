'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Lang } from '@/lib/translations'

const NAVY  = '#0A1128'
const GOLD  = '#D4AF37'

/* ── Data ─────────────────────────────────────────────────────────────── */

const governanceBoard = [
  {
    name: 'D. Giovanny Bikak Mbal',
    role: 'Chair, Board Member',
    bio:  "Founder of Gwags and Chair of the Board, Giovanny leads the institution's governance and strategic direction.",
    href: '/about/leadership/daryll-giovanny-bikak-mbal',
  },
  {
    name: 'Vianney Tanifor',
    role: 'Board Member',
    bio:  'Vianney brings expertise in organizational development and community engagement to the Gwags governance board.',
    href: '/about/leadership/vianney-tanifor',
  },
  {
    name: 'Noa Winner',
    role: 'Board Member',
    bio:  "Noa contributes strategic oversight and partnership expertise to the Gwags governance board.",
    href: '/about/leadership/noa-winner',
  },
]

const executiveTeam = [
  { name: '[Name Placeholder]', role: 'Executive Director',                        bio: "The Executive Director oversees the day-to-day operations of Gwags, working closely with the governance board.", href: '/about/leadership/placeholder-executive-director' },
  { name: '[Name Placeholder]', role: 'Director of Programs',                      bio: "The Director of Programs leads the design, delivery, and evaluation of Gwags's active portfolio of initiatives.", href: '/about/leadership/placeholder-director-programs' },
  { name: '[Name Placeholder]', role: 'Director of Operations',                    bio: 'The Director of Operations manages the internal processes and organizational infrastructure that enable Gwags to operate effectively.', href: '/about/leadership/placeholder-director-operations' },
  { name: '[Name Placeholder]', role: 'Director of Communications & Partnerships', bio: "The Director of Communications & Partnerships leads Gwags's external engagement and development of strategic partnerships.", href: '/about/leadership/placeholder-director-communications' },
  { name: '[Name Placeholder]', role: 'Director of Resource Mobilization',         bio: "The Director of Resource Mobilization leads Gwags's efforts to secure funding and build donor relationships.", href: '/about/leadership/placeholder-director-resource' },
]

const historicalLeadership = [
  { name: 'Gloria Alana Asopjio', role: 'Founding Member', href: '/about/leadership/gloria-alana-asopjio' },
  { name: 'Alissa Kenne Mokem',   role: 'Founding Member', href: '/about/leadership/alissa-kenne-mokem' },
]

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

function PersonCard({ name, role, bio, href, showBio = true, showLink = true }: {
  name: string; role: string; bio?: string; href?: string; showBio?: boolean; showLink?: boolean
}) {
  return (
    <div>
      {/* Photo placeholder */}
      <div
        className="w-full rounded-xl flex items-center justify-center"
        style={{ height: '280px', background: '#e8e8e8' }}
      >
        <PersonIcon />
      </div>

      {/* Name */}
      <p className="mt-3 lp-person-name" style={{ color: NAVY, fontSize: '22px', fontWeight: 600 }}>{name}</p>

      {/* Role */}
      <p className="lp-person-role" style={{ color: '#6B6B6B', fontSize: '22px', fontWeight: 400, marginTop: '2px' }}>{role}</p>

      {/* Bio */}
      {showBio && bio && (
        <p className="mt-2 leading-relaxed lp-person-bio" style={{ color: NAVY, fontSize: '17px', fontWeight: 400 }}>{bio}</p>
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
      style={{ color: NAVY, fontSize: '27px', fontFamily: 'Georgia, "Times New Roman", serif' }}
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
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')

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

  const filteredHistorical = useMemo(() =>
    historicalLeadership.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase())
    ), [search])

  const showBoard      = (teamFilter === 'All' || teamFilter === 'Governance Board') && filteredBoard.length > 0
  const showExec       = (teamFilter === 'All' || teamFilter === 'Executive Team')   && filteredExec.length  > 0
  const showHistorical = teamFilter === 'All' && filteredHistorical.length > 0
  const noResults      = !showBoard && !showExec && !showHistorical

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <style>{`
        .view-profile-link {
          position: relative;
          display: inline-block;
        }
        .view-profile-link::after {
          content: "";
          display: block;
          height: 1.5px;
          background: #D4AF37;
          width: 0%;
          transition: width 0.3s ease;
        }
        .view-profile-link:hover {
          color: #D4AF37 !important;
        }
        .view-profile-link:hover::after {
          width: 100%;
        }
        @media (hover: none) {
          .view-profile-link::after { display: none; }
          .view-profile-link:hover { color: inherit; }
        }
      `}</style>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="px-8 py-16 max-w-7xl mx-auto lp-container">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10 lp-header">
          <h1
            className="font-semibold uppercase leading-tight lp-heading"
            style={{ color: NAVY, fontSize: '40px', fontFamily: 'Georgia, "Times New Roman", serif' }}
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
              {filteredBoard.map(p => <PersonCard key={p.href} {...p} />)}
            </div>
          </section>
        )}

        {/* Executive Team */}
        {showExec && (
          <section className="mb-16">
            <SectionTitle>Executive Team</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExec.map(p => <PersonCard key={p.href} {...p} showLink={false} />)}
            </div>
          </section>
        )}

        {/* Historical Leadership */}
        {showHistorical && (
          <section className="mb-16">
            <SectionTitle>Historical Leadership</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHistorical.map(p => (
                <PersonCard key={p.name} name={p.name} role={p.role} bio="" href={p.href} showBio={false} showLink={false} />
              ))}
            </div>
          </section>
        )}

      </div>

      <Footer lang={lang} />
    </main>
  )
}
