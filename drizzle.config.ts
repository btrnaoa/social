import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({
  path: ".env.local",
})

export default {
  schema: "./lib/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
