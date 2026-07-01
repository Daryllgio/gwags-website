import { Lang } from '@/lib/translations'

export interface NetworkOrg {
  slug: string
  /** Placeholder — replace with the real organization name */
  name: string
  sector: { en: string; fr: string }
  country: { en: string; fr: string }
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
    name: '[Organization Name]',
    sector: { en: 'Health', fr: 'Santé' },
    country: { en: 'Cameroon', fr: 'Cameroun' },
    year: '[Placeholder]',
    activeInitiatives: '[Placeholder]',
    website: '#',   // UPDATE: organization website URL
    instagram: '#', // UPDATE: organization Instagram URL
    linkedin: '#',  // UPDATE: organization LinkedIn URL
  },
  {
    slug: 'org-2',
    name: '[Organization Name]',
    sector: { en: 'Education', fr: 'Éducation' },
    country: { en: 'Benin', fr: 'Bénin' },
    year: '[Placeholder]',
    activeInitiatives: '[Placeholder]',
    website: '#',   // UPDATE: organization website URL
    instagram: '#', // UPDATE: organization Instagram URL
    linkedin: '#',  // UPDATE: organization LinkedIn URL
  },
  {
    slug: 'org-3',
    name: '[Organization Name]',
    sector: { en: 'Community Development', fr: 'Développement communautaire' },
    country: { en: 'France', fr: 'France' },
    year: '[Placeholder]',
    activeInitiatives: '[Placeholder]',
    website: '#',   // UPDATE: organization website URL
    instagram: '#', // UPDATE: organization Instagram URL
    linkedin: '#',  // UPDATE: organization LinkedIn URL
  },
]

export const getOrg = (slug: string): NetworkOrg | undefined =>
  NETWORK_ORGS.find(o => o.slug === slug)

export const localized = (field: { en: string; fr: string }, lang: Lang): string =>
  field[lang]
