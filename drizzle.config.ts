import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // UBAH INI: Jangan pakai *.ts, tapi tembak ke file index
  schema: "./src/common/db/*/**.ts",
  out: "./drizzle",

  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
