import { pgTable, integer, varchar, boolean } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/schema.helpers.js";

export const skillCategoryTable = pgTable("skill_category", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 50 }).notNull(),
  sortOrder: integer("sort_order").default(0),

  ...timestamps,
});

export const skillTable = pgTable("skill", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  categoryId: integer("category_id").references(() => skillCategoryTable.id),

  name: varchar("name", { length: 50 }).notNull(),
  iconKey: varchar("icon_key", { length: 50 }),

  proficiency: integer("proficiency"),
  isFeatured: boolean("is_featured").default(false),

  ...timestamps,
});

export type SkillCategory = typeof skillCategoryTable.$inferSelect;
export type NewSkillCategory = typeof skillCategoryTable.$inferInsert;

export type Skill = typeof skillTable.$inferSelect;
export type NewSkill = typeof skillTable.$inferInsert;
