'use client'
import Link from 'next/link'
import { useLang } from '@/lib/useLang'
import { t } from '@/lib/translations'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const NAVY = '#0A1128'

export default function ManageLinkInvalidPage() {
  const [lang, toggleLang] = useLang()
  const p = t[lang].manageLinkInvalidPage

  return (
    <main style={{ background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Nav lang={lang} onToggleLang={toggleLang} />

      <div
        className="mli-container"
        style={{ maxWidth: '640px', margin: '0 auto', padding: '96px 28px', textAlign: 'center' }}
      >
        <div
          aria-hidden="true"
          style={{
            width: '64px', height: '64px', margin: '0 auto 32px',
            borderRadius: '50%', background: 'rgba(10,17,40,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5" />
            <path d="M12 16h.01" />
          </svg>
        </div>

        <h1
          className="mli-title"
          style={{ color: NAVY, fontSize: '32px', fontWeight: 600, fontFamily: 'var(--font-heading-serif), Georgia, serif', lineHeight: 1.2, margin: '0 0 20px' }}
        >
          {p.title}
        </h1>

        <p
          className="mli-desc body-text"
          style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: 1.8, margin: '0 auto 40px', maxWidth: '520px' }}
        >
          {p.description}
        </p>

        <div
          className="mli-actions"
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            href="/get-involved?action=manage"
            className="mli-btn-primary"
            style={{
              display: 'inline-block', background: NAVY, color: '#ffffff',
              fontSize: '16px', fontWeight: 600, padding: '14px 32px',
              borderRadius: '6px', textDecoration: 'none',
            }}
          >
            {p.primaryBtn}
          </Link>
          <Link
            href="/get-involved"
            className="mli-btn-secondary"
            style={{
              display: 'inline-block', background: 'none', color: NAVY,
              fontSize: '16px', fontWeight: 500, padding: '13px 30px',
              borderRadius: '6px', border: `1.5px solid ${NAVY}`, textDecoration: 'none',
            }}
          >
            {p.secondaryBtn}
          </Link>
        </div>
      </div>

      <Footer lang={lang} />
    </main>
  )
}
