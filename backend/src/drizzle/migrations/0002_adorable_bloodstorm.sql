CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"author" text,
	"publication_year" integer
);
--> statement-breakpoint
DROP TABLE "profiles";--> statement-breakpoint
DROP TABLE "users";