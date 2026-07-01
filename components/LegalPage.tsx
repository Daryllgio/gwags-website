'use client'
import { useLang } from '@/lib/useLang'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { t } from '@/lib/translations'

type BodyItem = string | { term: string; desc: string }

interface LegalDoc {
  title: string
  updated: string
  sections: { heading: string; body: BodyItem[] }[]
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

        {doc.sections.map((section, i) => (
          <section key={i} className="legal-section">
            <h2 className="legal-heading">{section.heading}</h2>
            {section.body.map((item, j) =>
              typeof item === 'string' ? (
                <p key={j} className="legal-body">{item}</p>
              ) : (
                <p key={j} className="legal-body">
                  <strong>{item.term}:</strong> {item.desc}
                </p>
              )
            )}
          </section>
        ))}
      </div>

      <Footer lang={lang} />
    </main>
  )
}
