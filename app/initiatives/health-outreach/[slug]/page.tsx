'use client'
import { useState } from 'react'
import { Lang } from '@/lib/translations'
import EventDetailPage, { EventDetailData } from '@/components/EventDetailPage'

const content: Record<string, Record<Lang, EventDetailData>> = {
  'nguti-health-campaign': {
    en: {
      sections: [
        {
          heading: 'About the campaign',
          body: 'The Nguti Health Campaign is the first health outreach initiative organized under Gwags. The campaign is delivered in partnership with CAMESA and brings together medical professionals to provide free consultations, screenings, and surgical procedures to communities in the Nguti area. The campaign targets populations with limited access to regular healthcare services.',
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
      gallery: { heading: 'Gallery', count: 15 },
    },
    fr: {
      sections: [
        {
          heading: 'À propos de la campagne',
          body: 'La Campagne de Santé de Nguti est la première initiative d\'outreach de santé organisée sous Gwags. La campagne est conduite en partenariat avec CAMESA et réunit des professionnels de santé pour fournir des consultations gratuites, des dépistages et des interventions chirurgicales aux communautés de la région de Nguti. La campagne cible les populations ayant un accès limité aux services de santé réguliers.',
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
      gallery: { heading: 'Galerie', count: 15 },
    },
  },
}

export default function HealthEventPage({ params }: { params: { slug: string } }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')
  const page = content[params.slug]
  if (!page) return null
  return <EventDetailPage lang={lang} onToggleLang={toggleLang} data={page[lang]} />
}
