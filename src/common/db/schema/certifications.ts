import {
  pgTable,
  integer,
  varchar,
  date,
  text,
  serial,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamp.js";
import { profiles } from "./profile.js";

export const certifications = pgTable("certification", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id),
  name: varchar("name", { length: 255 }),
  issuer: varchar("issuer", { length: 255 }),
  year: varchar("year", { length: 50 }),
  imageUrl: varchar("image_url", { length: 500 }),
  credentialId: varchar("credential_id", { length: 255 }),
  descId: text("desc_id"),
  descEn: text("desc_en"),

  ...timestamps,
});
