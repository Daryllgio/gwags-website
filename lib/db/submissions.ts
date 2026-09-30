import 'server-only'
import { eq } from 'drizzle-orm'
import { db } from './client'
import { submissions, submissionDocuments, submissionSocialLinks } from './schema'
import { generateReferenceId } from './referenceId'

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0]

export type FormType = (typeof submissions.$inferInsert)['formType']

export interface DocumentInput {
  category: string
  originalFilename: string
  blobPathname: string
  mimeType: string
  fileSize: number
}

export interface SocialLinkInput {
  platform: string
  url: string
}

export interface CreateSubmissionInput {
  formType: FormType
  idempotencyKey: string
  applicantName: string
  applicantEmail: string
  documents?: DocumentInput[]
  socialLinks?: SocialLinkInput[]
  /** Inserts the form-specific row (scholars_applications, etc.) for this
   * submission, inside the same transaction. */
  insertFormRow: (tx: Tx, submissionId: string) => Promise<void>
}

export interface SubmissionResult {
  id: string
  referenceId: string
}

/** Looks up an existing submission by its client-generated idempotency key.
 * Callers should check this BEFORE uploading any files, so a retried/duplicated
 * submit request never re-uploads to Blob, not just never re-inserts a row. */
export async function findSubmissionByIdempotencyKey(idempotencyKey: string): Promise<SubmissionResult | null> {
  const rows = await db
    .select({ id: submissions.id, referenceId: submissions.referenceId })
    .from(submissions)
    .where(eq(submissions.idempotencyKey, idempotencyKey))
    .limit(1)
  return rows[0] ?? null
}

/** Creates the submission header row, the form-specific row, and any
 * document/social-link rows in a single transaction — so a failure partway
 * through (e.g. the form-specific insert violates a constraint) never leaves
 * a submission row with no corresponding detail row.
 *
 * Returns null if a concurrent request already inserted the same
 * idempotency key (the race window between a caller's own pre-check and this
 * insert) — the caller should treat that as "already submitted", not an
 * error, and look the existing record up via findSubmissionByIdempotencyKey. */
export async function createSubmission(input: CreateSubmissionInput): Promise<SubmissionResult | null> {
  return db.transaction(async tx => {
    const referenceId = generateReferenceId(input.formType)

    const [row] = await tx
      .insert(submissions)
      .values({
        referenceId,
        formType: input.formType,
        applicantName: input.applicantName,
        applicantEmail: input.applicantEmail,
        idempotencyKey: input.idempotencyKey,
      })
      .onConflictDoNothing({ target: submissions.idempotencyKey })
      .returning({ id: submissions.id, referenceId: submissions.referenceId })

    if (!row) {
      return null
    }

    await input.insertFormRow(tx, row.id)

    if (input.documents?.length) {
      await tx.insert(submissionDocuments).values(
        input.documents.map(d => ({
          submissionId: row.id,
          category: d.category,
          originalFilename: d.originalFilename,
          blobPathname: d.blobPathname,
          mimeType: d.mimeType,
          fileSize: d.fileSize,
        })),
      )
    }

    if (input.socialLinks?.length) {
      await tx.insert(submissionSocialLinks).values(
        input.socialLinks.map(s => ({
          submissionId: row.id,
          platform: s.platform,
          url: s.url,
        })),
      )
    }

    return row
  })
}
