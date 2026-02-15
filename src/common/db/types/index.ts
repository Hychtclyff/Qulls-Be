import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import * as schema from "../schema/index.js"; // Pastikan path ini sesuai dengan lokasi schema.ts

// ==========================================
// 1. PUBLIC PORTFOLIO MODULE
// ==========================================

export type Profile = InferSelectModel<typeof schema.profiles>;
export type newProfile = InferInsertModel<typeof schema.profiles>;
export type UpdateProfile = Partial<InferInsertModel<typeof schema.profiles>>;

export type SocialLink = InferSelectModel<typeof schema.socialLinks>;
export type SkillCategory = InferSelectModel<typeof schema.skillCategories>;
export type Skill = InferSelectModel<typeof schema.skills>;
export type DevelopmentMethod = InferSelectModel<
  typeof schema.developmentMethods
>;
export type Experience = InferSelectModel<typeof schema.experiences>;
export type Project = InferSelectModel<typeof schema.projects>;
export type ProjectMember = InferSelectModel<typeof schema.projectMembers>;
export type ProjectSkill = InferSelectModel<typeof schema.projectSkills>;
export type Education = InferSelectModel<typeof schema.education>;
export type CertificateIssuer = InferSelectModel<
  typeof schema.certificateIssuers
>;
export type Certification = InferSelectModel<typeof schema.certifications>;
export type Post = InferSelectModel<typeof schema.posts>;
export type Tag = InferSelectModel<typeof schema.tags>;
export type PostTag = InferSelectModel<typeof schema.postTags>;
export type Testimonial = InferSelectModel<typeof schema.testimonials>;

// ==========================================
// 2. LIFE OS / ADMIN MODULE
// ==========================================

export type Task = InferSelectModel<typeof schema.tasks>;
export type Schedule = InferSelectModel<typeof schema.schedules>;
export type Finance = InferSelectModel<typeof schema.finances>;
export type Strategy = InferSelectModel<typeof schema.strategies>;
export type Habit = InferSelectModel<typeof schema.habits>;
export type Note = InferSelectModel<typeof schema.notes>;
export type AppConfig = InferSelectModel<typeof schema.appConfigs>;
export type Asset = InferSelectModel<typeof schema.assets>;

// ==========================================
// 3. WIDGETS & INTEGRATION
// ==========================================

export type FootballMatch = InferSelectModel<typeof schema.footballMatches>;
export type AnalyticsDaily = InferSelectModel<typeof schema.analyticsDaily>;
export type GithubContribution = InferSelectModel<
  typeof schema.githubContributions
>;
export type SystemLog = InferSelectModel<typeof schema.systemLogs>;

// ==========================================
// 4. COMMUNICATION
// ==========================================

export type InboxMessage = InferSelectModel<typeof schema.inbox>;
export type AIChat = InferSelectModel<typeof schema.aiChats>;

// ==========================================
// OPTIONAL: INSERT TYPES (Useful for forms)
// ==========================================

export type NewProject = InferInsertModel<typeof schema.projects>;
export type NewTask = InferInsertModel<typeof schema.tasks>;
export type NewFinance = InferInsertModel<typeof schema.finances>;
export type NewSchedule = InferInsertModel<typeof schema.schedules>;
export type NewInboxMessage = InferInsertModel<typeof schema.inbox>;
