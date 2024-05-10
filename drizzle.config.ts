import * as dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"
import { tablePrefix } from "./lib/constants"

dotenv.config({
  path: ".env.local",
})

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema/index.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: [`${tablePrefix}_*`],
  verbose: true,
  strict: true,
})
