'use client'
import { useLang } from '@/lib/useLang'
import { Lang } from '@/lib/translations'
import EventDetailPage, { EventDetailData } from '@/components/EventDetailPage'

const content: Record<string, Record<Lang, EventDetailData>> = {
  'tech-workshop-codam-technologies': {
    en: {
      heroTitle: 'Tech Workshop with Codam Technologies',
      sections: [
        {
          heading: 'About the visit',
          body: 'In 2022, Gwags partnered with Codam Technologies to organize a visit to the Ami de Jésus orphanage in Douala, Cameroon. The visit combined two objectives: introducing children to technology through interactive demonstrations and hands-on activities, and providing essential living supplies. Children participated in guided technology sessions that included 3D printing demonstrations, interactive exercises, and direct engagement with the facilitators.\n\nBeyond providing essential supplies, the partnership with Codam Technologies created an opportunity for children to engage directly with technology in a structured setting. The workshop was participatory, with children observing 3D printing demonstrations, responding to questions, and engaging with facilitators throughout. The focus was on building familiarity and confidence rather than formal training.',
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
          { value: '$1,200+', label: 'in charitable support' },
        ],
      },
      gallery: { heading: 'Gallery', count: 12 },
    },
    fr: {
      heroTitle: 'Atelier Tech avec Codam Technologies',
      sections: [
        {
          heading: 'À propos de la visite',
          body: 'En 2022, Gwags s\'est associé à Codam Technologies pour organiser une visite à l\'orphelinat Ami de Jésus à Douala, au Cameroun. La visite combinait deux objectifs: initier les enfants à la technologie à travers des démonstrations interactives et des activités pratiques, et fournir des fournitures de vie essentielles. Les enfants ont participé à des sessions technologiques guidées comprenant des démonstrations d\'impression 3D, des exercices interactifs et un engagement direct avec les animateurs.\n\nAu-delà de la fourniture de fournitures essentielles, le partenariat avec Codam Technologies a créé une opportunité pour les enfants de s\'engager directement avec la technologie dans un cadre structuré. L\'atelier était participatif, les enfants observant des démonstrations d\'impression 3D, répondant à des questions et interagissant avec les animateurs tout au long. L\'accent était mis sur la construction de la familiarité et de la confiance plutôt que sur la formation formelle.',
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
          { value: '1 200 $+', label: 'en soutien caritatif' },
        ],
      },
      gallery: { heading: 'Galerie', count: 12 },
    },
  },
  'visit-coeur-de-jesus-orphanage': {
    en: {
      heroTitle: 'Visit to Coeur de Jésus Orphanage',
      sections: [
        {
          heading: 'About the visit',
          body: 'In December 2021, Gwags organized its first visit to the Coeur de Jésus orphanage in Douala, Cameroon. The team provided essential living supplies to 48 children at the orphanage. Alongside the material support, the visit included structured enrichment activities designed to create positive experiences for the children through group exercises, team-building activities, and supervised recreational sessions.\n\nFor many of these children, the barriers they face are not only material. Growing up in environments with limited resources and few external visitors, they carry a need for connection, attention, and experiences that remind them they are not forgotten. The visit was built to address both realities: the immediate needs that essential living supplies can meet, and the emotional needs that only human presence and genuine engagement can reach.',
        },
        {
          heading: 'Visit details',
          detailGrid: [
            { label: 'Location', text: 'Douala, Cameroon' },
            { label: 'Orphanage', text: 'Coeur de Jésus' },
            { label: 'Year', text: '2021' },
            { label: 'Activities', text: 'Essential living supplies distribution, group enrichment activities, team-building exercises, supervised recreation' },
          ],
        },
      ],
      stats: {
        heading: 'Our impact',
        subheading: 'Impact numbers from the visit to Coeur de Jésus Orphanage.',
        items: [
          { value: '48', label: 'children supported' },
          { value: '$800+', label: 'in charitable support' },
        ],
      },
      gallery: { heading: 'Gallery', count: 12 },
    },
    fr: {
      heroTitle: 'Visite à l\'Orphelinat Coeur de Jésus',
      sections: [
        {
          heading: 'À propos de la visite',
          body: 'En décembre 2021, Gwags a organisé sa première visite à l\'orphelinat Coeur de Jésus à Douala, au Cameroun. L\'équipe a fourni des fournitures de vie essentielles aux 48 enfants de l\'orphelinat. Parallèlement au soutien matériel, la visite comprenait des activités d\'enrichissement structurées conçues pour créer des expériences positives pour les enfants à travers des exercices de groupe, des activités de renforcement d\'équipe et des sessions récréatives supervisées.\n\nPour beaucoup de ces enfants, les obstacles auxquels ils font face ne sont pas seulement matériels. Grandissant dans des environnements aux ressources limitées et avec peu de visiteurs extérieurs, ils portent un besoin de connexion, d\'attention et d\'expériences qui leur rappellent qu\'ils ne sont pas oubliés. La visite a été conçue pour répondre aux deux réalités: les besoins immédiats que les fournitures de vie essentielles peuvent combler, et les besoins émotionnels que seule la présence humaine et un engagement sincère peuvent atteindre.',
        },
        {
          heading: 'Détails de la visite',
          detailGrid: [
            { label: 'Lieu', text: 'Douala, Cameroun' },
            { label: 'Orphelinat', text: 'Coeur de Jésus' },
            { label: 'Année', text: '2021' },
            { label: 'Activités', text: 'Distribution de fournitures de vie essentielles, activités d\'enrichissement en groupe, exercices de renforcement d\'équipe, loisirs supervisés' },
          ],
        },
      ],
      stats: {
        heading: 'Notre impact',
        subheading: 'Chiffres d\'impact de la visite à l\'Orphelinat Coeur de Jésus.',
        items: [
          { value: '48', label: 'enfants soutenus' },
          { value: '800 $+', label: 'en soutien caritatif' },
        ],
      },
      gallery: { heading: 'Galerie', count: 12 },
    },
  },
}

export default function AjongEventPage({ params }: { params: { slug: string } }) {
  const [lang, toggleLang] = useLang()
  const page = content[params.slug]
  if (!page) return null
  return <EventDetailPage lang={lang} onToggleLang={toggleLang} data={page[lang]} />
}
