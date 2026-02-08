import {
  pgTable,
  integer,
  varchar,
  text,
  jsonb,
  boolean,
  serial,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamp.js";
import { profiles } from "./profile.js";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id),
  titleId: varchar("title_id", { length: 255 }),
  titleEn: varchar("title_en", { length: 255 }),
  descId: text("desc_id"),
  descEn: text("desc_en"),
  imageUrl: varchar("image_url", { length: 500 }),
  statLabelId: varchar("stat_label_id", { length: 100 }),
  statLabelEn: varchar("stat_label_en", { length: 100 }),
  statValue: varchar("stat_value", { length: 100 }),

  ...timestamps,
});
