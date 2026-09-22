// IndexNow submission script.
//
// Diffs the current set of sitemap URLs (and a content hash per URL, derived
// from the same data that renders each page) against a snapshot at
// data/indexnow-snapshot.json, and submits only newly added, materially
// updated, or removed URLs to the IndexNow API. Unchanged pages are never
// resubmitted.
//
// Runs automatically after every successful production deployment via
// .github/workflows/indexnow.yml — see that file for how the snapshot
// persists across runs (a dedicated `indexnow-state` branch, not this
// branch's working tree and not Vercel's filesystem).
//
// Can also be run by hand for local testing; it only reads/writes the local
// data/indexnow-snapshot.json file and has no awareness of the state branch:
//
//   npm run indexnow              # submit changes, update local snapshot
//   npm run indexnow -- --dry-run # preview only, no network call, no write

import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { t } from '@/lib/translations'
import { PEOPLE } from '@/lib/leadershipPeople'
import { governanceBoard, executiveTeam, historicalLeadershipData } from '@/lib/leadershipTeams'
import { NETWORK_ORGS } from '@/lib/network'
import { ajongForetiaEvents } from '@/lib/ajongForetiaEvents'
import { healthOutreachEvents } from '@/lib/healthOutreachEvents'
import { mbalLekeakaFundEvents } from '@/lib/mbalLekeakaFundEvents'

const BASE_URL = 'https://www.gwags.org'
const INDEXNOW_KEY = 'd2edd5d0441342c19650dd2ec1a418af'
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const MAX_URLS_PER_BATCH = 10000 // IndexNow protocol limit per request

const __dirname = dirname(fileURLToPath(import.meta.url))
const SNAPSHOT_PATH = join(__dirname, '..', 'data', 'indexnow-snapshot.json')

function contentHash(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}

// Same placeholder-exclusion rules as app/sitemap.ts, kept in sync manually
// since sitemap.ts can't be imported directly (Next's page/route file export
// contract doesn't allow it) — see the comment in app/sitemap.ts.
const leadershipSlugs = Object.keys(PEOPLE).filter((slug) => !slug.startsWith('placeholder-'))
const networkSlugs = NETWORK_ORGS.filter((org) => !org.name.startsWith('Placeholder ')).map((org) => org.slug)
const scholarsBatches = Object.keys(t.en.scholarsBatches)

type PageEntry = { url: string; data: unknown }

const pages: PageEntry[] = [
  // Home page: every section component it renders, both languages.
  {
    url: '/',
    data: {
      en: { hero: t.en.hero, whatWeAre: t.en.whatWeAre, initiatives: t.en.initiatives, whyGwags: t.en.whyGwags, quote: t.en.quote, moreAbout: t.en.moreAbout, cta: t.en.cta },
      fr: { hero: t.fr.hero, whatWeAre: t.fr.whatWeAre, initiatives: t.fr.initiatives, whyGwags: t.fr.whyGwags, quote: t.fr.quote, moreAbout: t.fr.moreAbout, cta: t.fr.cta },
    },
  },
  { url: '/about/how-we-work', data: { en: t.en.howWeWork, fr: t.fr.howWeWork } },
  { url: '/about/our-role', data: { en: t.en.ourRole, fr: t.fr.ourRole } },
  { url: '/about/our-story', data: { en: t.en.ourStoryPage, fr: t.fr.ourStoryPage } },
  { url: '/about/leadership', data: { governanceBoard, executiveTeam, historicalLeadershipData } },
  { url: '/get-involved', data: { en: t.en.getInvolvedPage, fr: t.fr.getInvolvedPage } },
  { url: '/contact', data: { en: t.en.contactPage, fr: t.fr.contactPage } },
  { url: '/partner', data: { en: t.en.partnerPage, fr: t.fr.partnerPage } },
  { url: '/network', data: { page: { en: t.en.network, fr: t.fr.network }, orgs: NETWORK_ORGS } },
  { url: '/initiatives/scholars', data: { en: t.en.scholarsPage, fr: t.fr.scholarsPage } },
  { url: '/initiatives/ajong-foretia', data: { en: t.en.ajongForetiasPage, fr: t.fr.ajongForetiasPage } },
  { url: '/initiatives/health-outreach', data: { en: t.en.healthOutreachPage, fr: t.fr.healthOutreachPage } },
  { url: '/initiatives/mbal-lekeaka-fund', data: { en: t.en.mbalLekeakaPage, fr: t.fr.mbalLekeakaPage } },
  { url: '/privacy', data: { en: t.en.privacy, fr: t.fr.privacy } },
  { url: '/terms', data: { en: t.en.terms, fr: t.fr.terms } },

  ...leadershipSlugs.map((slug): PageEntry => ({ url: `/about/leadership/${slug}`, data: PEOPLE[slug] })),
  ...networkSlugs.map((slug): PageEntry => ({ url: `/network/${slug}`, data: NETWORK_ORGS.find((o) => o.slug === slug) })),
  ...scholarsBatches.map((batch): PageEntry => ({
    url: `/initiatives/scholars/${batch}`,
    data: { en: (t.en.scholarsBatches as Record<string, unknown>)[batch], fr: (t.fr.scholarsBatches as Record<string, unknown>)[batch] },
  })),
  ...Object.keys(ajongForetiaEvents).map((slug): PageEntry => ({ url: `/initiatives/ajong-foretia/${slug}`, data: ajongForetiaEvents[slug] })),
  ...Object.keys(healthOutreachEvents).map((slug): PageEntry => ({ url: `/initiatives/health-outreach/${slug}`, data: healthOutreachEvents[slug] })),
  ...Object.keys(mbalLekeakaFundEvents).map((slug): PageEntry => ({ url: `/initiatives/mbal-lekeaka-fund/${slug}`, data: mbalLekeakaFundEvents[slug] })),
]

type Snapshot = Record<string, string> // url -> content hash, as of last successful submission

function loadSnapshot(): Snapshot {
  if (!existsSync(SNAPSHOT_PATH)) return {}
  return JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf-8'))
}

function saveSnapshot(snapshot: Snapshot) {
  mkdirSync(dirname(SNAPSHOT_PATH), { recursive: true })
  writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2) + '\n')
}

async function submitBatch(urlList: string[]): Promise<Response> {
  return fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'www.gwags.org',
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  })
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  const previous = loadSnapshot()
  const current: Snapshot = {}
  for (const page of pages) current[page.url] = contentHash(page.data)

  const added: string[] = []
  const updated: string[] = []
  const removed: string[] = []

  for (const url of Object.keys(current)) {
    if (!(url in previous)) added.push(url)
    else if (previous[url] !== current[url]) updated.push(url)
  }
  for (const url of Object.keys(previous)) {
    if (!(url in current)) removed.push(url)
  }

  console.log(`Pages tracked: ${pages.length}`)
  console.log(`Added: ${added.length}  Updated: ${updated.length}  Removed: ${removed.length}`)

  const changed = [...added, ...updated, ...removed]

  if (changed.length === 0) {
    console.log('No changes since the last submission — nothing to submit.')
    return
  }

  const fullUrls = changed.map((path) => `${BASE_URL}${path}`)
  console.log('\nURLs to submit:')
  for (const path of added) console.log(`  [added]   ${BASE_URL}${path}`)
  for (const path of updated) console.log(`  [updated] ${BASE_URL}${path}`)
  for (const path of removed) console.log(`  [removed] ${BASE_URL}${path}`)

  if (dryRun) {
    console.log('\n--dry-run: not submitting to IndexNow, snapshot not updated.')
    return
  }

  console.log(`\nEndpoint: ${INDEXNOW_ENDPOINT}`)

  let allOk = true
  for (let i = 0; i < fullUrls.length; i += MAX_URLS_PER_BATCH) {
    const batch = fullUrls.slice(i, i + MAX_URLS_PER_BATCH)
    const res = await submitBatch(batch)
    const body = await res.text()
    console.log(`\nBatch ${Math.floor(i / MAX_URLS_PER_BATCH) + 1}: ${batch.length} URL(s)`)
    console.log(`Response: ${res.status} ${res.statusText}${body ? ` — ${body}` : ''}`)
    if (!res.ok) allOk = false
  }

  if (allOk) {
    saveSnapshot(current)
    console.log(`\nSnapshot updated: ${SNAPSHOT_PATH}`)
  } else {
    console.error('\nOne or more batches failed — snapshot NOT updated, affected URLs will be retried next run.')
    process.exitCode = 1
  }
}

main()
