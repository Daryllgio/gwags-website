import 'server-only'
import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from './schema'

/* Pool (WebSocket-based), not the HTTP-only neon-http driver, because
   submission writes need real multi-statement transactions (submission row +
   form-specific row + document/social-link rows must commit atomically).
   Node 22+ (this app's runtime, both locally and on Vercel) has native
   WebSocket support, so no `ws` polyfill/neonConfig setup is needed — that's
   only required on Node 21 and below per the driver's own docs. */

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const pool = new Pool({ connectionString })

export const db = drizzle(pool, { schema })
export type Db = typeof db
