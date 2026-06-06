import { Lang, t } from '@/lib/translations'

interface LeadershipQuoteProps {
  lang: Lang
}

export default function LeadershipQuote({ lang }: LeadershipQuoteProps) {
  const q = t[lang].quote

  return (
    <section className="leadership-quote-section" style={{ background: '#0A1128', padding: '88px 28px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>

        <div style={{ color: '#D4AF37', fontSize: '64px', fontFamily: 'Georgia, serif', lineHeight: 0.8, marginBottom: '12px', opacity: 0.5 }}>
          &ldquo;
        </div>

        <p className="leadership-quote-text" style={{ color: '#fff', fontSize: '23px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.75, marginBottom: '40px', fontStyle: 'italic' }}>
          {q.text}
        </p>

        <div style={{ width: '40px', height: '0.5px', background: '#D4AF37', margin: '0 auto 28px' }} />

        {/* IMAGE: Replace this div with <Image src="/images/leadership/giovanny.jpg" alt="Daryll Giovanny Bikak Mbal" width={72} height={72} style={{ borderRadius: '50%', objectFit: 'cover' }} /> */}
        <div className="lq-circle" style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#0F1E3D', border: '2px solid rgba(212,175,55,0.3)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', letterSpacing: '0.05em' }}>DGB</span>
        </div>

        <div className="lq-name" style={{ color: '#D4AF37', fontSize: '18px', fontWeight: 500, letterSpacing: '0.08em', marginBottom: '6px' }}>
          {q.name}
        </div>
        <div className="lq-role" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', letterSpacing: '0.04em' }}>
          {q.role}
        </div>

      </div>
    </section>
  )
}
