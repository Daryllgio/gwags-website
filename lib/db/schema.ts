import { pgTable, pgEnum, uuid, text, integer, boolean, date, timestamp, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

/* Postgres is now the system of record for structured form submissions
   (Scholars, Mbal Lekeaka Fund, Network Affiliation, Partnership). Email
   remains a notification only — see lib/db/submissions.ts for the
   transactional write path and lib/emailRouting.ts for where notifications
   are sent. The Contact form is intentionally NOT part of this schema; it
   stays an email-only submission as before. */

export const submissionStatusEnum = pgEnum('submission_status', [
  'submitted',
  'under_review',
  'shortlisted',
  'approved',
  'rejected',
  'withdrawn',
])

export const formTypeEnum = pgEnum('form_type', [
  'scholars_application',
  'mbal_lekeaka_fund_application',
  'network_affiliation',
  'partnership_submission',
])

/* Common header row shared by every form type. Form-specific fields live in
   their own 1:1 table keyed by submissionId — this table only holds what's
   true of every submission regardless of which form produced it. */
export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  referenceId: text('reference_id').notNull().unique(),
  formType: formTypeEnum('form_type').notNull(),
  status: submissionStatusEnum('status').notNull().default('submitted'),
  applicantName: text('applicant_name').notNull(),
  applicantEmail: text('applicant_email').notNull(),
  /** Client-generated once per form session; the unique constraint is what
   * makes retried/duplicated submit requests a no-op instead of a duplicate
   * row. See lib/db/submissions.ts. */
  idempotencyKey: text('idempotency_key').notNull().unique(),
  submittedAt: timestamp('submitted_at', { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, table => ({
  formTypeIdx: index('submissions_form_type_idx').on(table.formType),
  statusIdx: index('submissions_status_idx').on(table.status),
}))

export const scholarsApplications = pgTable('scholars_applications', {
  submissionId: uuid('submission_id').primaryKey().references(() => submissions.id, { onDelete: 'cascade' }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  university: text('university').notNull(),
  fieldOfStudy: text('field_of_study').notNull(),
  yearOfStudy: text('year_of_study').notNull(),
  writtenResponse: text('written_response').notNull(),
  referral: text('referral'),
  referralOther: text('referral_other'),
})

export const mbalLekeakaFundApplications = pgTable('mbal_lekeaka_fund_applications', {
  submissionId: uuid('submission_id').primaryKey().references(() => submissions.id, { onDelete: 'cascade' }),
  orgName: text('org_name').notNull(),
  yearEstablished: integer('year_established').notNull(),
  country: text('country').notNull(),
  region: text('region').notNull(),
  city: text('city').notNull(),
  // Small, fixed-vocabulary multi-select — a native array column, not a join
  // table, keeps this simple without resorting to a JSON blob.
  sectors: text('sectors').array().notNull(),
  sectorOther: text('sector_other'),
  hasLegalStatus: boolean('has_legal_status').notNull(),
  website: text('website'),
  contactFirstName: text('contact_first_name').notNull(),
  contactLastName: text('contact_last_name').notNull(),
  contactRole: text('contact_role').notNull(),
  contactPhone: text('contact_phone').notNull(),
  contactEmail: text('contact_email').notNull(),
  projectTitle: text('project_title').notNull(),
  projectCountry: text('project_country').notNull(),
  projectRegion: text('project_region').notNull(),
  projectCity: text('project_city').notNull(),
  targetBeneficiaries: text('target_beneficiaries').notNull(),
  estimatedBeneficiaries: integer('estimated_beneficiaries').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  totalBudget: text('total_budget').notNull(),
  amountRequested: text('amount_requested').notNull(),
  q1: text('q1').notNull(),
  q2: text('q2').notNull(),
  q3: text('q3').notNull(),
  q4: text('q4'),
  referral: text('referral'),
  referralOther: text('referral_other'),
})

export const networkAffiliationApplications = pgTable('network_affiliation_applications', {
  submissionId: uuid('submission_id').primaryKey().references(() => submissions.id, { onDelete: 'cascade' }),
  orgName: text('org_name').notNull(),
  yearEstablished: integer('year_established').notNull(),
  country: text('country').notNull(),
  region: text('region').notNull(),
  city: text('city').notNull(),
  sectors: text('sectors').array().notNull(),
  sectorOther: text('sector_other'),
  legalStatus: text('legal_status').notNull(),
  orgEmail: text('org_email'),
  orgPhone: text('org_phone'),
  website: text('website'),
  contactFirstName: text('contact_first_name').notNull(),
  contactLastName: text('contact_last_name').notNull(),
  contactRole: text('contact_role').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone').notNull(),
  teamSize: integer('team_size').notNull(),
  q1: text('q1').notNull(),
  q2: text('q2').notNull(),
  q3: text('q3').notNull(),
  referral: text('referral'),
  referralOther: text('referral_other'),
})

export const partnershipSubmissions = pgTable('partnership_submissions', {
  submissionId: uuid('submission_id').primaryKey().references(() => submissions.id, { onDelete: 'cascade' }),
  contactName: text('contact_name').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone').notNull(),
  orgName: text('org_name').notNull(),
  orgEmail: text('org_email').notNull(),
  orgPhone: text('org_phone'),
  website: text('website'),
  country: text('country').notNull(),
  region: text('region').notNull(),
  city: text('city').notNull(),
  sectors: text('sectors').array().notNull(),
  sectorOther: text('sector_other'),
  orgDesc: text('org_desc').notNull(),
  message: text('message').notNull(),
})

/** One row per uploaded document, for any form type. `category` is a free
 * string rather than an enum since new document kinds may be added per form
 * without a schema migration (e.g. 'academic_transcript', 'legal_status_proof',
 * 'detailed_budget'). Actual file bytes stay in the private Blob store —
 * this only stores enough metadata to locate and describe them. */
export const submissionDocuments = pgTable('submission_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  submissionId: uuid('submission_id').notNull().references(() => submissions.id, { onDelete: 'cascade' }),
  category: text('category').notNull(),
  originalFilename: text('original_filename').notNull(),
  blobPathname: text('blob_pathname').notNull(),
  mimeType: text('mime_type').notNull(),
  fileSize: integer('file_size').notNull(),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true }).notNull().defaultNow(),
}, table => ({
  submissionIdx: index('submission_documents_submission_id_idx').on(table.submissionId),
}))

/** One row per social media link. Shared across every form type that has the
 * dynamic platform+URL rows (Mbal Lekeaka, Network, Partnership) instead of
 * a separate table per form — the shape is identical in every case. */
export const submissionSocialLinks = pgTable('submission_social_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  submissionId: uuid('submission_id').notNull().references(() => submissions.id, { onDelete: 'cascade' }),
  platform: text('platform').notNull(),
  url: text('url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, table => ({
  submissionIdx: index('submission_social_links_submission_id_idx').on(table.submissionId),
}))

export const submissionsRelations = relations(submissions, ({ one, many }) => ({
  scholarsApplication: one(scholarsApplications, { fields: [submissions.id], references: [scholarsApplications.submissionId] }),
  mbalLekeakaFundApplication: one(mbalLekeakaFundApplications, { fields: [submissions.id], references: [mbalLekeakaFundApplications.submissionId] }),
  networkAffiliationApplication: one(networkAffiliationApplications, { fields: [submissions.id], references: [networkAffiliationApplications.submissionId] }),
  partnershipSubmission: one(partnershipSubmissions, { fields: [submissions.id], references: [partnershipSubmissions.submissionId] }),
  documents: many(submissionDocuments),
  socialLinks: many(submissionSocialLinks),
}))

export const scholarsApplicationsRelations = relations(scholarsApplications, ({ one }) => ({
  submission: one(submissions, { fields: [scholarsApplications.submissionId], references: [submissions.id] }),
}))

export const mbalLekeakaFundApplicationsRelations = relations(mbalLekeakaFundApplications, ({ one }) => ({
  submission: one(submissions, { fields: [mbalLekeakaFundApplications.submissionId], references: [submissions.id] }),
}))

export const networkAffiliationApplicationsRelations = relations(networkAffiliationApplications, ({ one }) => ({
  submission: one(submissions, { fields: [networkAffiliationApplications.submissionId], references: [submissions.id] }),
}))

export const partnershipSubmissionsRelations = relations(partnershipSubmissions, ({ one }) => ({
  submission: one(submissions, { fields: [partnershipSubmissions.submissionId], references: [submissions.id] }),
}))

export const submissionDocumentsRelations = relations(submissionDocuments, ({ one }) => ({
  submission: one(submissions, { fields: [submissionDocuments.submissionId], references: [submissions.id] }),
}))

export const submissionSocialLinksRelations = relations(submissionSocialLinks, ({ one }) => ({
  submission: one(submissions, { fields: [submissionSocialLinks.submissionId], references: [submissions.id] }),
}))
