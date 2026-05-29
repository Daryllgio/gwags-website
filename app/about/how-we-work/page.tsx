'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Lang, t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  IconAward,
  IconHeartHandshake,
  IconActivity,
  IconUsers,
} from '@tabler/icons-react'

const initiativeIcons = [IconAward, IconHeartHandshake, IconActivity, IconUsers]

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
    <section className="hww-hero-section" style={{ background: '#0A1128', padding: '80px 100px' }}>
      <div style={{ maxWidth: '760px' }}>
        <p style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', margin: '0 0 24px 0' }}>
          {p.eyebrow}
        </p>
        <h1 className="hww-hero-h1" style={{ color: '#ffffff', fontSize: '46px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.18, margin: '0 0 28px 0' }}>
          {p.h1}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.8, maxWidth: '600px', margin: 0 }}>
          {p.body}
        </p>
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
        <p style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.2em', margin: '0 0 16px 0' }}>
          {p.left.label}
        </p>
        <h2 style={{ color: '#ffffff', fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, margin: '0 0 20px 0', lineHeight: 1.3 }}>
          {p.left.heading}
        </h2>
        {p.left.body.map((para, i) => (
          <p key={i} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.85, margin: i < p.left.body.length - 1 ? '0 0 20px 0' : '0' }}>
            {para}
          </p>
        ))}
      </div>

      <div className="hww-split-right">
        <p style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.2em', margin: '0 0 16px 0' }}>
          {p.right.label}
        </p>
        <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, margin: '0 0 20px 0', lineHeight: 1.3 }}>
          {p.right.heading}
        </h2>
        {p.right.body.map((para, i) => (
          <p key={i} style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.85, margin: i < p.right.body.length - 1 ? '0 0 20px 0' : '0' }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}

/* ── Initiative Strip ── */
function InitiativeStrip({ lang }: { lang: Lang }) {
  const p = t[lang].howWeWork.initiatives
  return (
    <section className="hww-init-strip" style={{ background: '#ffffff', padding: '60px 80px' }}>
      <p style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', margin: '0 0 16px 0' }}>
        {p.eyebrow}
      </p>
      <div className="hww-init-grid">
        {p.items.map((item, i) => {
          const Icon = initiativeIcons[i]
          return (
            <Link key={i} href={item.href} className="hww-init-card">
              <div style={{ marginBottom: '12px' }}>
                <Icon size={22} color="#D4AF37" />
              </div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A1128', marginBottom: '6px' }}>
                {item.title}
              </div>
              <p style={{ fontSize: '15px', color: '#5A5A5A', margin: 0, lineHeight: 1.55 }}>
                {item.desc}
              </p>
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
      <p style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', margin: '0 0 16px 0' }}>
        {p.eyebrow}
      </p>
      <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 400, margin: '0 0 16px 0', lineHeight: 1.25 }}>
        {p.h2}
      </h2>
      <p style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.75, maxWidth: '650px', margin: '0 0 60px 0' }}>
        {p.intro}
      </p>

      <div className="hww-steps">
        {p.steps.map((step, i) => (
          <div key={i} className="hww-step">
            <div className="hww-step-num">{i + 1}</div>
            <div className="hww-step-line" />
            <div className="hww-step-content">
              <h3 style={{ color: '#0A1128', fontSize: '20px', fontWeight: 600, margin: '0 0 12px 0', fontFamily: 'Georgia, serif' }}>
                {step.title}
              </h3>
              <p style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.8, margin: 0 }}>
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
      <p style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', margin: '0 0 16px 0' }}>
        {p.eyebrow}
      </p>
      <h2 style={{ color: '#ffffff', fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 400, margin: '0 0 48px 0', lineHeight: 1.25 }}>
        {p.h2}
      </h2>
      <div className="hww-cards-grid">
        {p.cards.map((card, i) => (
          <div key={i} className="hww-card">
            <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, margin: '0 0 12px 0' }}>
              {card.title}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.75, margin: 0 }}>
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
      <h2 style={{ color: '#0A1128', fontFamily: 'Georgia, serif', fontSize: '30px', fontWeight: 400, margin: '0 0 16px 0', lineHeight: 1.3 }}>
        {p.h2}
      </h2>
      <p style={{ color: 'rgba(10,17,40,0.65)', fontSize: '18px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.75 }}>
        {p.body}
      </p>
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="hww-cta-btn-dark">{p.btn1}</button>
        <button className="hww-cta-btn-outline">{p.btn2}</button>
      </div>
    </section>
  )
}
