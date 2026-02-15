// ==========================================
// 1. PUBLIC PORTFOLIO MODULE
// ==========================================

import {
  boolean,
  check,
  date,
  decimal,
  integer,
  json,
  pgTable,
  primaryKey,
  text,
  time,
  timestamp,
} from "drizzle-orm/pg-core";
import { commonId, createdOnly, timestamps } from "../helpers/timestamp.js";
import { relations, sql } from "drizzle-orm";

export const profiles = pgTable(
  "profiles",
  {
    ...commonId,
    fullName: text("full_name").notNull(),
    roleId: text("role_id").notNull(),
    roleEn: text("role_en").notNull(),
    level: text("level"), // e.g., Object Control Authority: 50
    aboutId: text("about_id"),
    aboutEn: text("about_en"),
    imageUrl: text("image_url"),
    email: text("email").notNull(),
    location: text("location"),
    cvUrl: text("cv_url"),
    ...createdOnly,
  },
  (table) => [check("single_row_check", sql`${table.id} = 1`)],
);

export const socialLinks = pgTable("social_links", {
  ...commonId,
  profileId: integer("profile_id")
    .references(() => profiles.id)
    .notNull(),
  name: text("name").notNull(),
  handle: text("handle"),
  url: text("url").notNull(),
  iconName: text("icon_name").notNull(),
  bgColor: text("bg_color"),
});

export const skillCategories = pgTable("skill_categories", {
  ...commonId,
  name: text("name").notNull(), // Frontend, Backend, etc.
  iconName: text("icon_name"),
});

export const skills = pgTable("skills", {
  ...commonId,
  name: text("name").notNull(),
  categoryId: integer("category_id").references(() => skillCategories.id),
  iconName: text("icon_name"),
  imageUrl: text("image_url"),
  proficiency: integer("proficiency").default(0),
});

export const developmentMethods = pgTable("development_methods", {
  ...commonId,
  name: text("name").notNull(), // Agile, Scrum
});

export const experiences = pgTable("experiences", {
  ...commonId,
  company: text("company").notNull(),
  roleId: text("role_id").notNull(),
  roleEn: text("role_en").notNull(),
  period: text("period").notNull(),
  jobType: text("job_type"), // Full-time, Contract
  logoUrl: text("logo_url"),
  descId: text("desc_id"),
  descEn: text("desc_en"),
});

export const projects = pgTable("projects", {
  ...commonId,
  // Content
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  descId: text("desc_id"),
  descEn: text("desc_en"),
  imageUrl: text("image_url"),
  demoUrl: text("demo_url"),

  // Relations
  methodId: integer("method_id").references(() => developmentMethods.id),
  experienceId: integer("experience_id").references(() => experiences.id),

  // GitHub Integration
  repoUrl: text("repo_url"),
  githubRepoId: text("github_repo_id"),
  githubStars: integer("github_stars").default(0),
  githubForks: integer("github_forks").default(0),
  githubLanguage: text("github_language"),
  githubTopics: text("github_topics"), // Stored as CSV string or use json array if preferred
  lastPushedAt: timestamp("last_pushed_at"),
  isOpenSource: boolean("is_open_source").default(true),

  // Dashboard Control
  status: text("status").default("Active"), // Active, Development, Finished
  progress: integer("progress").default(0),
  priority: text("priority").default("Medium"),
  isFeatured: boolean("is_featured").default(false),
  public: boolean("public").default(true),

  ...timestamps,
});

export const projectMembers = pgTable("project_members", {
  ...commonId,
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  name: text("name").notNull(),
  role: text("role"),
  avatarUrl: text("avatar_url"),
});

export const projectSkills = pgTable(
  "project_skills",
  {
    projectId: integer("project_id")
      .references(() => projects.id)
      .notNull(),
    skillId: integer("skill_id")
      .references(() => skills.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.projectId, t.skillId] }),
  }),
);

export const education = pgTable("education", {
  ...commonId,
  school: text("school").notNull(),
  degreeId: text("degree_id").notNull(),
  degreeEn: text("degree_en").notNull(),
  logoUrl: text("logo_url"),
  period: date("period"), // Or text if you want "2020-2024" range
  descId: text("desc_id"),
  descEn: text("desc_en"),
});

export const certificateIssuers = pgTable("certificate_issuers", {
  ...commonId,
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
});

export const certifications = pgTable("certifications", {
  ...commonId,
  name: text("name").notNull(),
  issuerId: integer("issuer_id").references(() => certificateIssuers.id),
  year: text("year"),
  url: text("url"),
  credentialId: text("credential_id"),
});

// -- Blog / Library --
export const posts = pgTable("posts", {
  ...commonId,
  slug: text("slug").unique().notNull(),
  titleId: text("title_id"),
  titleEn: text("title_en").notNull(),
  contentId: text("content_id"),
  contentEn: text("content_en"),
  coverImage: text("cover_image"),
  videoUrl: text("video_url"),
  isPublished: boolean("is_published").default(false),
  views: integer("views").default(0),
  ...timestamps,
});

export const tags = pgTable("tags", {
  ...commonId,
  name: text("name").notNull(),
  color: text("color"),
});

export const postTags = pgTable(
  "post_tags",
  {
    postId: integer("post_id")
      .references(() => posts.id)
      .notNull(),
    tagId: integer("tag_id")
      .references(() => tags.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.tagId] }),
  }),
);

export const testimonials = pgTable("testimonials", {
  ...commonId,
  name: text("name").notNull(),
  role: text("role"),
  company: text("company"),
  contentId: text("content_id"),
  contentEn: text("content_en"),
  avatarUrl: text("avatar_url"),
  rating: integer("rating").default(5),
  isFeatured: boolean("is_featured").default(false),
});

// ==========================================
// 2. LIFE OS / ADMIN MODULE
// ==========================================

export const tasks = pgTable("tasks", {
  ...commonId,
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").default("todo"), // todo, active, done
  priority: text("priority").default("Medium"),
  type: text("type").default("Main Quest"),
  dueDate: date("due_date"),
  projectId: integer("project_id").references(() => projects.id), // Optional link
  ...createdOnly,
});

export const schedules = pgTable("schedules", {
  ...commonId,
  title: text("title").notNull(),
  type: text("type"), // Briefing, Training, etc.
  date: date("date").notNull(),
  startTime: time("start_time"),
  endTime: time("end_time"),
  location: text("location"),
  colorClass: text("color_class"), // Tailwind class
  isCompleted: boolean("is_completed").default(false),
});

export const finances = pgTable("finances", {
  ...commonId,
  title: text("title").notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  type: text("type").notNull(), // income, expense
  category: text("category"), // Quest, Trade, etc.
  transactionDate: date("transaction_date").defaultNow(),
  notes: text("notes"),
});

export const strategies = pgTable("strategies", {
  ...commonId,
  title: text("title").notNull(),
  category: text("category"), // Skill, Career, Finance
  type: text("type").default("short"), // short, long
  status: text("status").default("Planning"),
  deadline: text("deadline"), // Flexible text like "Q3 2025"
  progress: integer("progress").default(0),
  notes: text("notes"),
});

export const habits = pgTable("habits", {
  ...commonId,
  title: text("title").notNull(),
  streak: integer("streak").default(0),
  isCompletedToday: boolean("is_completed_today").default(false),
  lastCompletedAt: timestamp("last_completed_at"),
  targetFrequency: text("target_frequency").default("daily"),
});

export const notes = pgTable("notes", {
  ...commonId,
  content: text("content").notNull(),
  category: text("category").default("System Memo"),
  ...timestamps,
});

export const appConfigs = pgTable("app_configs", {
  ...commonId,
  key: text("key").unique().notNull(),
  value: text("value"),
  description: text("description"),
  isPublic: boolean("is_public").default(false),
});

export const assets = pgTable("assets", {
  ...commonId,
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  altText: text("alt_text"),
  type: text("type"), // image/png
  sizeKb: integer("size_kb"),
  width: integer("width"),
  height: integer("height"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

// ==========================================
// 3. WIDGETS & INTEGRATION
// ==========================================

export const footballMatches = pgTable("football_matches", {
  ...commonId,
  opponentName: text("opponent_name").notNull(),
  competition: text("competition"),
  matchDate: date("match_date"),
  matchTime: time("match_time"),
  isHome: boolean("is_home").default(true),
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  status: text("status").default("Upcoming"),
  logoUrl: text("logo_url"),
});

export const analyticsDaily = pgTable("analytics_daily", {
  ...commonId,
  date: date("date").unique().notNull(),
  views: integer("views").default(0),
  uniqueVisitors: integer("unique_visitors").default(0),
  metadata: json("metadata"),
});

export const githubContributions = pgTable("github_contributions", {
  ...commonId,
  date: date("date").notNull(),
  count: integer("count").default(0),
});

export const systemLogs = pgTable("system_logs", {
  ...commonId,
  action: text("action").notNull(),
  details: text("details"),
  ...createdOnly,
});

// ==========================================
// 4. UNIVERSAL INBOX
// ==========================================

export const inbox = pgTable("inbox", {
  ...commonId,
  senderName: text("sender_name").notNull(),
  senderEmail: text("sender_email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  attachmentUrl: text("attachment_url"),

  type: text("type").default("General Message"), // Bug Report, Hiring
  source: text("source").default("Web Portfolio"),

  // Bug Specifics
  severity: text("severity"),
  deviceInfo: text("device_info"),

  status: text("status").default("New"),
  isRead: boolean("is_read").default(false),

  resolvedAt: timestamp("resolved_at"),
  ...createdOnly,
});

export const aiChats = pgTable("ai_chats", {
  ...commonId,
  role: text("role").notNull(), // user, assistant
  content: text("content").notNull(),
  ...createdOnly,
});

// ==========================================
// RELATIONS DEFINITIONS
// ==========================================

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
