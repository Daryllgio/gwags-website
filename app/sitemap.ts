import type { MetadataRoute } from 'next'
import { t } from '@/lib/translations'
import { NETWORK_ORGS } from '@/lib/network'
import { PEOPLE as LEADERSHIP_PEOPLE } from '@/lib/leadershipPeople'
import { ajongForetiaEvents } from '@/lib/ajongForetiaEvents'
import { healthOutreachEvents } from '@/lib/healthOutreachEvents'
import { mbalLekeakaFundEvents } from '@/lib/mbalLekeakaFundEvents'

// www.gwags.org is the domain that actually serves content; the bare
// apex (gwags.org) 308-redirects to it at the DNS/Vercel level, so it's
// used here as the canonical domain to avoid listing redirecting URLs.
export const BASE_URL = 'https://www.gwags.org'

// Leadership profile slugs still carrying a "placeholder-" key (unfilled roles,
// e.g. "[Name Placeholder]") are excluded — they aren't real, publishable pages.
const leadershipSlugs = Object.keys(LEADERSHIP_PEOPLE).filter((slug) => !slug.startsWith('placeholder-'))

// Network org detail pages are excluded while their data is still placeholder
// content (see lib/network.ts) — they'll be picked up automatically once real
// organizations replace the "Placeholder ..." entries.
const networkSlugs = NETWORK_ORGS.filter((org) => !org.name.startsWith('Placeholder ')).map((org) => org.slug)

const scholarsBatches = Object.keys(t.en.scholarsBatches)
const ajongForetiaSlugs = Object.keys(ajongForetiaEvents)
const healthOutreachSlugs = Object.keys(healthOutreachEvents)
const mbalLekeakaFundSlugs = Object.keys(mbalLekeakaFundEvents)

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  ): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  })

  return [
    entry('/', 1, 'weekly'),

    // Top-level static pages
    entry('/about/how-we-work', 0.8, 'monthly'),
    entry('/about/our-role', 0.8, 'monthly'),
    entry('/about/our-story', 0.8, 'monthly'),
    entry('/about/leadership', 0.8, 'monthly'),
    entry('/get-involved', 0.8, 'monthly'),
    entry('/contact', 0.7, 'monthly'),
    entry('/partner', 0.7, 'monthly'),
    entry('/network', 0.7, 'monthly'),
    entry('/initiatives/scholars', 0.8, 'monthly'),
    entry('/initiatives/ajong-foretia', 0.8, 'monthly'),
    entry('/initiatives/health-outreach', 0.8, 'monthly'),
    entry('/initiatives/mbal-lekeaka-fund', 0.8, 'monthly'),

    // Legal pages
    entry('/privacy', 0.3, 'yearly'),
    entry('/terms', 0.3, 'yearly'),

    // Leadership profiles
    ...leadershipSlugs.map((slug) => entry(`/about/leadership/${slug}`, 0.6, 'monthly')),

    // Network member organizations
    ...networkSlugs.map((slug) => entry(`/network/${slug}`, 0.5, 'monthly')),

    // Scholars cohort batches
    ...scholarsBatches.map((batch) => entry(`/initiatives/scholars/${batch}`, 0.6, 'yearly')),

    // Past-event initiative detail pages (historical record, rarely changes)
    ...ajongForetiaSlugs.map((slug) => entry(`/initiatives/ajong-foretia/${slug}`, 0.5, 'yearly')),
    ...healthOutreachSlugs.map((slug) => entry(`/initiatives/health-outreach/${slug}`, 0.5, 'yearly')),
    ...mbalLekeakaFundSlugs.map((slug) => entry(`/initiatives/mbal-lekeaka-fund/${slug}`, 0.5, 'yearly')),
  ]
}
