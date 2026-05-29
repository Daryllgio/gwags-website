import { Lang, t } from '@/lib/translations'

interface LeadershipQuoteProps {
  lang: Lang
}

export default function LeadershipQuote({ lang }: LeadershipQuoteProps) {
  const q = t[lang].quote

  return (
    <section style={{ background: '#0A1128', padding: '88px 28px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>

        <div style={{ color: '#D4AF37', fontSize: '64px', fontFamily: 'Georgia, serif', lineHeight: 0.8, marginBottom: '32px', opacity: 0.5 }}>
          &ldquo;
        </div>

        <p style={{ color: '#fff', fontSize: '20px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.75, marginBottom: '40px', fontStyle: 'italic' }}>
          {q.text}
        </p>

        <div style={{ width: '40px', height: '0.5px', background: '#D4AF37', margin: '0 auto 28px' }} />

        <div style={{ color: '#D4AF37', fontSize: '14px', fontWeight: 500, letterSpacing: '0.08em', marginBottom: '6px' }}>
          {q.name}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', letterSpacing: '0.04em' }}>
          {q.role}
        </div>

      </div>
    </section>
  )
}