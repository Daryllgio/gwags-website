'use client'
import { useState } from 'react'
import { Lang } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function BatchPage({ params }: { params: { batch: string } }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')

  return (
    <main>
      <Nav lang={lang} onToggleLang={toggleLang} />
      <section className="ip-batch-hero">
        <div className="ip-batch-hero-inner">
          <h1 className="ip-batch-title">The Gwags Scholars</h1>
          <p className="ip-batch-subtitle">{params.batch} Batch</p>
        </div>
      </section>
      <section className="ip-batch-grid-section">
        <div className="ip-batch-grid-inner">
          <div className="ip-batch-grid">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="ip-winner-card">
                <div className="ip-winner-img" />
                <div className="ip-winner-name">Scholar {i + 1}</div>
                <div className="ip-winner-detail">University placeholder</div>
                <div className="ip-winner-detail">Year of study</div>
                <div className="ip-winner-detail">Field of study</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer lang={lang} />
    </main>
  )
}
