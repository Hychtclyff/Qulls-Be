import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  boolean,
  serial,
  pgEnum,
} from "drizzle-orm/pg-core";

export const skillCategoryEnum = pgEnum("skill_category", [
  "frontend",
  "backend",
  "tools",
  "automation",
  "soft_skills",
]);

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  category: skillCategoryEnum("category").notNull(), // Menggunakan enum di kolom
});
