'use client'
import { useState, useMemo } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Lang } from '@/lib/translations'

const NAVY = '#1e2d3d'

const governanceBoard = [
  { name: 'Amara Nwosu',    role: 'Board Chair & President',              bio: "Amara leads the foundation's strategic vision and oversees its operations across Cameroon and North America." },
  { name: 'Claire Fontaine', role: 'Vice Chair',                           bio: 'Claire supports board leadership and brings expertise in nonprofit governance and international development.' },
  { name: 'Daniel Osei',    role: 'Board Secretary',                       bio: 'Daniel manages board documentation and ensures organizational compliance across jurisdictions.' },
  { name: 'Fatima Al-Rashid', role: 'Board Treasurer',                    bio: "Fatima oversees the foundation's financial integrity and stewardship of donor resources." },
  { name: 'James Keller',   role: 'Board Member',                         bio: 'James contributes expertise in community health and program evaluation to the board.' },
  { name: 'Ngozi Adeyemi',  role: 'Board Member',                         bio: "Ngozi brings a background in education policy and youth advocacy to the foundation's governance." },
]

const executiveTeam = [
  { name: 'Marcus Thibodeau',  role: 'Executive Director',                        bio: "Marcus leads day-to-day operations and drives the foundation's mission delivery on the ground." },
  { name: 'Isabelle Mvondo',   role: 'Director of Programs',                      bio: "Isabelle designs and oversees the foundation's youth and community programs in Cameroon." },
  { name: 'Samuel Eze',        role: 'Director of Operations',                    bio: 'Samuel manages internal systems, logistics, and organizational infrastructure.' },
  { name: 'Laure Menguele',    role: 'Director of Communications & Partnerships', bio: 'Laure leads external communications and builds partnerships with donors and peer organizations.' },
  { name: 'Christelle Biya',   role: 'Programs Officer',                          bio: 'Christelle supports program implementation and community engagement in the South West region.' },
  { name: 'Henri Nkemdirim',   role: 'Finance & Admin Officer',                   bio: 'Henri handles financial reporting, budgeting, and administrative functions for the foundation.' },
]

function PersonIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="22" r="12" fill="#9ca3af" />
      <path d="M8 56c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function PersonCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className="bg-white rounded-xl p-4 transition-shadow duration-200 hover:shadow-lg">
      <div className="w-full rounded-xl bg-gray-200 flex items-center justify-center" style={{ height: '280px' }}>
        <PersonIcon />
      </div>
      <p className="text-lg font-bold mt-3" style={{ color: NAVY }}>{name}</p>
      <p className="text-sm text-gray-500 mt-1">{role}</p>
      <p className="text-sm text-gray-400 mt-2 leading-relaxed">{bio}</p>
      <a href="#" className="text-sm mt-3 inline-block hover:underline" style={{ color: NAVY }}>View profile →</a>
    </div>
  )
}

function Section({ title, people }: { title: string; people: typeof governanceBoard }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-black uppercase mb-8" style={{ color: NAVY }}>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {people.map(p => <PersonCard key={p.name} {...p} />)}
      </div>
    </section>
  )
}

export default function LeadershipPage() {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')

  const [search, setSearch]     = useState('')
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

  const showBoard = (teamFilter === 'All' || teamFilter === 'Governance Board') && filteredBoard.length > 0
  const showExec  = (teamFilter === 'All' || teamFilter === 'Executive Team')   && filteredExec.length  > 0
  const noResults = !showBoard && !showExec

  return (
    <main style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#ffffff' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="px-8 py-16 max-w-7xl mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10">
          <h1 className="text-5xl font-black uppercase leading-tight" style={{ color: NAVY }}>
            Meet Our Team
          </h1>
          <p className="text-gray-500 leading-relaxed self-center">
            The Gwags Foundation&apos;s leaders are committed to creating lasting change for children and youth in Cameroon.
            Our team brings together expertise in governance, program delivery, operations, and community engagement.
          </p>
        </div>
        <hr className="border-gray-200 mb-10" />

        {/* Search & filter */}
        <div className="mb-12 space-y-4">
          <div className="flex gap-3 items-end">
            <input
              type="text"
              placeholder="Search by name or role..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 border-b border-gray-300 pb-2 text-sm outline-none focus:border-gray-600 bg-transparent placeholder-gray-400"
            />
            <button
              className="px-5 py-2 rounded-full text-sm font-medium text-white flex-shrink-0"
              style={{ backgroundColor: NAVY }}
            >
              Search
            </button>
          </div>
          <div>
            <select
              value={teamFilter}
              onChange={e => setTeamFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-gray-500 bg-white"
            >
              <option value="All">Team: All</option>
              <option value="Governance Board">Governance Board</option>
              <option value="Executive Team">Executive Team</option>
            </select>
          </div>
        </div>

        {/* No results */}
        {noResults && (
          <p className="text-center text-gray-400 py-20 text-lg">No results found.</p>
        )}

        {/* Sections */}
        {showBoard && <Section title="Governance Board" people={filteredBoard} />}
        {showExec  && <Section title="Executive Team"   people={filteredExec}  />}
      </div>

      <Footer lang={lang} />
    </main>
  )
}
