'use client'
import { useState, Fragment } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Lightbox from '@/components/Lightbox'
import { Lang } from '@/lib/translations'

interface RichBodyItem {
  label: string
  text: string
}

export interface EventSection {
  heading: string
  body?: string
  richBody?: RichBodyItem[]
  detailGrid?: RichBodyItem[]
}

interface StatsData {
  heading: string
  subheading: string
  items: Array<{ value: string; label: string }>
}

export interface EventDetailData {
  heroTitle?: string
  sections: EventSection[]
  stats?: StatsData
  gallery: {
    heading: string
    count: number
  }
}

interface Props {
  lang: Lang
  onToggleLang: () => void
  data: EventDetailData
}

function Divider() {
  return <div className="ip-divider" />
}

function ContentSection({ heading, body, richBody, detailGrid }: EventSection) {
  return (
    <section className="ip-section ip-section-white">
      <div className="ip-content-inner">
        <div className="ip-grid">
          <h2 className="ip-section-heading">{heading}</h2>
          <div>
            {body && body.split('\n\n').map((para, i) => (
              <p key={i} className="ip-section-body">{para}</p>
            ))}
            {richBody && (
              <dl className="ip-rich-body">
                {richBody.map((item, i) => (
                  <div key={i} className="ip-rich-item">
                    <dt className="ip-rich-label">{item.label}</dt>
                    <dd className="ip-rich-text">{item.text}</dd>
                  </div>
                ))}
              </dl>
            )}
            {detailGrid && (
              <div className="ed-detail-grid">
                {detailGrid.map((item, i) => (
                  <div key={i} className="ed-detail-item">
                    <span className="ed-detail-label">{item.label}</span>
                    <span className="ed-detail-value">{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection({ stats }: { stats: StatsData }) {
  return (
    <section className="ip-stats-wrap">
      <div className="ip-stats-box">
        <h2 className="ip-stats-heading">{stats.heading}</h2>
        <p className="ip-stats-subheading">{stats.subheading}</p>
        <div className={`ip-stats-grid ip-stats-grid-${stats.items.length}`}>
          {stats.items.map((item, i) => (
            <div key={i} className="ip-stats-item">
              <span className="ip-stats-value">{item.value}</span>
              <span className="ip-stats-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GallerySection({ gallery }: { gallery: EventDetailData['gallery'] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="ed-gallery-section">
      <div className="ed-gallery-inner">
        <h2 className="ip-section-heading ed-gallery-heading">{gallery.heading}</h2>
        <div className="ed-gallery-grid">
          {Array.from({ length: gallery.count }, (_, i) => (
            <div key={i} className="ed-gallery-img" onClick={() => setOpenIndex(i)} />
          ))}
        </div>
      </div>
      <Lightbox count={gallery.count} openIndex={openIndex} onClose={() => setOpenIndex(null)} />
    </section>
  )
}

export default function EventDetailPage({ lang, onToggleLang, data }: Props) {
  return (
    <main>
      <Nav lang={lang} onToggleLang={onToggleLang} />
      <section className="ed-hero">
        <div className="ed-hero-inner">
          {data.heroTitle && <h1 className="ed-hero-title">{data.heroTitle}</h1>}
          <div className="ed-hero-img-wrap" />
        </div>
      </section>
      {data.sections.map((s, i) => (
        <Fragment key={i}>
          {i > 0 && <Divider />}
          <ContentSection heading={s.heading} body={s.body} richBody={s.richBody} detailGrid={s.detailGrid} />
          {i === 0 && data.stats && <StatsSection stats={data.stats} />}
        </Fragment>
      ))}
      <Divider />
      <GallerySection gallery={data.gallery} />
      <Footer lang={lang} />
    </main>
  )
}
