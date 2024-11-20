CREATE TABLE IF NOT EXISTS "building" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"floors" integer DEFAULT 2 NOT NULL,
	"owners_name" text DEFAULT 'Unknown' NOT NULL,
	"owners_phone_no" text NOT NULL,
	"location" text DEFAULT 'Unknown' NOT NULL,
	"building_units" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "building_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "buildingOwner" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"phone_no" text NOT NULL,
	"building_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "houses" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"unit_name" text,
	"phone_no" text NOT NULL,
	"building_name" text,
	"unit_type" text NOT NULL,
	"rentalamount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenant" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"unit_name" text,
	"phone_no" text NOT NULL,
	"building_name" text NOT NULL,
	"unit_type" text NOT NULL,
	"rentalamount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "unit" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"phone_no" text NOT NULL,
	"building_name" text NOT NULL
);
