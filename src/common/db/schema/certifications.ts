import { pgTable, integer, varchar, date, text } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamp.js";

export const certificationTable = pgTable("certification", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 200 }).notNull(),
  issuer: varchar("issuer", { length: 100 }).notNull(),

  issueDate: date("issue_date"),

  credentialId: varchar("credential_id", { length: 100 }),
  credentialUrl: varchar("credential_url", { length: 255 }),

  imageUrl: text("image_url"),

  skillsTags: text("skills_tags").array(),

  ...timestamps,
});

export type Certification = typeof certificationTable.$inferSelect;
export type NewCertification = typeof certificationTable.$inferInsert;
