CREATE TABLE "portal_link_redemptions" (
	"jti" text PRIMARY KEY NOT NULL,
	"redeemed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
