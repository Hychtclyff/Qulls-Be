import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { profiles } from "./profile.js";
import { timestamps } from "../helpers/timestamp.js";

export const education = pgTable("educations", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id),
  degreeId: varchar("degree_id", { length: 255 }),
  degreeEn: varchar("degree_en", { length: 255 }),
  school: varchar("school", { length: 255 }),
  period: varchar("period", { length: 100 }),
  descId: text("desc_id"),
  descEn: text("desc_en"),
  ...timestamps,
});
