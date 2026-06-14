'use client'
import { useState } from 'react'
import { Lang } from '@/lib/translations'
import EventDetailPage, { EventDetailData } from '@/components/EventDetailPage'

const content: Record<string, Record<Lang, EventDetailData>> = {
  'nguti-health-campaign': {
    en: {
      heroTitle: 'Nguti Health Campaign',
      sections: [
        {
          heading: 'About the campaign',
          body: 'The Nguti Health Campaign is a week-long medical outreach organized in the Nguti Health District, located in the Kupe Manenguba Division of Cameroon\'s South West Region. The campaign brings together over 120 medical professionals to deliver free healthcare services to an underserved population of approximately 1,500 people across seven health areas. Services include medical and dental consultations, surgical interventions, ophthalmology consultations, laboratory screenings, and community health education.\n\nThe campaign is organized and delivered by CAMESA, the Cameroon English Speaking Medical Students\' Association, with funding support provided by Gwags through the Mbal Lekeaka Fund. The Nguti Health District covers a vast and difficult terrain with poorly maintained roads and limited access to medical infrastructure, making it one of the areas where this type of intervention is most needed.',
        },
        {
          heading: 'Campaign details',
          detailGrid: [
            { label: 'Location', text: 'Nguti Health District, South West Region, Cameroon' },
            { label: 'Delivered by', text: 'CAMESA' },
            { label: 'Duration', text: 'August 9–16, 2026' },
            { label: 'Services delivered', text: 'Medical consultations, dental consultations, surgical interventions, ophthalmology consultations, laboratory screenings, health education' },
          ],
        },
      ],
      stats: {
        heading: 'Our impact',
        subheading: 'Impact numbers from the Nguti Health Campaign.',
        items: [
          { value: '1,500+', label: 'beneficiaries targeted' },
          { value: '120+', label: 'medical professionals deployed' },
        ],
      },
      gallery: { heading: 'Gallery', count: 12 },
    },
    fr: {
      heroTitle: 'Campagne de Santé de Nguti',
      sections: [
        {
          heading: 'À propos de la campagne',
          body: 'La Campagne de Santé de Nguti est une mission médicale d\'une semaine organisée dans le District de Santé de Nguti, situé dans le Département de la Kupe Manenguba, Région du Sud-Ouest du Cameroun. La campagne rassemble plus de 120 professionnels de santé pour fournir des services de santé gratuits à une population mal desservie d\'environ 1 500 personnes à travers sept zones de santé. Les services comprennent des consultations médicales et dentaires, des interventions chirurgicales, des consultations en ophtalmologie, des dépistages en laboratoire et de l\'éducation sanitaire communautaire.\n\nLa campagne est organisée et livrée par CAMESA, l\'Association des Étudiants en Médecine Anglophones du Cameroun, avec un soutien financier fourni par Gwags à travers le Fonds Mbal Lekeaka. Le District de Santé de Nguti couvre un terrain vaste et difficile avec des routes mal entretenues et un accès limité aux infrastructures médicales, ce qui en fait l\'une des zones où ce type d\'intervention est le plus nécessaire.',
        },
        {
          heading: 'Détails de la campagne',
          detailGrid: [
            { label: 'Lieu', text: 'District de Santé de Nguti, Région du Sud-Ouest, Cameroun' },
            { label: 'Réalisé par', text: 'CAMESA' },
            { label: 'Durée', text: '9–16 août 2026' },
            { label: 'Services fournis', text: 'Consultations médicales, consultations dentaires, interventions chirurgicales, consultations en ophtalmologie, dépistages en laboratoire, éducation sanitaire' },
          ],
        },
      ],
      stats: {
        heading: 'Notre impact',
        subheading: 'Chiffres d\'impact de la Campagne de Santé de Nguti.',
        items: [
          { value: '1 500+', label: 'bénéficiaires ciblés' },
          { value: '120+', label: 'professionnels de santé déployés' },
        ],
      },
      gallery: { heading: 'Galerie', count: 12 },
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
