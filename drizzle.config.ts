import { config } from 'dotenv'
// override:true so .env.local's DEV connection string ALWAYS wins, even if a
// stray DATABASE_URL (e.g. a production value) is already exported in the
// shell. This is the DEVELOPMENT drizzle config: `db:generate` and
// `db:migrate` run through it and therefore can only ever touch the Neon dev
// branch. Production migrations use drizzle.config.prod.ts via
// `db:migrate:prod` and a separately-supplied PROD_DATABASE_URL — see
// MIGRATIONS.md.
config({ path: '.env.local', override: true })

import { defineConfig } from 'drizzle-kit'

/* Deliberately loads only .env.local (never .env.production.local or any
   file containing the Production DATABASE_URL) — so every drizzle-kit
   command run from a developer machine targets the Neon development branch
   only. Production migrations are a separate, explicit step
   (drizzle.config.prod.ts + `npm run db:migrate:prod`, see MIGRATIONS.md),
   never something this config can reach by accident. */

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
