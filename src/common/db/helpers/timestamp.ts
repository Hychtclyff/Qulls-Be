import { serial, timestamp } from "drizzle-orm/pg-core";

export const commonId = {
  id: serial("id").primaryKey(),
};

export const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const createdOnly = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
};
