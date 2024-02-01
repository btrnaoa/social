import { relations } from "drizzle-orm"
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"
import { user } from "./user"

export const post = pgTable("post", {
  id: varchar("id", { length: 21 })
    .$defaultFn(() => nanoid())
    .primaryKey(),
  content: varchar("content", { length: 250 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => user.id),
})

export const postRelations = relations(post, ({ one }) => ({
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
}))

export interface Post {
  id: string
  content: string
  createdAt: Date
  user: {
    id: string
    username: string
  }
}
