'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Lang, t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  IconSchool,
  IconSeedling,
  IconMedicalCross,
  IconHeart,
} from '@tabler/icons-react'

// Same icon set as the homepage Initiatives cards
const initiativeIcons = [IconSchool, IconSeedling, IconMedicalCross, IconHeart]

export default function HowWeWorkPage() {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')

  return (
    <main>
      <Nav lang={lang} onToggleLang={toggleLang} />
      <HeroSection lang={lang} />
      <SplitSection lang={lang} />
      <InitiativeStrip lang={lang} />
      <CoordinationSection lang={lang} />
      <WorkingWithSection lang={lang} />
      <CTASection lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}

/* ── Hero ── */
function HeroSection({ lang }: { lang: Lang }) {
  const p = t[lang].howWeWork.hero
  return (
    <section className="hww-hero-section" style={{ background: '#0A1128' }}>
      <div className="hww-hero-grid">
        <div className="hww-hero-text">
          <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.22em', margin: '0 0 24px 0' }}>
            {p.eyebrow}
          </p>
          <h1 className="hww-hero-h1" style={{ color: '#ffffff', fontSize: '42px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.18, margin: '0 0 28px 0' }}>
            {p.h1}
          </h1>
          <p className="body-text" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.8, margin: 0 }}>
            {p.body}
          </p>
        </div>
        {/* IMAGE: Replace the inner placeholder div with
            <img src="/images/how-we-work-hero.jpg" alt="How We Work" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> */}
        <div className="hww-hero-img" style={{ position: 'relative', width: '100%' }}>
          <div className="hww-hero-img-ph" style={{ position: 'absolute', inset: 0, background: '#0F1E3D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', letterSpacing: '0.12em' }}>Photo: How We Work</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Split Screen ── */
function SplitSection({ lang }: { lang: Lang }) {
  const p = t[lang].howWeWork.split
  return (
    <div className="hww-split">
      <div className="hww-split-left">
        <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.2em', margin: '0 0 16px 0' }}>
          {p.left.label}
        </p>
        <h2 style={{ color: '#ffffff', fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, margin: '0 0 20px 0', lineHeight: 1.3 }}>
          {p.left.heading}
        </h2>
        {p.left.body.map((para, i) => (
          <p key={i} className="body-text" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.85, margin: i < p.left.body.length - 1 ? '0 0 20px 0' : '0' }}>
            {para}
          </p>
        ))}
      </div>

      <div className="hww-split-right">
        <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.2em', margin: '0 0 16px 0' }}>
          {p.right.label}
        </p>
        <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, margin: '0 0 20px 0', lineHeight: 1.3 }}>
          {p.right.heading}
        </h2>
        {p.right.body.map((para, i) => (
          <p key={i} className="body-text" style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.85, margin: i < p.right.body.length - 1 ? '0 0 20px 0' : '0' }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}

/* ── Initiative Strip (cards match the homepage Initiatives design) ── */
const initiativeImagePlaceholders = [
  'Photo: Scholars Program',
  'Photo: Mbal Lekeaka Fund',
  'Photo: Health Outreach',
  'Photo: Youth Development',
]

function InitiativeStrip({ lang }: { lang: Lang }) {
  const p = t[lang].howWeWork.initiatives
  return (
    <section className="hww-init-strip" style={{ background: '#ffffff', padding: '55px 80px' }}>
      <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.22em', margin: '0 0 16px 0' }}>
        {p.eyebrow}
      </p>
      <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '34px', fontWeight: 400, margin: '0 0 40px 0', lineHeight: 1.25 }}>
        {p.h2}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="initiatives-grid">
        {p.items.map((item, i) => {
          const Icon = initiativeIcons[i]
          return (
            <Link
              key={i}
              href={item.href}
              className="initiative-card"
              style={{ display: 'flex', flexDirection: 'column', background: '#F7F6F3', border: '0.5px solid rgba(10,17,40,0.08)', borderRadius: '8px', textDecoration: 'none', cursor: 'pointer', overflow: 'hidden' }}
            >
              {/* IMAGE: Replace this placeholder with
                  <img src="/images/initiatives/[name].jpg" alt="..." style={{ width: '100%', height: '250px', objectFit: 'cover' }} /> */}
              <div className="ini-img-ph" style={{ height: '250px', width: '100%', background: '#E6E3DC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: 'rgba(10,17,40,0.35)', fontSize: '12px', letterSpacing: '0.1em' }}>
                  {initiativeImagePlaceholders[i]}
                </span>
              </div>
              <div className="ini-card-body" style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="ini-card-icon" style={{ marginBottom: '16px' }}>
                  <Icon size={24} color="#D4AF37" />
                </div>
                <div className="ini-card-title" style={{ color: '#0A1128', fontSize: '18px', fontWeight: 500, marginBottom: '12px', lineHeight: 1.35 }}>
                  {item.title}
                </div>
                <p className="body-text ini-card-desc" style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: 1.68, flex: 1, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

/* ── Coordination Model ── */
function CoordinationSection({ lang }: { lang: Lang }) {
  const p = t[lang].howWeWork.coordination
  return (
    <section className="hww-coordination-section" style={{ background: '#F7F6F3', padding: '80px' }}>
      <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.22em', margin: '0 0 16px 0' }}>
        {p.eyebrow}
      </p>
      <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '34px', fontWeight: 400, margin: '0 0 16px 0', lineHeight: 1.25 }}>
        {p.h2}
      </h2>
      <p className="body-text" style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.75, maxWidth: '650px', margin: '0 0 60px 0' }}>
        {p.intro}
      </p>

      <div className="hww-steps">
        {p.steps.map((step, i) => (
          <div key={i} className="hww-step">
            <div className="hww-step-num">{i + 1}</div>
            <div className="hww-step-line" />
            <div className="hww-step-content">
              <h3 className="hww-step-title" style={{ color: '#0A1128', fontSize: '18px', fontWeight: 600, margin: '0 0 12px 0', fontFamily: 'Georgia, serif' }}>
                {step.title}
              </h3>
              <p className="body-text hww-step-body" style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.8, margin: 0 }}>
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Working With Gwags ── */
function WorkingWithSection({ lang }: { lang: Lang }) {
  const p = t[lang].howWeWork.workingWith
  return (
    <section className="hww-working-with-section" style={{ background: '#0A1128', padding: '80px' }}>
      <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '16px', letterSpacing: '0.22em', margin: '0 0 16px 0' }}>
        {p.eyebrow}
      </p>
      <h2 style={{ color: '#ffffff', fontFamily: 'Georgia, serif', fontSize: '34px', fontWeight: 400, margin: '0 0 20px 0', lineHeight: 1.25 }}>
        {p.h2}
      </h2>
      <p className="body-text" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.75, maxWidth: '720px', margin: '0 0 48px 0' }}>
        {p.intro}
      </p>
      <div className="hww-cards-grid">
        {p.cards.map((card, i) => (
          <div key={i} className="hww-card">
            <h3 className="hww-card-title" style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, margin: '0 0 12px 0' }}>
              {card.title}
            </h3>
            <p className="body-text hww-card-desc" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', lineHeight: 1.75, margin: 0 }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── CTA ── */
function CTASection({ lang }: { lang: Lang }) {
  const p = t[lang].howWeWork.cta
  return (
    <section className="hww-cta">
      <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '34px', fontWeight: 400, margin: '0 0 16px 0', lineHeight: 1.3 }}>
        {p.h2}
      </h2>
      <p className="body-text" style={{ color: 'rgba(10,17,40,0.65)', fontSize: '18px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.75 }}>
        {p.body}
      </p>
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/get-involved" className="hww-cta-btn-dark">{p.btn1}</Link>
        <Link href="/get-involved" className="hww-cta-btn-outline">{p.btn2}</Link>
      </div>
    </section>
  )
}
