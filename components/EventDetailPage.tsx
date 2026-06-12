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
}

export interface EventDetailData {
  sections: EventSection[]
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

function ContentSection({ heading, body, richBody }: EventSection) {
  return (
    <section className="ip-section ip-section-white">
      <div className="ip-content-inner">
        <div className="ip-grid">
          <h2 className="ip-section-heading">{heading}</h2>
          <div>
            {body && <p className="ip-section-body">{body}</p>}
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
          </div>
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
      <div className="ed-hero-img-wrap" />
      {data.sections.map((s, i) => (
        <Fragment key={i}>
          {i > 0 && <Divider />}
          <ContentSection heading={s.heading} body={s.body} richBody={s.richBody} />
        </Fragment>
      ))}
      <Divider />
      <GallerySection gallery={data.gallery} />
      <Footer lang={lang} />
    </main>
  )
}
