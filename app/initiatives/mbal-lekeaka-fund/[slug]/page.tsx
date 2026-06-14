'use client'
import { useState } from 'react'
import { Lang } from '@/lib/translations'
import EventDetailPage, { EventDetailData } from '@/components/EventDetailPage'

const content: Record<string, Record<Lang, EventDetailData>> = {
  'camesa-nguti-health-campaign': {
    en: {
      heroTitle: 'CAMESA Nguti Health Campaign',
      sections: [
        {
          heading: 'About the campaign',
          body: 'The CAMESA Nguti Health Campaign is the first initiative funded through the Mbal Lekeaka Fund. The campaign brings together medical professionals and community health workers to deliver free healthcare services to underserved communities in the Nguti area. The initiative is organized and delivered by CAMESA, with funding and institutional support provided by Gwags through the Mbal Lekeaka Fund.',
        },
        {
          heading: 'Campaign details',
          richBody: [
            { label: 'Location', text: 'Nguti, Cameroon' },
            { label: 'Partner', text: 'CAMESA' },
            { label: 'Status', text: 'Placeholder' },
            { label: 'People reached', text: 'Placeholder' },
          ],
        },
      ],
      gallery: { heading: 'Gallery', count: 10 },
    },
    fr: {
      heroTitle: 'Campagne de Santé CAMESA Nguti',
      sections: [
        {
          heading: 'À propos de la campagne',
          body: 'La Campagne de Santé CAMESA Nguti est la première initiative financée par le Fonds Mbal Lekeaka. La campagne réunit des professionnels de santé et des agents de santé communautaires pour fournir des services de santé gratuits aux communautés mal desservies de la région de Nguti. L\'initiative est organisée et mise en oeuvre par CAMESA, avec le financement et le soutien institutionnel de Gwags à travers le Fonds Mbal Lekeaka.',
        },
        {
          heading: 'Détails de la campagne',
          richBody: [
            { label: 'Lieu', text: 'Nguti, Cameroun' },
            { label: 'Partenaire', text: 'CAMESA' },
            { label: 'Statut', text: 'Placeholder' },
            { label: 'Personnes atteintes', text: 'Placeholder' },
          ],
        },
      ],
      gallery: { heading: 'Galerie', count: 10 },
    },
  },
}

export default function MbalEventPage({ params }: { params: { slug: string } }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')
  const page = content[params.slug]
  if (!page) return null
  return <EventDetailPage lang={lang} onToggleLang={toggleLang} data={page[lang]} />
}
