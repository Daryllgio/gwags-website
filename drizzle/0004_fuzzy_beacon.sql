ALTER TABLE "partnership_submissions" ADD COLUMN "contact_first_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "partnership_submissions" ADD COLUMN "contact_last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "partnership_submissions" ADD COLUMN "contact_role" text NOT NULL;--> statement-breakpoint
ALTER TABLE "partnership_submissions" DROP COLUMN "contact_name";
