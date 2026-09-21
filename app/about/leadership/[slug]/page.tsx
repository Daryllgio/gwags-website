'use client'
import { useLang } from '@/lib/useLang'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { t } from '@/lib/translations'

const NAVY = '#0A1128'
const GOLD = '#D4AF37'

/* ── People data ─────────────────────────────────────────────────────────── */

const PEOPLE: Record<string, { name: string; role: string; roleFr?: string; bio: string | string[]; bioFr?: string | string[]; linkedin?: string; image?: string; imagePosition?: string }> = {
  'daryll-giovanny-bikak-mbal': {
    name: 'Giovanny Bikak Mbal',
    role: 'Chair, Board Member',
    roleFr: 'Président du Conseil d\'administration',
    bio: "As Chair, Giovanny shapes and approves the institution's strategies, advocates for the institution's issues, and sets the organization's overall direction. He also serves as Interim Executive Director.",
    bioFr: "En tant que Président, Giovanny façonne et approuve les stratégies de l'institution, défend les causes de l'institution et définit l'orientation générale de l'organisation. Il occupe également le poste de Directeur Exécutif par intérim.",
    linkedin: 'https://www.linkedin.com/in/giovannybikakmbal/',
    image: '/images/leadership/giovanny-bikak-mbal.jpg',
  },
  'vianney-tanifor': {
    name: 'Vianney Tanifor',
    role: 'Board Member',
    roleFr: "Membre du Conseil d'Administration",
    bio: [
      "Vianney Tanifor serves on the Governance Board of Gwags Global Impact Institution, where he leads the Audit & Finance Committee. His work is shaped by a broader commitment to medicine, public health, research, and public policy, with a particular interest in strengthening healthcare systems and advancing sustainable development in Cameroon. Through Gwags, he has worked across institutional governance, health initiatives, program implementation, and partnerships aimed at expanding opportunities and improving community well-being.",
      "Vianney studies Biological Sciences and Political Science at the University of Maryland, Baltimore County, where his academic and research experiences have deepened his interest in the relationship between disease, healthcare delivery, and the policies that shape access to care. He is especially interested in neuroinfectious disease and in how scientific evidence can inform stronger health systems, better policy, and more effective responses to the health challenges facing underserved communities.",
      "His work with Gwags has allowed him to apply these interests directly. During a major health campaign in Cameroon, he participated in surgical care, contributed to project financing and implementation, and helped collect health data that is now being analyzed to better understand disease patterns in the communities served. In Geneva, he presented the work of Gwags and was invited to discuss healthcare challenges in Cameroon. He has also partnered with the World Health Organization to support skills-development workshops for medical students in Cameroon.",
      "Vianney hopes to build a career that bridges medicine, research, public service, and policy. His long-term interests center on contributing to better health outcomes not only through clinical and scientific work, but also through the institutions, policies, and systems that determine how healthcare is delivered and who is able to access it.",
    ],
    bioFr: [
      "Vianney Tanifor siège au Conseil d'Administration de Gwags Global Impact Institution, où il préside le Comité d'Audit et des Finances. Son parcours s'inscrit dans un engagement plus large envers la médecine, la santé publique, la recherche et les politiques publiques, avec un intérêt particulier pour le renforcement des systèmes de santé et le développement durable au Cameroun. Au sein de Gwags, il a contribué à la gouvernance institutionnelle, aux initiatives de santé, à la mise en œuvre de programmes et à des partenariats visant à élargir les opportunités et à améliorer le bien-être des communautés.",
      "Vianney poursuit des études en sciences biologiques et en sciences politiques à l'Université du Maryland, comté de Baltimore, où ses expériences académiques et de recherche ont approfondi son intérêt pour les liens entre la maladie, la prestation des soins de santé et les politiques qui déterminent l'accès aux soins. Il s'intéresse particulièrement aux maladies neuro-infectieuses et à la manière dont les données scientifiques peuvent contribuer à des systèmes de santé plus solides, de meilleures politiques et des réponses plus efficaces aux défis sanitaires auxquels font face les communautés défavorisées.",
      "Son engagement au sein de Gwags lui a permis de mettre ces intérêts en pratique. Lors d'une importante campagne de santé au Cameroun, il a participé aux soins chirurgicaux, contribué au financement et à la mise en œuvre du projet, et aidé à collecter des données sanitaires actuellement en cours d'analyse pour mieux comprendre les tendances épidémiologiques dans les communautés desservies. À Genève, il a présenté les travaux de Gwags et a été invité à discuter des enjeux de santé au Cameroun. Il a également collaboré avec l'Organisation mondiale de la Santé pour soutenir des ateliers de développement des compétences destinés aux étudiants en médecine au Cameroun.",
      "Vianney aspire à bâtir une carrière à la croisée de la médecine, de la recherche, du service public et des politiques publiques. Ses ambitions à long terme portent sur l'amélioration des résultats en matière de santé, non seulement par le travail clinique et scientifique, mais aussi par les institutions, les politiques et les systèmes qui déterminent comment les soins sont dispensés et qui peut y accéder.",
    ],
    linkedin: 'https://www.linkedin.com/in/vianney-tanifor-9a76b0280/',
    image: '/images/leadership/vianney-tanifor.jpg',
  },
  'noa-winner': {
    name: 'Winner Noa',
    role: 'Board Member',
    roleFr: "Membre du Conseil d'Administration",
    bio: "Winner leads the Governance, Ethics and Regulatory Committee. He oversees Board composition, ethical compliance, and regulatory alignment across all jurisdictions in which Gwags operates.",
    bioFr: "Winner dirige le Comité de Gouvernance, d'Éthique et de Conformité Réglementaire. Il supervise la composition du Conseil d'administration et la conformité éthique et réglementaire dans l'ensemble des juridictions où Gwags opère.",
    linkedin: 'https://www.linkedin.com/in/winnernoa/',
    image: '/images/leadership/winner-noa.jpg',
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
    name: 'Shifu Hammadina',
    role: 'Chief Program Officer',
    roleFr: 'Directeur des Programmes',
    bio: "Shifu leads the design, execution, and evaluation of all Gwags programs, translating the institution's strategy into measurable field impact.",
    bioFr: "Shifu dirige la conception, l'exécution et l'évaluation de l'ensemble des programmes de Gwags, traduisant la stratégie de l'institution en impact mesurable sur le terrain.",
    linkedin: 'https://www.linkedin.com/in/shifu-afayi-h-3708412a3/',
    image: '/images/leadership/shifu-hammadina.jpg',
  },
  'placeholder-director-communications': {
    name: 'Ornella Ebolo',
    role: 'Chief Communications Officer',
    roleFr: 'Directeur de la Communication',
    bio: "The Chief Communications Officer leads Gwags's external engagement, institutional communications, and the development of strategic partnerships.",
    image: '/images/leadership/ornella-ebolo.jpg',
  },
  'gloria-asopjio': {
    name: 'Gloria Asopjio',
    role: 'Founding Member',
    bio: "Gloria led community outreach and partnership development for the organization's early programs.",
    bioFr: "Gloria a coordonné les relations communautaires et le développement de partenariats pour les premières initiatives de l'organisation.",
    linkedin: 'https://www.linkedin.com/in/gloria-alana-asopjio-060012332/',
    image: '/images/leadership/gloria-asopjio.jpg',
    imagePosition: 'center 63%',
  },
  'alissa-mokem': {
    name: 'Alissa Mokem',
    role: 'Founding Member',
    bio: "Alissa managed the organization's financial operations.",
    bioFr: "Alissa a assuré la gestion financière de l'organisation.",
    image: '/images/leadership/alissa-mokem.jpg',
    imagePosition: 'center 26%',
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
