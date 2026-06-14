'use client'
import { useLang } from '@/lib/useLang'
import { Lang, t } from '@/lib/translations'
import InitiativePage from '@/components/InitiativePage'

export default function MbalLekeakaPage() {
  const [lang, toggleLang] = useLang()
  const p = t[lang].mbalLekeakaPage

  return (
    <InitiativePage
      lang={lang}
      onToggleLang={toggleLang}
      data={{
        hero: p.hero,
        sections: p.sections,
        apply: p.apply,
        carousel: p.carousel,
      }}
    />
  )
}
