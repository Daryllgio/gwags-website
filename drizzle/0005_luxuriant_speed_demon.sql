ALTER TYPE "public"."form_type" ADD VALUE 'volunteer_submission';--> statement-breakpoint
CREATE TABLE "volunteer_submissions" (
	"submission_id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"gender" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"country" text NOT NULL,
	"region" text NOT NULL,
	"city" text NOT NULL,
	"current_status" text NOT NULL,
	"current_status_other" text,
	"field_or_profession" text NOT NULL,
	"languages" text[] NOT NULL,
	"skills" text[] NOT NULL,
	"skills_other" text,
	"availability" text NOT NULL,
	"referral" text NOT NULL,
	"referral_other" text
);
--> statement-breakpoint
ALTER TABLE "volunteer_submissions" ADD CONSTRAINT "volunteer_submissions_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;