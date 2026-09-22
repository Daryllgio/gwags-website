# indexnow-state

This branch holds nothing but `data/indexnow-snapshot.json` — the record of
which page (URL → content hash) was last successfully submitted to IndexNow.

It is **not** application source and is **not** deployed by Vercel. It exists
purely so `.github/workflows/indexnow.yml` has a durable, non-ephemeral place
to read/write that snapshot across runs, without:

- relying on Vercel's build filesystem (wiped every deployment), or
- committing the snapshot to `main` (which would trigger a new Vercel
  production deployment on every IndexNow run — a recursive loop).

Do not merge this branch into `main`. Do not deploy it.
