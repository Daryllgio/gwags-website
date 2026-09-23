import type { Lang } from '@/lib/translations'

export interface NetworkOrg {
  slug: string
  name: { en: string; fr: string }
  logo?: string
  sector: { en: string; fr: string }
  country: { en: string; fr: string }
  description: { en: string; fr: string }
  bio: { en: string[]; fr: string[] }
  /** Detail-page placeholders — replace when the organization is confirmed */
  year: string
  activeInitiatives: string
  website: string
  instagram: string
  linkedin: string
}

export const NETWORK_ORGS: NetworkOrg[] = [
  {
    slug: 'org-1',
    name: { en: 'Junior Espoir Foundation', fr: 'Fondation Junior Espoir' },
    logo: '/images/network/fondation-junior-espoir.jpg',
    sector: { en: 'Health', fr: 'Santé' },
    country: { en: 'Cameroon', fr: 'Cameroun' },
    description: {
      en: 'The Junior Espoir Foundation is a Cameroonian organization dedicated to inclusion, dignity, and support for vulnerable populations through social, humanitarian, and community-based initiatives.',
      fr: "La Fondation Junior Espoir est une organisation camerounaise dédiée à l'inclusion, à la dignité et à l'accompagnement des personnes en situation de vulnérabilité à travers des actions sociales, humanitaires et communautaires.",
    },
    bio: {
      en: [
        'The Junior Espoir Foundation is a Cameroonian organization committed to dignity, inclusion, and solidarity for vulnerable populations.',
        "The organization was founded in memory of Junior, a child whose life, marked by a disability following a coma, deeply moved his family. His story brought into focus the barriers faced by people living with disabilities, children with serious illnesses, and vulnerable families in Cameroon.",
        "The Foundation's mission is to contribute to a more inclusive society where every individual is recognized, respected, and supported. It operates through social, humanitarian, and community-based initiatives serving people affected by poverty, exclusion, or vulnerability. Its activities span awareness campaigns, social support, family assistance, and the promotion of inclusion.",
        'The Junior Espoir Foundation also works to mobilize communities and institutional partners around projects with concrete and lasting impact, driven by the conviction that solidarity is a collective force for social transformation and that difference is an asset rather than a basis for exclusion.',
      ],
      fr: [
        "La Fondation Junior Espoir est une organisation camerounaise engagée en faveur de la dignité, de l'inclusion et de la solidarité envers les personnes en situation de vulnérabilité.",
        "L'organisation est née en mémoire de Junior, un enfant dont le parcours, marqué par un handicap survenu après un coma, a profondément mobilisé sa famille. Son histoire a mis en lumière les obstacles auxquels sont confrontées les personnes en situation de handicap, les enfants malades et les familles vulnérables au Cameroun.",
        "La Fondation a pour mission de contribuer à la construction d'une société plus inclusive, où chaque individu est reconnu, respecté et accompagné. Elle intervient à travers des actions sociales, humanitaires et communautaires au service des personnes confrontées à la précarité, à l'exclusion ou à des situations de vulnérabilité. Ses activités couvrent la sensibilisation, l'accompagnement social, le soutien aux familles et la promotion de l'inclusion.",
        "La Fondation Junior Espoir travaille également à mobiliser les communautés et les partenaires institutionnels autour de projets à impact concret et durable, avec la conviction que la solidarité constitue un levier collectif de transformation sociale et que la différence représente une richesse plutôt qu'un motif d'exclusion.",
      ],
    },
    year: '2025', // UPDATE: replace with real affiliation year
    activeInitiatives: '2', // UPDATE: replace with real count
    website: '#',   // UPDATE: organization website URL
    instagram: '#', // UPDATE: organization Instagram URL
    linkedin: '#',  // UPDATE: organization LinkedIn URL
  },
]

export const getOrg = (slug: string): NetworkOrg | undefined =>
  NETWORK_ORGS.find(o => o.slug === slug)

export const localized = (field: { en: string; fr: string }, lang: Lang): string =>
  field[lang]
