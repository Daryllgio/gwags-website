import { defineConfig } from 'drizzle-kit'

/* PRODUCTION migration config — intentionally separate from drizzle.config.ts.

   It reads ONLY `PROD_DATABASE_URL`, a variable that is never set in local
   development and never written to any committed or .env file. The operator
   must supply it deliberately for a single command, e.g.:

     PROD_DATABASE_URL="$(…pull from Vercel, see MIGRATIONS.md…)" npm run db:migrate:prod

   Because it ignores .env.local entirely, an ordinary `npm run db:migrate`
   (which uses drizzle.config.ts → the dev branch) can never reach production,
   and this config can't accidentally run against dev. */

const connectionString = process.env.PROD_DATABASE_URL
if (!connectionString) {
  throw new Error(
    'PROD_DATABASE_URL is not set. Production migrations are a deliberate, explicit step — see MIGRATIONS.md. ' +
    'Do NOT add PROD_DATABASE_URL to any .env file.',
  )
}

/* Defense-in-depth: refuse to run if the supplied URL is actually the known
   development branch, so a copy/paste slip can't migrate prod-config against dev. */
if (connectionString.includes('ep-restless-tooth-b8ftpe2l')) {
  throw new Error('PROD_DATABASE_URL points at the DEVELOPMENT branch endpoint. Aborting — use the production connection string.')
}

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // Prefer the Neon DIRECT (unpooled) URL for DDL — pass PROD_DATABASE_URL as
    // the unpooled connection string (…neon.tech, not …-pooler).
    url: connectionString,
  },
})
