import { pgTable, varchar } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"
import { user } from "./user"

export const post = pgTable("post", {
  id: varchar("id", { length: 21 })
    .$defaultFn(() => nanoid())
    .primaryKey(),
  content: varchar("content", { length: 250 }).notNull(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => user.id),
})

export type Post = typeof post.$inferSelect
