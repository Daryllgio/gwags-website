import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from 'crypto'

/* Secure, short-lived Stripe Customer Portal access tokens.
   No donor account/session system exists on this site, so ownership of the
   donor's inbox is what proves the request is theirs. A token is minted
   only after we've already resolved a real Stripe Customer server-side
   (see create-portal-session), emailed to that donor's address, and must
   be presented back before a portal session is ever created.

   Reuses STRIPE_SECRET_KEY (already required in every environment this app
   runs in) rather than introducing a new signing secret, via HKDF with a
   fixed, purpose-specific `info` string for domain separation — the derived
   key is only ever usable for this token purpose, never interchangeable
   with the raw Stripe key. AES-256-GCM gives authenticated encryption in
   one step, so the customer ID stays opaque (not just signed-but-readable)
   and any tampering is rejected automatically via the auth tag. */

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')

const TOKEN_TTL_SECONDS = 15 * 60
const HKDF_SALT = Buffer.from('gwags-donation-portal')
const HKDF_INFO = Buffer.from('gwags:portal-access-token:v1')

let cachedKey: Buffer | null = null
function deriveKey(): Buffer {
  if (!cachedKey) {
    cachedKey = Buffer.from(hkdfSync('sha256', stripeSecretKey as string, HKDF_SALT, HKDF_INFO, 32))
  }
  return cachedKey
}

interface TokenPayload {
  cid: string
  exp: number
}

export function createPortalAccessToken(customerId: string): string {
  const key = deriveKey()
  const iv = randomBytes(12)
  const payload: TokenPayload = { cid: customerId, exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS }

  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()

  return `${iv.toString('base64url')}.${ciphertext.toString('base64url')}.${authTag.toString('base64url')}`
}

/* Returns the customer ID only if the token decrypts, authenticates, and
   hasn't expired. Any failure (malformed, tampered, wrong key, expired)
   fails closed and returns null — never throws to the caller. */
export function verifyPortalAccessToken(token: string): { customerId: string } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const iv = Buffer.from(parts[0], 'base64url')
    const ciphertext = Buffer.from(parts[1], 'base64url')
    const authTag = Buffer.from(parts[2], 'base64url')
    if (iv.length !== 12 || authTag.length !== 16) return null

    const decipher = createDecipheriv('aes-256-gcm', deriveKey(), iv)
    decipher.setAuthTag(authTag)
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8')

    const payload = JSON.parse(plaintext) as Partial<TokenPayload>
    if (typeof payload.cid !== 'string' || !payload.cid || typeof payload.exp !== 'number') return null
    if (Math.floor(Date.now() / 1000) > payload.exp) return null

    return { customerId: payload.cid }
  } catch {
    return null
  }
}
