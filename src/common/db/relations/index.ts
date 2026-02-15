// ==========================================
// RELATIONS DEFINITIONS
// ==========================================

import { relations } from "drizzle-orm";
import {
  certificateIssuers,
  certifications,
  developmentMethods,
  experiences,
  posts,
  postTags,
  profiles,
  projectMembers,
  projects,
  projectSkills,
  skillCategories,
  skills,
  socialLinks,
  tags,
  tasks,
} from "../schema/index.js";

export const profilesRelations = relations(profiles, ({ many }) => ({
  socialLinks: many(socialLinks),
}));

export const socialLinksRelations = relations(socialLinks, ({ one }) => ({
  profile: one(profiles, {
    fields: [socialLinks.profileId],
    references: [profiles.id],
  }),
}));

export const skillCategoriesRelations = relations(
  skillCategories,
  ({ many }) => ({
    skills: many(skills),
  }),
);

export const skillsRelations = relations(skills, ({ one, many }) => ({
  category: one(skillCategories, {
    fields: [skills.categoryId],
    references: [skillCategories.id],
  }),
  projects: many(projectSkills),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  method: one(developmentMethods, {
    fields: [projects.methodId],
    references: [developmentMethods.id],
  }),
  experience: one(experiences, {
    fields: [projects.experienceId],
    references: [experiences.id],
  }),
  members: many(projectMembers),
  skills: many(projectSkills),
  tasks: many(tasks),
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

export const tasksRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
}));

export const postsRelations = relations(posts, ({ many }) => ({
  tags: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));

export const certificationsRelations = relations(certifications, ({ one }) => ({
  issuer: one(certificateIssuers, {
    fields: [certifications.issuerId],
    references: [certificateIssuers.id],
  }),
}));
