'use client'
import { useLang } from '@/lib/useLang'
import { Lang, t } from '@/lib/translations'
import InitiativePage from '@/components/InitiativePage'

export default function ScholarsPage() {
  const [lang, toggleLang] = useLang()
  const p = t[lang].scholarsPage

  return (
    <InitiativePage
      lang={lang}
      onToggleLang={toggleLang}
      data={{
        hero: p.hero,
        sections: p.sections,
        keyDates: p.keyDates,
        apply: p.apply,
        carousel: p.carousel,
      }}
    />
  )
}
