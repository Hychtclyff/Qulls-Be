import {
  pgTable,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/schema.helpers.js";

export const blogPostTable = pgTable("blog_post", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),

  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: text("cover_image"),

  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),

  tags: text("tags").array(),

  ...timestamps,
});

export type BlogPost = typeof blogPostTable.$inferSelect;
export type NewBlogPost = typeof blogPostTable.$inferInsert;
