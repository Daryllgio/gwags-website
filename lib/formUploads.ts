import 'server-only'
import { put, del } from '@vercel/blob'

/* Server-only foundation for future form file uploads (CVs, transcripts,
   supporting documents, etc.) to the private `gwags-form-uploads` Vercel
   Blob store. No form currently calls this — it exists so upcoming forms
   share one validated, consistently-pathed upload/delete implementation
   instead of each reinventing it.

   Auth: the connected store injects BLOB_READ_WRITE_TOKEN into
   Production/Preview/Development automatically (no token was created by
   hand). The installed @vercel/blob SDK has no OIDC path for put()/del()
   as of this version — OIDC there is scoped to the image-optimization
   putImage() helper, not plain blob storage — so the auto-provisioned
   token is the correct mechanism, not a workaround. */

// ── Config — centralized so limits/types are a one-line change later ──

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

/** MIME type → accepted file extensions. Both must agree on upload (see
 * validateFile) since neither a browser-supplied MIME type nor a filename
 * extension is trustworthy on its own. */
export const ALLOWED_FILE_TYPES: Record<string, string[]> = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  // Added for the Scholars/Mbal Lekeaka/Network forms, whose upload fields
  // advertise "PDF, DOC, DOCX" — legacy .doc wasn't previously accepted.
  'application/msword': ['.doc'],
  // Added for the Mbal Lekeaka Fund application's detailed budget upload.
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
}

// ── Result types — lets callers distinguish every outcome without try/catch ──

export type FormUploadErrorCode = 'invalid_type' | 'file_too_large' | 'storage_failure'

export type UploadFormFileResult =
  | { ok: true; url: string; pathname: string }
  | { ok: false; code: FormUploadErrorCode; message: string }

export type DeleteFormFileResult =
  | { ok: true }
  | { ok: false; code: 'storage_failure'; message: string }

// ── Validation ──

function getExtension(filename: string): string {
  const idx = filename.lastIndexOf('.')
  return idx === -1 ? '' : filename.slice(idx).toLowerCase()
}

/** Rejects on size or type. Checked here regardless of any client-side
 * validation a form may add later — the browser's reported `file.type`
 * and `file.name` are both attacker-controlled input. */
export function validateFile(file: { name: string; size: number; type: string }):
  | { ok: true }
  | { ok: false; code: FormUploadErrorCode; message: string } {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      ok: false,
      code: 'file_too_large',
      message: `File exceeds the ${Math.floor(MAX_FILE_SIZE_BYTES / (1024 * 1024))}MB limit.`,
    }
  }

  const allowedExts = ALLOWED_FILE_TYPES[file.type]
  const ext = getExtension(file.name)
  if (!allowedExts || !allowedExts.includes(ext)) {
    return { ok: false, code: 'invalid_type', message: 'File type not permitted.' }
  }

  return { ok: true }
}

// ── Filename + path handling ──

/** Strips accents, path separators, and anything but alphanumerics/-/_ from
 * the filename's base (extension is preserved separately), so the result is
 * always a single flat, safe path segment. */
export function sanitizeFilename(filename: string): string {
  const ext = getExtension(filename)
  const base = filename.slice(0, filename.length - ext.length)

  const cleanBase = base
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100)

  return `${cleanBase || 'file'}${ext}`
}

function uniqueId(): string {
  return crypto.randomUUID()
}

/** form-uploads/{formType}/{year}/{month}/{unique-id}-{sanitized-filename}
 *
 * `formType` is caller-supplied (e.g. "scholars-application") rather than a
 * fixed enum, since the forms that will use this don't exist yet. It's
 * still sanitized the same way a filename is, so an unexpected value can't
 * escape the intended path shape. */
export function buildStoragePath(formType: string, originalFilename: string): string {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const safeFormType = formType.trim().replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-|-$/g, '') || 'general'
  const sanitized = sanitizeFilename(originalFilename)

  return `form-uploads/${safeFormType}/${year}/${month}/${uniqueId()}-${sanitized}`
}

// ── Upload / delete ──

/** Validates, then uploads to the private store under a fresh, collision-proof
 * path. `formType` groups uploads by which future form produced them (e.g.
 * "scholars-application", "partner-inquiry") — pass anything stable per form. */
export async function uploadFormFile(formType: string, file: File): Promise<UploadFormFileResult> {
  const validation = validateFile(file)
  if (!validation.ok) return validation

  const pathname = buildStoragePath(formType, file.name)

  try {
    const blob = await put(pathname, file, {
      access: 'private',
      contentType: file.type,
      addRandomSuffix: false,
      allowOverwrite: false,
    })
    return { ok: true, url: blob.url, pathname: blob.pathname }
  } catch (err) {
    return {
      ok: false,
      code: 'storage_failure',
      message: err instanceof Error ? err.message : 'Upload failed.',
    }
  }
}

/** Accepts either the blob's pathname or its full URL — both are valid
 * identifiers for `del()`. */
export async function deleteFormFile(urlOrPathname: string): Promise<DeleteFormFileResult> {
  try {
    await del(urlOrPathname)
    return { ok: true }
  } catch (err) {
    return {
      ok: false,
      code: 'storage_failure',
      message: err instanceof Error ? err.message : 'Delete failed.',
    }
  }
}
