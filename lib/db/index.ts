import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { Pool } from "pg"

const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql)

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
