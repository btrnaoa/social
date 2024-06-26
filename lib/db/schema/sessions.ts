import { pgTable } from "@/lib/utils"
import { text, timestamp } from "drizzle-orm/pg-core"
import { users } from "../schema"

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})
