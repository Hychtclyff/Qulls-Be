import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { profiles } from "./profile.js";
import { timestamps } from "../helpers/timestamp.js";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id),
  serviceKey: varchar("service_key", { length: 100 }),
  iconName: varchar("icon_name", { length: 100 }),
  colorClass: varchar("color_class", { length: 100 }),
  bgClass: varchar("bg_class", { length: 100 }),
  descId: text("desc_id"),
  descEn: text("desc_en"),
  ...timestamps,
});
