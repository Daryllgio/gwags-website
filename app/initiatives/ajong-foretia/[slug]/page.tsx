'use client'
import { useState } from 'react'
import { Lang } from '@/lib/translations'
import EventDetailPage, { EventDetailData } from '@/components/EventDetailPage'

const content: Record<string, Record<Lang, EventDetailData>> = {
  'tech-workshop-codam-technologies': {
    en: {
      heroTitle: 'Tech Workshop with Codam Technologies',
      sections: [
        {
          heading: 'About the visit',
          body: 'In 2022, Gwags partnered with Codam Technologies to organize a visit to the Ami de Jésus orphanage in Douala, Cameroon. The visit combined two objectives: introducing children to technology through interactive demonstrations and hands-on activities, and providing essential supplies including food, clothing, and hygiene products. Children participated in guided technology sessions that included 3D printing demonstrations, interactive exercises, and direct engagement with the facilitators.\n\nBeyond providing essential supplies, the partnership with Codam Technologies created an opportunity for children to engage directly with technology in a structured setting. The workshop was participatory, with children observing 3D printing demonstrations, responding to questions, and engaging with facilitators throughout. The focus was on building familiarity and confidence rather than formal training.',
        },
        {
          heading: 'Visit details',
          detailGrid: [
            { label: 'Location', text: 'Douala, Cameroon' },
            { label: 'Orphanage', text: 'Ami de Jésus' },
            { label: 'Partner', text: 'Codam Technologies' },
            { label: 'Year', text: '2022' },
            { label: 'Activities', text: '3D printing demonstrations, hands-on exercises, facilitated Q&A' },
          ],
        },
      ],
      stats: {
        heading: 'Our impact',
        subheading: 'Impact numbers from the Tech Workshop with Codam Technologies.',
        items: [
          { value: '36', label: 'children supported' },
          { value: '$1,500+', label: 'in charitable support' },
        ],
      },
      gallery: { heading: 'Gallery', count: 15 },
    },
    fr: {
      heroTitle: 'Atelier Tech avec Codam Technologies',
      sections: [
        {
          heading: 'À propos de la visite',
          body: 'En 2022, Gwags s\'est associé à Codam Technologies pour organiser une visite à l\'orphelinat Ami de Jésus à Douala, au Cameroun. La visite combinait deux objectifs: initier les enfants à la technologie à travers des démonstrations interactives et des activités pratiques, et fournir des fournitures essentielles comprenant de la nourriture, des vêtements et des produits d\'hygiène. Les enfants ont participé à des sessions technologiques guidées comprenant des démonstrations d\'impression 3D, des exercices interactifs et un engagement direct avec les animateurs.\n\nAu-delà de la fourniture de fournitures essentielles, le partenariat avec Codam Technologies a créé une opportunité pour les enfants de s\'engager directement avec la technologie dans un cadre structuré. L\'atelier était participatif, les enfants observant des démonstrations d\'impression 3D, répondant à des questions et interagissant avec les animateurs tout au long. L\'accent était mis sur la construction de la familiarité et de la confiance plutôt que sur la formation formelle.',
        },
        {
          heading: 'Détails de la visite',
          detailGrid: [
            { label: 'Lieu', text: 'Douala, Cameroun' },
            { label: 'Orphelinat', text: 'Ami de Jésus' },
            { label: 'Partenaire', text: 'Codam Technologies' },
            { label: 'Année', text: '2022' },
            { label: 'Activités', text: 'Démonstrations d\'impression 3D, exercices pratiques, Q&R animé' },
          ],
        },
      ],
      stats: {
        heading: 'Notre impact',
        subheading: 'Chiffres d\'impact de l\'Atelier Tech avec Codam Technologies.',
        items: [
          { value: '36', label: 'enfants soutenus' },
          { value: '1 500 $+', label: 'en soutien caritatif' },
        ],
      },
      gallery: { heading: 'Galerie', count: 15 },
    },
  },
  'visit-coeur-de-jesus-orphanage': {
    en: {
      heroTitle: 'Visit to Coeur de Jésus Orphanage',
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
      heroTitle: 'Visite à l\'Orphelinat Coeur de Jésus',
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
