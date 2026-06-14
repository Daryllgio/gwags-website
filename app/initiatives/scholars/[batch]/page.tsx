'use client'
import { useLang } from '@/lib/useLang'
import { Lang } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function BatchPage({ params }: { params: { batch: string } }) {
  const [lang, toggleLang] = useLang()

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
                <p className="ip-winner-name">Scholar {i + 1}</p>
                <p className="ip-winner-detail"><span className="ip-winner-label">University:</span> Placeholder University</p>
                <p className="ip-winner-detail"><span className="ip-winner-label">Program:</span> Placeholder Program</p>
                <p className="ip-winner-detail"><span className="ip-winner-label">Study level:</span> Placeholder Level</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer lang={lang} />
    </main>
  )
}
