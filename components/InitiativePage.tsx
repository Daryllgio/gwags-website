'use client'
import { useRef, useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Lightbox from '@/components/Lightbox'
import { Lang } from '@/lib/translations'

interface RichBodyItem {
  label: string
  text: string
}

export interface KeyDateItem {
  label: string
  date: string
}

export interface CarouselEvent {
  label: string
  href: string
  items: string[]
}

export interface StatItem {
  value: string
  label: string
}

export interface InitiativePageData {
  hero: {
    name: string
    goal: string
  }
  sections: Array<{
    heading: string
    body?: string
    richBody?: RichBodyItem[]
  }>
  keyDates?: {
    heading: string
    batch: string
    items: KeyDateItem[]
  }
  stats?: {
    heading: string
    subheading: string
    items: StatItem[]
  }
  apply?: string
  carousel: {
    heading: string
    events: CarouselEvent[]
  }
}

interface Props {
  lang: Lang
  onToggleLang: () => void
  data: InitiativePageData
}

export default function InitiativePage({ lang, onToggleLang, data }: Props) {
  return (
    <main>
      <Nav lang={lang} onToggleLang={onToggleLang} />
      <HeroSection hero={data.hero} />
      {data.sections.map((s, i) => (
        <Fragment key={i}>
          {i > 0 && <Divider />}
          <ContentSection heading={s.heading} body={s.body} richBody={s.richBody} />
        </Fragment>
      ))}
      {data.keyDates && (
        <>
          <Divider />
          <KeyDatesSection keyDates={data.keyDates} />
        </>
      )}
      {data.stats && <StatsSection stats={data.stats} />}
      {data.apply && <ApplySection label={data.apply} />}
      {!data.stats && <Divider />}
      <CarouselSection carousel={data.carousel} />
      <Footer lang={lang} />
    </main>
  )
}

function HeroSection({ hero }: { hero: InitiativePageData['hero'] }) {
  return (
    <section className="ip-hero">
      <div className="ip-hero-inner">
        <div className="ip-hero-text">
          <h1 className="ip-hero-name">{hero.name}</h1>
          <span className="ip-hero-goal-label">The goal</span>
          <p className="ip-hero-goal">{hero.goal}</p>
        </div>
        <div className="ip-hero-img-wrap">
          {/* IMAGE: Replace background with <Image src="..." alt="..." fill style={{ objectFit: 'cover', borderRadius: '12px' }} /> */}
        </div>
      </div>
    </section>
  )
}

function Divider() {
  return <div className="ip-divider" />
}

function ContentSection({ heading, body, richBody }: {
  heading: string
  body?: string
  richBody?: RichBodyItem[]
}) {
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
          </div>
        </div>
      </div>
    </section>
  )
}

function KeyDatesSection({ keyDates }: { keyDates: NonNullable<InitiativePageData['keyDates']> }) {
  return (
    <section className="ip-section ip-section-white">
      <div className="ip-content-inner">
        <div className="ip-grid">
          <div>
            <h2 className="ip-section-heading">{keyDates.heading}</h2>
            <span className="ip-section-batch">{keyDates.batch}</span>
          </div>
          <ul className="ip-dates-list">
            {keyDates.items.map((item, i) => (
              <li key={i} className="ip-dates-row">
                <span className="ip-dates-label">{item.label}</span>
                <span className="ip-dates-val">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function StatsSection({ stats }: { stats: NonNullable<InitiativePageData['stats']> }) {
  return (
    <section className="ip-stats-wrap">
      <div className="ip-stats-box">
        <h2 className="ip-stats-heading">{stats.heading}</h2>
        <p className="ip-stats-subheading">{stats.subheading}</p>
        <div className="ip-stats-grid">
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

function ApplySection({ label }: { label: string }) {
  return (
    <section className="ip-apply-section">
      {/* UPDATE: Replace "#" with Microsoft Form URL */}
      <a href="#" className="ip-apply-btn">{label}</a>
    </section>
  )
}

function CarouselSection({ carousel }: { carousel: InitiativePageData['carousel'] }) {
  const [lbEvent, setLbEvent] = useState<number | null>(null)
  const [lbIndex, setLbIndex] = useState<number | null>(null)

  function openLightbox(eventIdx: number, imgIdx: number) {
    setLbEvent(eventIdx)
    setLbIndex(imgIdx)
  }

  function closeLightbox() {
    setLbEvent(null)
    setLbIndex(null)
  }

  const activeEvent = lbEvent !== null ? carousel.events[lbEvent] : null

  return (
    <section className="ip-carousel-section ip-section-white">
      <div className="ip-carousel-inner">
        <h2 className="ip-section-heading ip-carousel-heading">{carousel.heading}</h2>
        {carousel.events.map((event, i) => (
          <div key={i} className={i > 0 ? 'ip-event-track-gap' : undefined}>
            <EventTrack event={event} onImageClick={(idx) => openLightbox(i, idx)} />
          </div>
        ))}
      </div>
      {activeEvent && (
        <Lightbox
          count={activeEvent.items.length}
          openIndex={lbIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  )
}

function EventTrack({ event, onImageClick }: { event: CarouselEvent; onImageClick: (i: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    function check() {
      if (!el) return
      const maxScroll = el.scrollWidth - el.clientWidth
      setAtStart(el.scrollLeft <= 0)
      setAtEnd(maxScroll <= 1 || el.scrollLeft >= maxScroll - 1)
    }
    check()
    el.addEventListener('scroll', check, { passive: true })
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', check)
      ro.disconnect()
    }
  }, [])

  function scrollLeft() {
    trackRef.current?.scrollBy({ left: -260, behavior: 'smooth' })
  }

  function scrollRight() {
    trackRef.current?.scrollBy({ left: 260, behavior: 'smooth' })
  }

  return (
    <>
      <div className="ip-batch-row">
        <Link href={event.href} className="ip-batch-link">
          {event.label}
        </Link>
        <div className="ip-batch-arrows">
          <button
            className="ip-chevron-btn"
            onClick={atStart ? undefined : scrollLeft}
            aria-label="Scroll left"
            style={{ opacity: atStart ? 0.3 : 1, cursor: atStart ? 'default' : 'pointer' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19 L9 12 L15 5" />
            </svg>
          </button>
          <button
            className="ip-chevron-btn"
            onClick={atEnd ? undefined : scrollRight}
            aria-label="Scroll right"
            style={{ opacity: atEnd ? 0.3 : 1, cursor: atEnd ? 'default' : 'pointer' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5 L15 12 L9 19" />
            </svg>
          </button>
        </div>
      </div>
      <div className="ip-carousel-track" ref={trackRef}>
        {event.items.map((_, i) => (
          <div key={i} className="ip-carousel-card" onClick={() => onImageClick(i)}>
            <div className="ip-carousel-card-img" />
          </div>
        ))}
      </div>
    </>
  )
}
