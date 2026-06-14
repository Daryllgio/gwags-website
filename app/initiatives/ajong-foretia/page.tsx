'use client'
import { useLang } from '@/lib/useLang'
import { Lang, t } from '@/lib/translations'
import InitiativePage from '@/components/InitiativePage'

export default function AjongForetiasPage() {
  const [lang, toggleLang] = useLang()
  const p = t[lang].ajongForetiasPage

  return (
    <InitiativePage
      lang={lang}
      onToggleLang={toggleLang}
      data={{
        hero: p.hero,
        sections: p.sections,
        stats: p.stats,
        carousel: p.carousel,
      }}
    />
  )
}
