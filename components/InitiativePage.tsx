'use client'
import { useRef } from 'react'
import Nav from '@/components/Nav'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { Lang } from '@/lib/translations'

export interface KeyDateItem {
  label: string
  date: string
}

export interface InitiativePageData {
  hero: {
    name: string
    goal: string
  }
  sections: Array<{
    heading: string
    body: string
  }>
  keyDates?: {
    heading: string
    batch: string
    items: KeyDateItem[]
  }
  apply?: string
  carousel: {
    heading: string
    subtitle?: string
    items: string[]
  }
}

interface Props {
  lang: Lang
  onToggleLang: () => void
  data: InitiativePageData
}

export default function InitiativePage({ lang, onToggleLang, data }: Props) {
  const carouselLight = !data.apply
  return (
    <main>
      <Nav lang={lang} onToggleLang={onToggleLang} />
      <HeroSection hero={data.hero} />
      {data.sections.map((s, i) => (
        <ContentSection key={i} heading={s.heading} body={s.body} alt={i % 2 !== 0} />
      ))}
      {data.keyDates && <KeyDatesSection keyDates={data.keyDates} />}
      {data.apply && <ApplySection label={data.apply} />}
      <CarouselSection carousel={data.carousel} light={carouselLight} />
      <CTA lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}

function HeroSection({ hero }: { hero: InitiativePageData['hero'] }) {
  return (
    <section className="ip-hero">
      <div className="ip-hero-img-wrap">
        {/* IMAGE: Replace background with <Image src="..." alt="..." fill style={{ objectFit: 'cover' }} /> */}
        <div className="ip-hero-img-gradient" />
        <div className="ip-hero-overlay">
          <h1 className="ip-hero-name">{hero.name}</h1>
          <p className="ip-hero-goal">{hero.goal}</p>
        </div>
      </div>
    </section>
  )
}

function ContentSection({ heading, body, alt }: { heading: string; body: string; alt: boolean }) {
  return (
    <section className={`ip-section ${alt ? 'ip-section-offwhite' : 'ip-section-white'}`}>
      <div className="ip-content-inner">
        <div className="ip-grid">
          <h2 className="ip-section-heading">{heading}</h2>
          <p className="ip-section-body">{body}</p>
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

function ApplySection({ label }: { label: string }) {
  return (
    <section className="ip-apply-section">
      {/* UPDATE: Replace "#" with Microsoft Form URL */}
      <a href="#" className="ip-apply-btn">{label}</a>
    </section>
  )
}

function CarouselSection({ carousel, light }: { carousel: InitiativePageData['carousel']; light: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollLeft() {
    trackRef.current?.scrollBy({ left: -280, behavior: 'smooth' })
  }

  function scrollRight() {
    trackRef.current?.scrollBy({ left: 280, behavior: 'smooth' })
  }

  return (
    <section className={`ip-carousel-section ${light ? 'ip-section-white' : 'ip-section-offwhite'}`}>
      <div className="ip-carousel-inner">
        <div className="ip-carousel-head-grid">
          <div>
            <h2 className="ip-section-heading">{carousel.heading}</h2>
            {carousel.subtitle && (
              <span className="ip-carousel-subtitle">{carousel.subtitle}</span>
            )}
          </div>
          <div />
        </div>
        <div className="ip-carousel-row">
          <button className="ip-arrow-btn" onClick={scrollLeft} aria-label="Scroll left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13 L5 8 L10 3" />
            </svg>
          </button>
          <div className="ip-carousel-overflow">
            <div className="ip-carousel-track" ref={trackRef}>
              {carousel.items.map((name, i) => (
                // UPDATE: Link to detail page when built
                <a key={i} href="#" className="ip-carousel-card">
                  <div className="ip-carousel-card-img" />
                  <div className="ip-carousel-card-name">{name}</div>
                </a>
              ))}
            </div>
          </div>
          <button className="ip-arrow-btn" onClick={scrollRight} aria-label="Scroll right">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3 L11 8 L6 13" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
