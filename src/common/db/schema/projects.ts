import {
  pgTable,
  integer,
  varchar,
  text,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamp.js";

export const projectTable = pgTable("project", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),

  summary: text("summary"),
  contentMarkdown: text("content_markdown"),

  thumbnailUrl: text("thumbnail_url"),
  demoUrl: varchar("demo_url", { length: 255 }),
  repoUrl: varchar("repo_url", { length: 255 }),

  metrics: jsonb("metrics"),

  isFeatured: boolean("is_featured").default(false),

  ...timestamps,
});

export type Project = typeof projectTable.$inferSelect;
export type NewProject = typeof projectTable.$inferInsert;
