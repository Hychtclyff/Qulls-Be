import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/common/db/schema.ts", // Lokasi file schema
  out: "./drizzle", // Folder output hasil generate SQL
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
