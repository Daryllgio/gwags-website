'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Lang, t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function OurRolePage() {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')

  return (
    <main>
      <Nav lang={lang} onToggleLang={toggleLang} />
      <HeroSection lang={lang} />
      <NarrativeSection lang={lang} />
      <VisionMissionSection lang={lang} />
      <ConvictionsSection lang={lang} />
      <LookingAheadSection lang={lang} />
      <CTASection lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}

/* ── Hero ── */
function HeroSection({ lang }: { lang: Lang }) {
  const p = t[lang].ourRole.hero
  return (
    <section className="or-hero">
      <div style={{ maxWidth: '760px' }}>
        <p className="eyebrow" style={{ color: '#0A1128', fontSize: '15px', letterSpacing: '0.22em', margin: '0 0 24px 0' }}>
          {p.eyebrow}
        </p>
        <h1 className="or-hero-h1" style={{ color: '#0A1128', fontSize: '46px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.18, margin: '0 0 28px 0' }}>
          {p.h1}
        </h1>
        <p className="body-text" style={{ color: 'rgba(10,17,40,0.7)', fontSize: '18px', lineHeight: 1.8, maxWidth: '600px', margin: 0 }}>
          {p.body}
        </p>
      </div>
    </section>
  )
}

/* ── Narrative ── */
function NarrativeSection({ lang }: { lang: Lang }) {
  const p = t[lang].ourRole.narrative
  return (
    <section className="or-narrative">
      <div className="or-narrative-inner">
        <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 500, margin: '0 0 24px 0', lineHeight: 1.25 }}>
          {p.section1.heading}
        </h2>
        {p.section1.paragraphs.map((para, i) => (
          <p key={i} className="body-text" style={{ fontSize: '18px', color: '#4A4A4A', lineHeight: 1.85, margin: i < p.section1.paragraphs.length - 1 ? '0 0 20px 0' : '0 0 64px 0' }}>
            {para}
          </p>
        ))}

        <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 500, margin: '0 0 24px 0', lineHeight: 1.25 }}>
          {p.section2.heading}
        </h2>
        {p.section2.paragraphs.map((para, i) => (
          <p key={i} className="body-text" style={{ fontSize: '18px', color: '#4A4A4A', lineHeight: 1.85, margin: i < p.section2.paragraphs.length - 1 ? '0 0 20px 0' : '0' }}>
            {para}
          </p>
        ))}
      </div>
    </section>
  )
}

/* ── Vision and Mission ── */
function VisionMissionSection({ lang }: { lang: Lang }) {
  const p = t[lang].ourRole.visionMission
  return (
    <section className="or-vm-section">
      <div className="or-vm-grid">
        <div className="or-vm-block">
          <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.2em', margin: '0 0 12px 0' }}>
            {p.vision.label}
          </p>
          <p style={{ fontSize: '20px', color: '#0A1128', fontFamily: 'Georgia, serif', fontWeight: 500, lineHeight: 1.6, margin: '0 0 16px 0' }}>
            {p.vision.main}
          </p>
          <p className="body-text" style={{ fontSize: '18px', color: '#4A4A4A', lineHeight: 1.8, margin: 0 }}>
            {p.vision.expansion}
          </p>
        </div>

        <div className="or-vm-block">
          <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.2em', margin: '0 0 12px 0' }}>
            {p.mission.label}
          </p>
          <p style={{ fontSize: '20px', color: '#0A1128', fontFamily: 'Georgia, serif', fontWeight: 500, lineHeight: 1.6, margin: '0 0 16px 0' }}>
            {p.mission.main}
          </p>
          <p className="body-text" style={{ fontSize: '18px', color: '#4A4A4A', lineHeight: 1.8, margin: 0 }}>
            {p.mission.expansion}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── Convictions ── */
function ConvictionsSection({ lang }: { lang: Lang }) {
  const p = t[lang].ourRole.convictions
  return (
    <section className="or-convictions">
      <div className="or-convictions-inner">
        <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', margin: '0 0 14px 0' }}>
          {p.eyebrow}
        </p>
        <h2 style={{ color: '#ffffff', fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 400, margin: '0 0 20px 0', lineHeight: 1.25 }}>
          {p.heading}
        </h2>
        <p className="body-text" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.85, margin: '0 0 40px 0' }}>
          {p.intro}
        </p>
        {p.items.map((item, i) => (
          <div key={i}>
            <h3 style={{ color: '#ffffff', fontSize: '22px', fontWeight: 600, marginTop: i === 0 ? 0 : '40px', marginBottom: '16px', fontFamily: 'inherit' }}>
              {item.heading}
            </h3>
            <p className="body-text" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.85, margin: 0 }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Looking Ahead ── */
function LookingAheadSection({ lang }: { lang: Lang }) {
  const p = t[lang].ourRole.lookingAhead
  return (
    <section className="or-ahead">
      <div className="or-ahead-inner">
        <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', margin: '0 0 14px 0' }}>
          {p.eyebrow}
        </p>
        <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 400, margin: '0 0 24px 0', lineHeight: 1.25 }}>
          {p.heading}
        </h2>
        {p.paragraphs.map((para, i) => (
          <p key={i} className="body-text" style={{ fontSize: '18px', color: '#4A4A4A', lineHeight: 1.85, margin: i < p.paragraphs.length - 1 ? '0 0 20px 0' : '0' }}>
            {para}
          </p>
        ))}
      </div>
    </section>
  )
}

/* ── CTA ── */
function CTASection({ lang }: { lang: Lang }) {
  const p = t[lang].ourRole.cta
  return (
    <section className="or-cta">
      <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '30px', fontWeight: 400, margin: '0 0 16px 0', lineHeight: 1.3 }}>
        {p.h2}
      </h2>
      <p className="body-text" style={{ color: 'rgba(10,17,40,0.65)', fontSize: '18px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.75 }}>
        {p.body}
      </p>
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/get-involved" className="or-cta-btn-dark">{p.btn1}</Link>
        <Link href="/about/how-we-work" className="or-cta-btn-outline">{p.btn2}</Link>
      </div>
    </section>
  )
}
