import {
  pgTable,
  integer,
  varchar,
  date,
  text,
  serial,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamp.js";
import { certifications } from "./certifications.js";
import { profiles } from "./profile.js";
import { projects } from "./projects.js";

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id),
  company: varchar("company", { length: 255 }),
  roleId: varchar("role_id", { length: 255 }),
  roleEn: varchar("role_en", { length: 255 }),
  period: varchar("period", { length: 100 }),
  jobType: varchar("job_type", { length: 100 }),
  descId: text("desc_id"),
  descEn: text("desc_en"),
  certificationId: integer("certification_id").references(
    () => certifications.id,
  ),
  projectId: integer("project_id").references(() => projects.id),

  ...timestamps,
});
