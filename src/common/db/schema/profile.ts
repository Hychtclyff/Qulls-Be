import { pgTable, integer, varchar, text, serial } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamp.js";

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  roleId: varchar("role_id", { length: 255 }),
  roleEn: varchar("role_en", { length: 255 }),
  level: varchar("level", { length: 100 }),
  imageUrl: varchar("image_url", { length: 500 }),
  email: varchar("email", { length: 255 }).unique(),
  locationId: varchar("location_id", { length: 255 }),
  locationEn: varchar("location_en", { length: 255 }),
  aboutId: text("about_id"),
  aboutEn: text("about_en"),
  ...timestamps,
});
