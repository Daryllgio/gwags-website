'use client'
import { useState } from 'react'
import { Lang, t } from '@/lib/translations'
import InitiativePage from '@/components/InitiativePage'

export default function HealthOutreachPage() {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')
  const p = t[lang].healthOutreachPage

  return (
    <InitiativePage
      lang={lang}
      onToggleLang={toggleLang}
      data={{
        hero: p.hero,
        sections: p.sections,
        carousel: p.carousel,
      }}
    />
  )
}
