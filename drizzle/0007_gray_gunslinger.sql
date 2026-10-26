CREATE TYPE "public"."reminder_status" AS ENUM('scheduled', 'sent', 'failed', 'skipped');--> statement-breakpoint
CREATE TYPE "public"."report_notification_status" AS ENUM('pending', 'sent', 'failed');--> statement-breakpoint
CREATE TYPE "public"."report_status" AS ENUM('submitted', 'under_review', 'resolved');--> statement-breakpoint
CREATE TABLE "donation_reminders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"lang" text DEFAULT 'en' NOT NULL,
	"status" "reminder_status" DEFAULT 'scheduled' NOT NULL,
	"scheduled_at" timestamp with time zone NOT NULL,
	"sent_at" timestamp with time zone,
	"attempts" integer DEFAULT 0 NOT NULL,
	"last_error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "problem_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reference_id" text NOT NULL,
	"name" text,
	"email" text,
	"category" text,
	"description" text NOT NULL,
	"status" "report_status" DEFAULT 'submitted' NOT NULL,
	"notification_status" "report_notification_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "problem_reports_reference_id_unique" UNIQUE("reference_id")
);
--> statement-breakpoint
CREATE INDEX "donation_reminders_due_idx" ON "donation_reminders" USING btree ("status","scheduled_at");--> statement-breakpoint
CREATE INDEX "donation_reminders_email_idx" ON "donation_reminders" USING btree ("email");--> statement-breakpoint
CREATE INDEX "problem_reports_status_idx" ON "problem_reports" USING btree ("status");