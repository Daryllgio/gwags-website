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
    bio:  "Leads the foundation’s governance and strategic direction across its operations.",
  },
  {
    name: 'Vianney Tanifor',
    role: 'Board Member',
    bio:  'Contributes expertise in organizational development and community engagement.',
  },
  {
    name: 'Noa Winner',
    role: 'Board Member',
    bio:  "Supports the foundation’s mission through strategic oversight and partnerships.",
  },
]

const executiveTeam = [
  { name: 'Marcus Thibodeau', role: 'Executive Director',                        bio: "Marcus leads day-to-day operations and drives the foundation’s mission delivery on the ground." },
  { name: 'Isabelle Mvondo',  role: 'Director of Programs',                      bio: "Isabelle designs and oversees the foundation’s youth and community programs in Cameroon." },
  { name: 'Samuel Eze',       role: 'Director of Operations',                    bio: 'Samuel manages internal systems, logistics, and organizational infrastructure.' },
  { name: 'Laure Menguele',   role: 'Director of Communications & Partnerships', bio: 'Laure leads external communications and builds partnerships with donors and peer organizations.' },
  { name: 'Christelle Biya',  role: 'Programs Officer',                          bio: 'Christelle supports program implementation and community engagement in the South West region.' },
  { name: 'Henri Nkemdirim',  role: 'Finance & Admin Officer',                   bio: 'Henri handles financial reporting, budgeting, and administrative functions for the foundation.' },
]

const historicalLeadership = [
  { name: 'Gloria Alana Asopjio', role: 'Founding Member' },
  { name: 'Alissa Kenne Mokem',   role: 'Founding Member' },
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

function PersonCard({ name, role, bio, showBio = true, showLink = true }: {
  name: string; role: string; bio?: string; showBio?: boolean; showLink?: boolean
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
      <p className="mt-3" style={{ color: NAVY, fontSize: '22px', fontWeight: 700 }}>{name}</p>

      {/* Role */}
      <p className="mt-1" style={{ color: '#1A3060', fontSize: '20px', fontWeight: 400 }}>{role}</p>

      {/* Bio */}
      {showBio && bio && (
        <p className="mt-2 leading-relaxed" style={{ color: NAVY, fontSize: '16px', fontWeight: 400 }}>{bio}</p>
      )}

      {/* View profile */}
      {showLink && (
        <a
          href="#"
          className="mt-3 inline-block view-profile-link"
          style={{ color: NAVY, fontSize: '15px', textDecoration: 'none' }}
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
      className="font-black uppercase mb-8"
      style={{ color: NAVY, fontSize: '30px', fontFamily: 'Georgia, "Times New Roman", serif' }}
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
        className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-sm"
        style={{
          border: `1px solid #d1d5db`,
          color: NAVY,
          background: '#ffffff',
          fontSize: '15px',
        }}
      >
        <span>{value === 'All' ? 'Team: All' : value}</span>
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
              className="block w-full text-left px-4 py-2"
              style={{
                fontSize: '15px',
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
    <main style={{ background: '#F7F6F3', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
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
      `}</style>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="px-8 py-16 max-w-7xl mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10">
          <h1
            className="font-black uppercase leading-tight"
            style={{ color: NAVY, fontSize: '48px', fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Leadership
          </h1>
          <p className="leading-relaxed self-center" style={{ color: NAVY, fontSize: '18px' }}>
            The Gwags Foundation&apos;s leaders are committed to creating lasting change for children and youth in Cameroon.
            Our team brings together expertise in governance, program delivery, operations, and community engagement.
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
              style={{
                flex: 1,
                border: 'none',
                borderBottom: `1.5px solid rgba(10,17,40,0.25)`,
                paddingBottom: '8px',
                fontSize: '15px',
                outline: 'none',
                background: 'transparent',
                color: NAVY,
              }}
            />
            <button
              style={{
                background: NAVY,
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
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
              {filteredBoard.map(p => <PersonCard key={p.name} {...p} />)}
            </div>
          </section>
        )}

        {/* Executive Team */}
        {showExec && (
          <section className="mb-16">
            <SectionTitle>Executive Team</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExec.map(p => <PersonCard key={p.name} {...p} />)}
            </div>
          </section>
        )}

        {/* Historical Leadership */}
        {showHistorical && (
          <section className="mb-16">
            <SectionTitle>Historical Leadership</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHistorical.map(p => (
                <PersonCard key={p.name} name={p.name} role={p.role} bio="" showBio={false} showLink={false} />
              ))}
            </div>
          </section>
        )}

      </div>

      <Footer lang={lang} />
    </main>
  )
}
