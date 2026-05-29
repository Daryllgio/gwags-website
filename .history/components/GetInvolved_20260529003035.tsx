import { Lang, t } from '@/lib/translations'
import { IconBuildingCommunity, IconHeartHandshake, IconBriefcase } from '@tabler/icons-react'

interface GetInvolvedProps {
  lang: Lang
}

const icons = [IconBuildingCommunity, IconHeartHandshake, IconBriefcase]

export default function GetInvolved({ lang }: GetInvolvedProps) {
  const g = t[lang].getInvolved

  return (
    <section style={{ background: '#ffffff', padding: '80px 28px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <p style={{ color: '#D4AF37', fontSize: '15px', letterSpacing: '0.22em', marginBottom: '14px' }}>
          {g.eyebrow}
        </p>
        <h2 style={{ color: '#0A1128', fontSize: '34px', fontWeight: 400, fontFamily: 'Georgia, serif', lineHeight: 1.25, maxWidth: '500px', marginBottom: '14px' }}>
          {g.h2}
        </h2>
        <p style={{ color: '#4A4A4A', fontSize: '18px', lineHeight: 1.75, maxWidth: '500px', marginBottom: '52px' }}>
          {g.body}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="getinvolved-grid">
          {g.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                style={{
                  background: '#F7F6F3',
                  border: '0.5px solid rgba(10,17,40,0.1)',
                  borderRadius: '6px',
                  padding: '36px 24px 32px',
                  textAlign: 'center',
                }}
              >
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  <Icon size={28} color="#D4AF37" />
                </div>
                <div style={{ color: '#0A1128', fontSize: '18px', fontWeight: 500, marginBottom: '10px' }}>
                  {item.title}
                </div>
                <p style={{ color: '#5A5A5A', fontSize: '17px', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>

    </section>
  )
}
