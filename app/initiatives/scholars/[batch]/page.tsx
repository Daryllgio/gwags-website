'use client'
import { useLang } from '@/lib/useLang'
import { t } from '@/lib/translations'
import Image from 'next/image'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function BatchPage({ params }: { params: { batch: string } }) {
  const [lang, toggleLang] = useLang()
  const batch = t[lang].scholarsBatches[params.batch as keyof typeof t[typeof lang]['scholarsBatches']]

  if (!batch) {
    return (
      <main>
        <Nav lang={lang} onToggleLang={toggleLang} />
        <Footer lang={lang} />
      </main>
    )
  }

  return (
    <main>
      <Nav lang={lang} onToggleLang={toggleLang} />
      <section className="ip-batch-hero">
        <div className="ip-batch-hero-inner">
          <h1 className="ip-batch-title">{batch.title}</h1>
          <p className="ip-batch-subtitle">{batch.batchLabel}</p>
        </div>
      </section>
      <section className="ip-batch-grid-section">
        <div className="ip-batch-grid-inner">
          <div className="ip-batch-grid">
            {batch.scholars.map((scholar, i) => (
              <div key={i} className="ip-winner-card">
                <div className="ip-winner-img">
                  <Image src={scholar.image} alt={scholar.name} fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <p className="ip-winner-name">{scholar.name}</p>
                <p className="ip-winner-detail"><span className="ip-winner-label">{batch.universityLabel}:</span> {scholar.university}</p>
                <p className="ip-winner-detail"><span className="ip-winner-label">{batch.programLabel}:</span> {scholar.program}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer lang={lang} />
    </main>
  )
}
