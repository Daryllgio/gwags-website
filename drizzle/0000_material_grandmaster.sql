CREATE TYPE "public"."form_type" AS ENUM('scholars_application', 'mbal_lekeaka_fund_application', 'network_affiliation', 'partnership_submission');--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('submitted', 'under_review', 'shortlisted', 'approved', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TABLE "mbal_lekeaka_fund_applications" (
	"submission_id" uuid PRIMARY KEY NOT NULL,
	"org_name" text NOT NULL,
	"year_established" integer NOT NULL,
	"country" text NOT NULL,
	"region" text NOT NULL,
	"city" text NOT NULL,
	"sectors" text[] NOT NULL,
	"sector_other" text,
	"has_legal_status" boolean NOT NULL,
	"website" text,
	"contact_first_name" text NOT NULL,
	"contact_last_name" text NOT NULL,
	"contact_role" text NOT NULL,
	"contact_phone" text NOT NULL,
	"contact_email" text NOT NULL,
	"project_title" text NOT NULL,
	"project_country" text NOT NULL,
	"project_region" text NOT NULL,
	"project_city" text NOT NULL,
	"target_beneficiaries" text NOT NULL,
	"estimated_beneficiaries" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"total_budget" text NOT NULL,
	"q1" text NOT NULL,
	"q2" text NOT NULL,
	"q3" text NOT NULL,
	"q4" text,
	"referral" text,
	"referral_other" text
);
--> statement-breakpoint
CREATE TABLE "network_affiliation_applications" (
	"submission_id" uuid PRIMARY KEY NOT NULL,
	"org_name" text NOT NULL,
	"year_established" integer NOT NULL,
	"country" text NOT NULL,
	"region" text NOT NULL,
	"city" text NOT NULL,
	"sectors" text[] NOT NULL,
	"sector_other" text,
	"legal_status" text NOT NULL,
	"org_email" text,
	"org_phone" text,
	"website" text,
	"contact_first_name" text NOT NULL,
	"contact_last_name" text NOT NULL,
	"contact_role" text NOT NULL,
	"contact_email" text NOT NULL,
	"contact_phone" text NOT NULL,
	"team_size" integer NOT NULL,
	"q1" text NOT NULL,
	"q2" text NOT NULL,
	"q3" text NOT NULL,
	"referral" text,
	"referral_other" text
);
--> statement-breakpoint
CREATE TABLE "partnership_submissions" (
	"submission_id" uuid PRIMARY KEY NOT NULL,
	"contact_name" text NOT NULL,
	"contact_email" text NOT NULL,
	"contact_phone" text NOT NULL,
	"org_name" text NOT NULL,
	"org_email" text NOT NULL,
	"org_phone" text,
	"website" text,
	"country" text NOT NULL,
	"region" text NOT NULL,
	"city" text NOT NULL,
	"sectors" text[] NOT NULL,
	"sector_other" text,
	"org_desc" text NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scholars_applications" (
	"submission_id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"university" text NOT NULL,
	"field_of_study" text NOT NULL,
	"year_of_study" text NOT NULL,
	"written_response" text NOT NULL,
	"referral" text,
	"referral_other" text
);
--> statement-breakpoint
CREATE TABLE "submission_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"submission_id" uuid NOT NULL,
	"category" text NOT NULL,
	"original_filename" text NOT NULL,
	"blob_pathname" text NOT NULL,
	"mime_type" text NOT NULL,
	"file_size" integer NOT NULL,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submission_social_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"submission_id" uuid NOT NULL,
	"platform" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reference_id" text NOT NULL,
	"form_type" "form_type" NOT NULL,
	"status" "submission_status" DEFAULT 'submitted' NOT NULL,
	"applicant_name" text NOT NULL,
	"applicant_email" text NOT NULL,
	"idempotency_key" text NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "submissions_reference_id_unique" UNIQUE("reference_id"),
	CONSTRAINT "submissions_idempotency_key_unique" UNIQUE("idempotency_key")
);
--> statement-breakpoint
ALTER TABLE "mbal_lekeaka_fund_applications" ADD CONSTRAINT "mbal_lekeaka_fund_applications_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "network_affiliation_applications" ADD CONSTRAINT "network_affiliation_applications_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partnership_submissions" ADD CONSTRAINT "partnership_submissions_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scholars_applications" ADD CONSTRAINT "scholars_applications_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission_documents" ADD CONSTRAINT "submission_documents_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission_social_links" ADD CONSTRAINT "submission_social_links_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "submission_documents_submission_id_idx" ON "submission_documents" USING btree ("submission_id");--> statement-breakpoint
CREATE INDEX "submission_social_links_submission_id_idx" ON "submission_social_links" USING btree ("submission_id");--> statement-breakpoint
CREATE INDEX "submissions_form_type_idx" ON "submissions" USING btree ("form_type");--> statement-breakpoint
CREATE INDEX "submissions_status_idx" ON "submissions" USING btree ("status");