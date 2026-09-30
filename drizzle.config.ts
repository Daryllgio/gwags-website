import { config } from 'dotenv'
config({ path: '.env.local' })

import { defineConfig } from 'drizzle-kit'

/* Deliberately loads only .env.local (never .env.production.local or any
   file containing the Production DATABASE_URL) — so every drizzle-kit
   command run from a developer machine targets the Neon development branch
   only. Production migrations are a separate, explicit step (see the
   project README/runbook), never something this config can reach by
   accident. */

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not set in .env.local — run `vercel env pull .env.local --environment=development` first.')
}

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
})
