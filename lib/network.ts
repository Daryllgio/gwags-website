import { Lang } from '@/lib/translations'

export interface NetworkOrg {
  slug: string
  /** Placeholder — replace with the real organization name */
  name: string
  sector: { en: string; fr: string }
  country: { en: string; fr: string }
  /** Card + detail-page placeholder — replace when the organization is confirmed */
  description: { en: string; fr: string }
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
    name: 'Placeholder Health Alliance', // UPDATE: replace with real organization name
    sector: { en: 'Health', fr: 'Santé' },
    country: { en: 'Cameroon', fr: 'Cameroun' },
    description: {
      en: 'Placeholder Health Alliance works to expand access to quality healthcare across underserved communities.',
      fr: "Placeholder Health Alliance œuvre à élargir l'accès à des soins de santé de qualité dans les communautés mal desservies.",
    },
    year: '2025', // UPDATE: replace with real affiliation year
    activeInitiatives: '2', // UPDATE: replace with real count
    website: '#',   // UPDATE: organization website URL
    instagram: '#', // UPDATE: organization Instagram URL
    linkedin: '#',  // UPDATE: organization LinkedIn URL
  },
  {
    slug: 'org-2',
    name: 'Placeholder Education Trust', // UPDATE: replace with real organization name
    sector: { en: 'Education', fr: 'Éducation' },
    country: { en: 'Benin', fr: 'Bénin' },
    description: {
      en: 'Placeholder Education Trust supports schools and students across Benin with training, resources, and scholarship opportunities.',
      fr: "Placeholder Education Trust soutient les écoles et les élèves à travers le Bénin grâce à des formations, des ressources et des bourses d'études.",
    },
    year: '2025', // UPDATE: replace with real affiliation year
    activeInitiatives: '1', // UPDATE: replace with real count
    website: '#',   // UPDATE: organization website URL
    instagram: '#', // UPDATE: organization Instagram URL
    linkedin: '#',  // UPDATE: organization LinkedIn URL
  },
  {
    slug: 'org-3',
    name: 'Placeholder Community Partners', // UPDATE: replace with real organization name
    sector: { en: 'Community Development', fr: 'Développement communautaire' },
    country: { en: 'France', fr: 'France' },
    description: {
      en: 'Placeholder Community Partners builds local capacity through grassroots initiatives and coalition-building across community networks.',
      fr: "Placeholder Community Partners renforce les capacités locales à travers des initiatives communautaires et la constitution de coalitions au sein des réseaux locaux.",
    },
    year: '2026', // UPDATE: replace with real affiliation year
    activeInitiatives: '1', // UPDATE: replace with real count
    website: '#',   // UPDATE: organization website URL
    instagram: '#', // UPDATE: organization Instagram URL
    linkedin: '#',  // UPDATE: organization LinkedIn URL
  },
]

export const getOrg = (slug: string): NetworkOrg | undefined =>
  NETWORK_ORGS.find(o => o.slug === slug)

export const localized = (field: { en: string; fr: string }, lang: Lang): string =>
  field[lang]
