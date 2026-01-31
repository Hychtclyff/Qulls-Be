import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/schema.helpers.js";

export const profileTable = pgTable("profile", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  fullName: varchar("full_name", { length: 255 }).notNull(),
  professionalTitle: varchar("professional_title", { length: 150 }).notNull(),

  bioShort: text("bio_short"),
  bioLong: text("bio_long"),

  avatarUrl: text("avatar_url"),
  resumeUrl: text("resume_url"),

  statusLabel: varchar("status_label", { length: 50 }),
  statusColor: varchar("status_color", { length: 20 }),

  ...timestamps,
});

export type Profile = typeof profileTable.$inferSelect;
export type NewProfile = typeof profileTable.$inferInsert;
