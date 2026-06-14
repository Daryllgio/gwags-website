'use client'
import { useLang } from '@/lib/useLang'
import Link from 'next/link'
import { t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function GetInvolvedPage() {
  const [lang, toggleLang] = useLang()
  const p = t[lang].getInvolvedPage

  return (
    <main>
      <Nav lang={lang} onToggleLang={toggleLang} />

      {/* Hero */}
      <section className="gi-hero">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', marginBottom: '14px' }}>
            {p.hero.eyebrow}
          </p>
          <h1 className="gi-hero-h1" style={{ color: '#fff', fontSize: '42px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '24px', maxWidth: '600px' }}>
            {p.hero.h1}
          </h1>
          <p className="body-text" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.8, maxWidth: '550px', margin: 0 }}>
            {p.hero.body}
          </p>
        </div>
      </section>

      {/* Partner with us */}
      <section style={{ background: '#F7F6F3', padding: '80px 28px' }} className="gi-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', marginBottom: '14px' }}>
            {p.partner.eyebrow}
          </p>
          <h2 style={{ color: '#0A1128', fontSize: '30px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.3, marginBottom: '24px', maxWidth: '700px' }}>
            {p.partner.heading}
          </h2>
          <p className="body-text" style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.85, maxWidth: '700px', marginBottom: '28px' }}>
            {p.partner.body}
          </p>
          {/* TODO: Link to partner interest form when ready */}
          <a href="#contact" style={{ color: '#D4AF37', fontSize: '15px', fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'rgba(212,175,55,0.5)', textUnderlineOffset: '3px', cursor: 'pointer' }}>
            {p.partner.cta}
          </a>
        </div>
      </section>

      {/* Support our work */}
      <section style={{ background: '#ffffff', padding: '80px 28px' }} className="gi-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', marginBottom: '14px' }}>
            {p.support.eyebrow}
          </p>
          <h2 style={{ color: '#0A1128', fontSize: '30px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.3, marginBottom: '24px', maxWidth: '700px' }}>
            {p.support.heading}
          </h2>
          <p className="body-text" style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.85, maxWidth: '700px', marginBottom: '28px' }}>
            {p.support.body}
          </p>
          {/* TODO: Link to donation/support form when ready */}
          <a href="#contact" style={{ color: '#D4AF37', fontSize: '15px', fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'rgba(212,175,55,0.5)', textUnderlineOffset: '3px', cursor: 'pointer' }}>
            {p.support.cta}
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ background: '#F7F6F3', padding: '80px 28px' }} className="gi-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', marginBottom: '14px' }}>
            {p.contact.eyebrow}
          </p>
          <h2 style={{ color: '#0A1128', fontSize: '30px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.3, marginBottom: '24px', maxWidth: '700px' }}>
            {p.contact.heading}
          </h2>
          <p className="body-text" style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.85, maxWidth: '700px', marginBottom: '28px' }}>
            {p.contact.body}
          </p>
          {/* Update the email in translations.ts (getInvolvedPage.contact.email) when the real address is ready */}
          <a
            href={`mailto:${p.contact.email}`}
            className="gi-contact-email"
            style={{ color: '#D4AF37', fontSize: '20px', fontWeight: 500, textDecoration: 'none', display: 'block', marginBottom: '16px' }}
          >
            {p.contact.email}
          </a>
          <p style={{ color: '#4A4A4A', fontSize: '15px', margin: 0 }}>
            {p.contact.responseTime}
          </p>
        </div>
      </section>

      {/* Gold CTA */}
      <section style={{ background: '#D4AF37', padding: '80px 28px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: '#0A1128', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, marginBottom: '20px' }}>
            {p.cta.h2}
          </h2>
          <p className="body-text" style={{ color: 'rgba(10,17,40,0.75)', fontSize: '18px', lineHeight: 1.75, marginBottom: '36px' }}>
            {p.cta.body}
          </p>
          <Link
            href="/"
            style={{ display: 'inline-block', background: '#0A1128', color: '#ffffff', fontSize: '14px', fontWeight: 500, padding: '14px 32px', borderRadius: '3px', textDecoration: 'none', letterSpacing: '0.06em' }}
          >
            {p.cta.btn}
          </Link>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  )
}
