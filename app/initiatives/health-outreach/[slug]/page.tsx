'use client'
import { useLang } from '@/lib/useLang'
import EventDetailPage from '@/components/EventDetailPage'
import { healthOutreachEvents as content } from '@/lib/healthOutreachEvents'

export default function HealthEventPage({ params }: { params: { slug: string } }) {
  const [lang, toggleLang] = useLang()
  const page = content[params.slug]
  if (!page) return null
  return <EventDetailPage lang={lang} onToggleLang={toggleLang} data={page[lang]} />
}
