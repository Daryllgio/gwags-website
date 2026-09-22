import type { Lang } from '@/lib/translations'

export interface NetworkOrg {
  slug: string
  name: { en: string; fr: string }
  logo?: string
  sector: { en: string; fr: string }
  country: { en: string; fr: string }
  /** Detail-page placeholder — replace when the organization is confirmed */
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
    name: { en: 'Junior Espoir Foundation', fr: 'Fondation Junior Espoir' },
    logo: '/images/network/fondation-junior-espoir.jpg',
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
]

export const getOrg = (slug: string): NetworkOrg | undefined =>
  NETWORK_ORGS.find(o => o.slug === slug)

export const localized = (field: { en: string; fr: string }, lang: Lang): string =>
  field[lang]
