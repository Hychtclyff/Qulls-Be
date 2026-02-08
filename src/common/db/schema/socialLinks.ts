import {
  pgTable,
  integer,
  varchar,
  text,
  boolean,
  serial,
} from "drizzle-orm/pg-core";
import { profiles } from "./profile.js";

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 100 }),
  handle: varchar("handle", { length: 100 }),
  url: varchar("url", { length: 500 }),
  iconName: varchar("icon_name", { length: 100 }),
  bgColor: varchar("bg_color", { length: 50 }),
  textColor: varchar("text_color", { length: 50 }),
});
