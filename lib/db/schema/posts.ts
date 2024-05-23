import { users } from "@/lib/db/schema"
import { pgTable } from "@/lib/utils"
import { relations } from "drizzle-orm"
import { text, timestamp, varchar } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"

export const posts = pgTable("posts", {
  id: varchar("id", { length: 21 })
    .$defaultFn(() => nanoid())
    .primaryKey(),
  content: varchar("content", { length: 250 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: text("user_id").references(() => users.id),
})

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}))
