'use client'
import { useLang } from '@/lib/useLang'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { t } from '@/lib/translations'

type BodyItem = string | { term: string; desc: string } | { list: string[] }

interface LegalDoc {
  title: string
  updated: string
  intro?: BodyItem[]
  sections: { heading: string; body: BodyItem[] }[]
}

function renderBodyItem(item: BodyItem, key: number) {
  if (typeof item === 'string') {
    return <p key={key} className="legal-body">{item}</p>
  }
  if ('list' in item) {
    return (
      <ul key={key} className="legal-list">
        {item.list.map((li, k) => <li key={k}>{li}</li>)}
      </ul>
    )
  }
  return (
    <p key={key} className="legal-body">
      <strong>{item.term}:</strong> {item.desc}
    </p>
  )
}

export default function LegalPage({ docKey }: { docKey: 'terms' | 'privacy' }) {
  const [lang, toggleLang] = useLang()
  const doc = t[lang][docKey] as unknown as LegalDoc

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div className="legal-doc">
        <h1 className="legal-title">{doc.title}</h1>
        <p className="legal-updated">{doc.updated}</p>

        {doc.intro && (
          <div className="legal-section">
            {doc.intro.map((item, j) => renderBodyItem(item, j))}
          </div>
        )}

        {doc.sections.map((section, i) => (
          <section key={i} className="legal-section">
            <h2 className="legal-heading">{section.heading}</h2>
            {section.body.map((item, j) => renderBodyItem(item, j))}
          </section>
        ))}
      </div>

      <Footer lang={lang} />
    </main>
  )
}
