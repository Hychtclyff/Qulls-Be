import { pgTable, integer, varchar, date, text } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/schema.helpers.js";

export const experienceTable = pgTable("experience", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  companyName: varchar("company_name", { length: 100 }).notNull(),
  roleTitle: varchar("role_title", { length: 100 }).notNull(),
  employmentType: varchar("employment_type", { length: 50 }), // "Full-time", "Contract"

  startDate: date("start_date").notNull(),
  endDate: date("end_date"),

  description: text("description"),
  companyLogoUrl: text("company_logo_url"),

  sortOrder: integer("sort_order").default(0),

  ...timestamps,
});

export type Experience = typeof experienceTable.$inferSelect;
export type NewExperience = typeof experienceTable.$inferInsert;
