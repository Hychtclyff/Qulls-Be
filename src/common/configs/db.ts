import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
// 1. Import semua skema dari file index utama
import * as schema from "../db/schema/index.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = postgres(process.env.DATABASE_URL, {
  max: 1,
});

// 2. Masukkan skema ke dalam inisialisasi drizzle
export const db = drizzle(sql, { schema });
