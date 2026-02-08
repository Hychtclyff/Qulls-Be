import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { projects } from "./projects.js";
import { skills } from "./skills.js";
import { certifications } from "./certifications.js";

export const projectSkills = pgTable(
  "project_skills",
  {
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    skillId: integer("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.projectId, t.skillId] }),
  }),
);

export const certSkills = pgTable(
  "cert_skills",
  {
    certificationId: integer("certification_id")
      .notNull()
      .references(() => certifications.id, { onDelete: "cascade" }),
    skillId: integer("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.certificationId, t.skillId] }),
  }),
);
