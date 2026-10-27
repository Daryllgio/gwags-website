# Database migrations & production deployment

The app uses **Neon Postgres** with **Drizzle ORM**. Dev and production are
**separate Neon branches**. Vercel builds do **not** run migrations, so a
production schema change is always an explicit, deliberate step — this document
is the single source of truth for that process.

## Environments

| Environment | Connection source | Used by |
|---|---|---|
| **Development** | `.env.local` → `DATABASE_URL` (Neon **dev** branch) | `db:generate`, `db:migrate`, `db:status` |
| **Production** | `PROD_DATABASE_URL` supplied per-command (Neon **prod** branch) | `db:migrate:prod`, `db:status` |

- `drizzle.config.ts` loads `.env.local` with `override: true`, so dev commands
  **always** target the dev branch even if a stray `DATABASE_URL` is exported.
- `drizzle.config.prod.ts` reads **only** `PROD_DATABASE_URL` (never any `.env`
  file) and refuses to run against the dev branch endpoint. There is no way for
  an ordinary `npm run db:migrate` to touch production.
- **Never** put `PROD_DATABASE_URL` in a committed or `.env` file.

## Everyday workflow (development)

1. Edit `lib/db/schema.ts`.
2. `npm run db:generate` — creates a new `drizzle/NNNN_*.sql` migration.
3. `npm run db:migrate` — applies it to the **dev** branch.
4. Commit the schema change **and** the generated `drizzle/` files together.

## Before deploying: check pending production migrations

Vercel does **not** migrate on deploy, so always check first:

```bash
# Development branch:
npm run db:status

# Production branch (supply the prod URL for this one command only):
PROD_DATABASE_URL="$(vercel env pull /tmp/p.env --environment=production --yes >/dev/null && \
  grep '^DATABASE_URL_UNPOOLED=' /tmp/p.env | cut -d= -f2- | tr -d '\"'; rm -f /tmp/p.env)" \
  npm run db:status
```

`db:status` prints `Applied: X / Y` and lists any pending migration tags
(exit code `2` if anything is pending — useful as a pre-deploy gate).

## Applying migrations to production

> Requires owner authorization. Review the pending list from `db:status` first.
> Prefer the Neon **unpooled** (direct) URL for DDL.

```bash
# 1. Pull the production DB URL into a shell variable (not a file):
PROD_DATABASE_URL="$(vercel env pull /tmp/p.env --environment=production --yes >/dev/null && \
  grep '^DATABASE_URL_UNPOOLED=' /tmp/p.env | cut -d= -f2- | tr -d '\"'; rm -f /tmp/p.env)"

# 2. (Recommended) create a Neon backup branch from prod in the Neon console,
#    or confirm point-in-time-restore retention.

# 3. Apply only the pending migrations to production:
PROD_DATABASE_URL="$PROD_DATABASE_URL" npm run db:migrate:prod

# 4. Verify:
PROD_DATABASE_URL="$PROD_DATABASE_URL" npm run db:status   # → "up to date ✓"
```

## Correct deploy order

Because Vercel deploys do not migrate, **migrate first, then deploy** whenever a
release introduces schema changes:

1. `npm run db:status` against production → review pending.
2. `npm run db:migrate:prod` → production schema now matches the release.
3. Push / promote the deployment on Vercel.

Deploying code before its migration leaves production running against a schema
it doesn't have (the failure mode this process exists to prevent).

## Why builds don't auto-migrate

`build` is plain `next build`. We intentionally do **not** run `drizzle-kit
migrate` during the Vercel build because build/deploy runs are not the right
place to mutate a shared production database (concurrent builds, previews,
rollbacks, and partial failures make it unsafe). Migrations are a separate,
reviewed, explicit step as above.
