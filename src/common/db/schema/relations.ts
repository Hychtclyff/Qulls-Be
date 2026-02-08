import { relations } from "drizzle-orm";
import { projects } from "./projects.js";
import { skills } from "./skills.js";
import { certSkills, projectSkills } from "./pivotTable.js";

// --- RELATIONS (Drizzle Relations API) ---

export const projectRelations = relations(projects, ({ many }) => ({
  skills: many(projectSkills),
}));

export const skillRelations = relations(skills, ({ many }) => ({
  projectSkills: many(projectSkills),
  certSkills: many(certSkills),
}));

export const projectSkillsRelations = relations(projectSkills, ({ one }) => ({
  project: one(projects, {
    fields: [projectSkills.projectId],
    references: [projects.id],
  }),
  skill: one(skills, {
    fields: [projectSkills.skillId],
    references: [skills.id],
  }),
}));
