'use client'
import { useState, useEffect, useRef, Fragment } from 'react'
import Link from 'next/link'
import { Lang, t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function OurStoryPage() {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')

  return (
    <main>
      <Nav lang={lang} onToggleLang={toggleLang} />
      <HeroSection lang={lang} />
      <PhotoBanner lang={lang} />
      <NarrativeSection lang={lang} />
      <TimelineSection lang={lang} />
      <ClosingSection lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}

/* ── Hero ── */
function HeroSection({ lang }: { lang: Lang }) {
  const p = t[lang].ourStoryPage
  return (
    <section className="os-hero-section" style={{ background: '#ffffff', padding: '100px 28px 92px', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.25em', marginBottom: '24px' }}>
          {p.hero.eyebrow}
        </p>
        <h1 className="hero-h1 os-hero-h1" style={{ color: '#0A1128', fontSize: '42px', fontWeight: 400, lineHeight: 1.18, fontFamily: 'Georgia, serif', margin: 0 }}>
          {p.hero.h1}
        </h1>
      </div>
    </section>
  )
}

/* ── Photo Banner ── */
function PhotoBanner({ lang }: { lang: Lang }) {
  const p = t[lang].ourStoryPage
  return (
    <div className="os-photo-banner" style={{ height: '750px', background: '#1a2a44', borderTop: '2px solid #D4AF37', borderBottom: '2px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '13px', letterSpacing: '0.22em', position: 'relative', overflow: 'hidden' }}>
      {/* IMAGE: Replace this placeholder with <Image src="/images/our-story-hero.jpg" alt="Our Story" fill style={{ objectFit: 'cover' }} /> */}
      {p.photoBanner}
    </div>
  )
}

/* ── Narrative ── */
function NarrativeSection({ lang }: { lang: Lang }) {
  const p = t[lang].ourStoryPage
  return (
    <section className="os-narrative" style={{ background: '#fff', padding: '88px 28px 96px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {p.narrative.map((para, i) => (
          <Fragment key={i}>
            {p.narrativeHeadings[i] && (
              <h3 className="os-narrative-h3" style={{ fontSize: '24px', fontWeight: 500, color: '#0A1128', marginTop: '25px', marginBottom: '11px', fontFamily: 'Georgia, serif' }}>
                {p.narrativeHeadings[i]}
              </h3>
            )}
            <p
              className={i === 0 ? 'narrative-drop-cap body-text' : 'body-text'}
              style={{ fontSize: '18px', lineHeight: 1.85, color: '#4A4A4A', marginTop: 0, marginBottom: i < p.narrative.length - 1 ? '15px' : 0 }}
            >
              {para}
            </p>
          </Fragment>
        ))}
      </div>
    </section>
  )
}

/* ── Timeline v2 ── */
function TimelineSection({ lang }: { lang: Lang }) {
  const p = t[lang].ourStoryPage
  const entries = p.timeline.entries
  const [activeSet, setActiveSet] = useState<Set<number>>(new Set())
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])

  const years = Array.from(new Set(entries.map(e => e.year)))

  useEffect(() => {
    const refs = entryRefs.current
    const observers: IntersectionObserver[] = []

    refs.forEach((ref, i) => {
      if (!ref) return
      const obs = new IntersectionObserver(
        ([oe]) => {
          if (oe.isIntersecting) {
            setActiveSet(prev => { const next = new Set(prev); next.add(i); return next })
          }
        },
        { threshold: 0.4, rootMargin: '-15% 0px -15% 0px' }
      )
      obs.observe(ref)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="tl2-section">
      <div className="tl2-header">
        <p className="tl2-eyebrow eyebrow">{p.timeline.eyebrow}</p>
        <h2 className="tl2-h2">{p.timeline.h2}</h2>
      </div>

      <div className="tl2-timeline-body">
        {years.map(year => {
          const yearEntries = entries.filter(e => e.year === year)
          const firstIdx = entries.findIndex(e => e.year === year)
          const isYearActive = activeSet.has(firstIdx)

          return (
            <div key={year} className="tl2-year-group">
              <div className="tl2-year-header">
                <div className="tl2-year-left-col">
                  <div className={`tl2-year-num${isYearActive ? ' active' : ''}`}>{year}</div>
                </div>
              </div>

              {yearEntries.map((entry, j) => {
                const globalIdx = firstIdx + j
                const isActive = activeSet.has(globalIdx)

                return (
                  <div
                    key={globalIdx}
                    ref={el => { entryRefs.current[globalIdx] = el }}
                    className={`tl2-event${isActive ? ' active' : ''}`}
                  >
                    <div className="tl2-left-col">
                      <div className={`tl2-month-text${isActive ? ' active' : ''}`}>{entry.month}</div>
                    </div>

                    <div className="tl2-content-spacer" />

                    <div className="tl2-content">
                      <h3 className="tl2-title">{entry.title}</h3>
                      <p className={`tl2-body body-text${isActive ? ' active' : ''}`}>{entry.body}</p>
                    </div>

                    <div className="tl2-image-col">
                      {entry.photo ? (
                        <div className={`tl2-image-ph${isActive ? ' active' : ''}`}>
                          {/* IMAGE: Replace placeholder with <Image src="/images/[slug].jpg" alt="..." fill style={{objectFit:'cover',borderRadius:'8px'}} /> */}
                          <span className="tl2-image-label">{entry.photo}</span>
                        </div>
                      ) : (
                        <div className="tl2-image-empty" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ── Closing CTA ── */
function ClosingSection({ lang }: { lang: Lang }) {
  const p = t[lang].ourStoryPage
  return (
    <section className="os-closing" style={{ background: '#0A1128', padding: '96px 28px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '20px', marginTop: 0 }}>
          {p.closing.h2}
        </h2>
        <p className="body-text" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '18px', lineHeight: 1.78, marginBottom: '40px', marginTop: 0 }}>
          {p.closing.body}
        </p>
        <Link
          href="/get-involved"
          style={{ display: 'inline-block', background: '#D4AF37', color: '#0A1128', fontSize: '14px', fontWeight: 500, padding: '14px 36px', borderRadius: '3px', cursor: 'pointer', letterSpacing: '0.06em', textDecoration: 'none' }}
        >
          {p.closing.btn}
        </Link>
      </div>
    </section>
  )
}
