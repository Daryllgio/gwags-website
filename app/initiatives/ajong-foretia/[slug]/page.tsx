'use client'
import { useState } from 'react'
import { Lang } from '@/lib/translations'
import EventDetailPage, { EventDetailData } from '@/components/EventDetailPage'

const content: Record<string, Record<Lang, EventDetailData>> = {
  'tech-workshop-codam-technologies': {
    en: {
      sections: [
        {
          heading: 'About the visit',
          body: 'In 2022, Gwags partnered with Codam Technologies, a Cameroonian tech organization, to deliver a hands-on technology workshop for children at an orphanage in Douala. The visit introduced the children to digital tools and basic technology skills, expanding their exposure beyond their immediate environment. The partnership demonstrated the potential of combining orphan support with skills-based programming.',
        },
        {
          heading: 'Visit details',
          richBody: [
            { label: 'Location', text: 'Douala, Cameroon' },
            { label: 'Partner', text: 'Codam Technologies' },
            { label: 'Year', text: '2022' },
            { label: 'Focus', text: 'Technology exposure and digital skills' },
          ],
        },
      ],
      gallery: { heading: 'Gallery', count: 15 },
    },
    fr: {
      sections: [
        {
          heading: 'À propos de la visite',
          body: 'En 2022, Gwags s\'est associé à Codam Technologies, une organisation technologique camerounaise, pour animer un atelier technologique pratique pour les enfants d\'un orphelinat à Douala. La visite a initié les enfants aux outils numériques et aux compétences technologiques de base, élargissant leur horizon au-delà de leur environnement immédiat. Ce partenariat a démontré le potentiel de combiner le soutien aux orphelins avec une programmation axée sur les compétences.',
        },
        {
          heading: 'Détails de la visite',
          richBody: [
            { label: 'Lieu', text: 'Douala, Cameroun' },
            { label: 'Partenaire', text: 'Codam Technologies' },
            { label: 'Année', text: '2022' },
            { label: 'Focus', text: 'Exposition technologique et compétences numériques' },
          ],
        },
      ],
      gallery: { heading: 'Galerie', count: 15 },
    },
  },
  'visit-coeur-de-jesus-orphanage': {
    en: {
      sections: [
        {
          heading: 'About the visit',
          body: 'In December 2021, four high school students organized a visit to the Coeur de Jésus orphanage in Douala, Cameroon. The team spent time with the children, provided essential supplies, and witnessed firsthand the conditions these children were navigating daily. This visit was the founding moment of what would become Gwags.',
        },
        {
          heading: 'Visit details',
          richBody: [
            { label: 'Location', text: 'Douala, Cameroon' },
            { label: 'Orphanage', text: 'Coeur de Jésus' },
            { label: 'Year', text: '2021' },
            { label: 'Focus', text: 'Essential supplies and community engagement' },
          ],
        },
      ],
      gallery: { heading: 'Gallery', count: 15 },
    },
    fr: {
      sections: [
        {
          heading: 'À propos de la visite',
          body: 'En décembre 2021, quatre lycéens ont organisé une visite à l\'orphelinat Coeur de Jésus à Douala, au Cameroun. L\'équipe a passé du temps avec les enfants, fourni des fournitures essentielles et été témoin directement des conditions que ces enfants traversaient au quotidien. Cette visite a été le moment fondateur de ce qui allait devenir Gwags.',
        },
        {
          heading: 'Détails de la visite',
          richBody: [
            { label: 'Lieu', text: 'Douala, Cameroun' },
            { label: 'Orphelinat', text: 'Coeur de Jésus' },
            { label: 'Année', text: '2021' },
            { label: 'Focus', text: 'Fournitures essentielles et engagement communautaire' },
          ],
        },
      ],
      gallery: { heading: 'Galerie', count: 15 },
    },
  },
}

export default function AjongEventPage({ params }: { params: { slug: string } }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')
  const page = content[params.slug]
  if (!page) return null
  return <EventDetailPage lang={lang} onToggleLang={toggleLang} data={page[lang]} />
}
