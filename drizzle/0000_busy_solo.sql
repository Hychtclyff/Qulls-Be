CREATE TYPE "public"."skill_category" AS ENUM('frontend', 'backend', 'tools', 'automation', 'soft_skills');--> statement-breakpoint
CREATE TABLE "certification" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" integer,
	"name" varchar(255),
	"issuer" varchar(255),
	"year" varchar(50),
	"image_url" varchar(500),
	"credential_id" varchar(255),
	"desc_id" text,
	"desc_en" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "educations" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" integer,
	"degree_id" varchar(255),
	"degree_en" varchar(255),
	"school" varchar(255),
	"period" varchar(100),
	"desc_id" text,
	"desc_en" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" integer,
	"company" varchar(255),
	"role_id" varchar(255),
	"role_en" varchar(255),
	"period" varchar(100),
	"job_type" varchar(100),
	"desc_id" text,
	"desc_en" text,
	"certification_id" integer,
	"project_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"role_id" varchar(255),
	"role_en" varchar(255),
	"level" varchar(100),
	"image_url" varchar(500),
	"email" varchar(255),
	"location_id" varchar(255),
	"location_en" varchar(255),
	"about_id" text,
	"about_en" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" integer,
	"title_id" varchar(255),
	"title_en" varchar(255),
	"desc_id" text,
	"desc_en" text,
	"image_url" varchar(500),
	"stat_label_id" varchar(100),
	"stat_label_en" varchar(100),
	"stat_value" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"category" "skill_category" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" integer,
	"service_key" varchar(100),
	"icon_name" varchar(100),
	"color_class" varchar(100),
	"bg_class" varchar(100),
	"desc_id" text,
	"desc_en" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" integer,
	"name" varchar(100),
	"handle" varchar(100),
	"url" varchar(500),
	"icon_name" varchar(100),
	"bg_color" varchar(50),
	"text_color" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "cert_skills" (
	"certification_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	CONSTRAINT "cert_skills_certification_id_skill_id_pk" PRIMARY KEY("certification_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "project_skills" (
	"project_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	CONSTRAINT "project_skills_project_id_skill_id_pk" PRIMARY KEY("project_id","skill_id")
);
--> statement-breakpoint
ALTER TABLE "certification" ADD CONSTRAINT "certification_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "educations" ADD CONSTRAINT "educations_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_certification_id_certification_id_fk" FOREIGN KEY ("certification_id") REFERENCES "public"."certification"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cert_skills" ADD CONSTRAINT "cert_skills_certification_id_certification_id_fk" FOREIGN KEY ("certification_id") REFERENCES "public"."certification"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cert_skills" ADD CONSTRAINT "cert_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;