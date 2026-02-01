import { pgTable, integer, varchar, text, boolean } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamp.js";

export const contactMessageTable = pgTable("contact_message", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),

  isRead: boolean("is_read").default(false),

  ...timestamps,
});

export type ContactMessage = typeof contactMessageTable.$inferSelect;
export type NewContactMessage = typeof contactMessageTable.$inferInsert;
