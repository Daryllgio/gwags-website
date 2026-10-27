/* Shows which Drizzle migrations are applied vs pending on a target database,
   so pending production migrations are visible BEFORE deploying.

   Usage:
     npm run db:status                          # checks the DEV branch (.env.local)
     PROD_DATABASE_URL="<prod url>" npm run db:status   # checks PRODUCTION

   Read-only: it only queries drizzle.__drizzle_migrations and never writes.
   Never prints secrets — only the host and the migration tags. */
import { readFileSync } from 'fs'
import { join } from 'path'
import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'

interface JournalEntry { idx: number; when: number; tag: string }

let url = process.env.PROD_DATABASE_URL
let envName = 'PRODUCTION (PROD_DATABASE_URL)'
if (!url) {
  config({ path: '.env.local' })
  url = process.env.DATABASE_URL
  envName = 'development (.env.local)'
}
if (!url) {
  console.error('No database URL found. Set PROD_DATABASE_URL to check production, or configure .env.local for dev.')
  process.exit(1)
}

const journalPath = join(process.cwd(), 'drizzle', 'meta', '_journal.json')
const journal = JSON.parse(readFileSync(journalPath, 'utf8')) as { entries: JournalEntry[] }
const entries = journal.entries.slice().sort((a, b) => a.idx - b.idx)

const host = url.replace(/^postgres(ql)?:\/\/[^@]*@/, '').replace(/[/?].*$/, '')
const sql = neon(url)

try {
  const applied = await sql`select created_at from drizzle.__drizzle_migrations`
  const appliedWhens = new Set(applied.map((r: { created_at: number | string }) => Number(r.created_at)))
  const pending = entries.filter(e => !appliedWhens.has(e.when))

  console.log(`Target:  ${envName}`)
  console.log(`Host:    ${host}`)
  console.log(`Applied: ${applied.length} / ${entries.length} migrations`)
  if (pending.length === 0) {
    console.log('Pending: none — database is up to date ✓')
  } else {
    console.log(`Pending: ${pending.length} migration(s) NOT yet applied:`)
    for (const e of pending) console.log(`  - ${e.tag}`)
    console.log('\nApply with:  npm run db:migrate        (dev)')
    console.log('             npm run db:migrate:prod   (production — see MIGRATIONS.md)')
    process.exitCode = 2 // non-zero signals "pending" for CI / pre-deploy checks
  }
} catch (err) {
  console.error('db:status failed to read migration state:', err instanceof Error ? err.message : 'unknown')
  process.exit(1)
}
