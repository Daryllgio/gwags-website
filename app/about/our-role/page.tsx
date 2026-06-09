'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Lang, t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import InteractiveGlobe from '@/components/InteractiveGlobe'

export default function OurRolePage() {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')

  return (
    <main>
      <Nav lang={lang} onToggleLang={toggleLang} />
      <HeroSection lang={lang} />
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
        <p className="eyebrow" style={{ color: '#0A1128', fontSize: '16px', letterSpacing: '0.22em', margin: '0 0 24px 0' }}>
          {p.eyebrow}
        </p>
        <h1 className="or-hero-h1" style={{ color: '#0A1128', fontSize: '42px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.18, margin: '0 0 28px 0' }}>
          {p.h1}
        </h1>
        <p className="body-text" style={{ color: '#0A1128', fontSize: '18px', lineHeight: 1.8, maxWidth: '600px', margin: 0 }}>
          {p.body}
        </p>
      </div>

      {/* IMAGE: Replace the div below with:
          <img src="/images/our-role.jpg" alt="Our Role" className="or-hero-img" style={{ display: 'block', width: '100%', height: '650px', objectFit: 'cover', borderRadius: '16px', margin: '60px auto 0' }} /> */}
      <div className="or-hero-img" style={{ width: '100%', height: '650px', borderRadius: '16px', background: 'rgba(0,0,0,0.15)', margin: '60px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'rgba(0,0,0,0.3)', fontSize: '13px', letterSpacing: '0.1em' }}>Photo: Our Role</span>
      </div>
    </section>
  )
}

/* ── Vision and Mission ── */
function VisionMissionSection({ lang }: { lang: Lang }) {
  const p = t[lang].ourRole.visionMission
  return (
    <section id="vision-mission" className="or-vm-section">
      <div className="or-vm-grid">
        <div className="or-vm-block">
          <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.2em', margin: '0 0 12px 0' }}>
            {p.vision.label}
          </p>
          <p className="or-vm-main" style={{ fontSize: '19px', color: '#0A1128', fontFamily: 'Georgia, serif', fontWeight: 500, lineHeight: 1.6, margin: '0 0 16px 0' }}>
            {p.vision.main}
          </p>
          <p className="body-text" style={{ fontSize: '18px', color: '#4A4A4A', lineHeight: 1.8, margin: 0 }}>
            {p.vision.expansion}
          </p>
        </div>

        <div className="or-vm-block">
          <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.2em', margin: '0 0 12px 0' }}>
            {p.mission.label}
          </p>
          <p className="or-vm-main" style={{ fontSize: '19px', color: '#0A1128', fontFamily: 'Georgia, serif', fontWeight: 500, lineHeight: 1.6, margin: '0 0 16px 0' }}>
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
        <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.22em', margin: '0 0 14px 0' }}>
          {p.eyebrow}
        </p>
        <h2 style={{ color: '#ffffff', fontFamily: 'Georgia, serif', fontSize: '34px', fontWeight: 400, margin: '0 0 20px 0', lineHeight: 1.25 }}>
          {p.heading}
        </h2>
        {p.intro && (
          <p className="body-text" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.85, margin: '0 0 40px 0' }}>
            {p.intro}
          </p>
        )}
        {p.items.map((item, i) => (
          <div key={i}>
            <h3 className="or-conviction-title" style={{ color: '#ffffff', fontSize: '19px', fontWeight: 600, marginTop: i === 0 ? '32px' : '40px', marginBottom: '16px', fontFamily: 'inherit' }}>
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
      <div className="or-ahead-grid">
        {/* Left column: text */}
        <div className="or-ahead-text">
          <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.22em', margin: '0 0 14px 0' }}>
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

        {/* Right column: globe */}
        <div className="or-ahead-globe">
          <InteractiveGlobe />
        </div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function CTASection({ lang }: { lang: Lang }) {
  const p = t[lang].ourRole.cta
  return (
    <section className="or-cta">
      <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '34px', fontWeight: 400, margin: '0 0 16px 0', lineHeight: 1.3 }}>
        {p.h2}
      </h2>
      <p className="body-text" style={{ color: 'rgba(10,17,40,0.65)', fontSize: '18px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.75 }}>
        {p.body}
      </p>
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/get-involved" className="or-cta-btn-dark">{p.btn1}</Link>
        <Link href="/get-involved" className="or-cta-btn-outline">{p.btn2}</Link>
      </div>
    </section>
  )
}
