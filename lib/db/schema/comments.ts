import { posts, users } from "@/lib/db/schema"
import { pgTable } from "@/lib/utils"
import { relations } from "drizzle-orm"
import { text, timestamp, varchar } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"

export const comments = pgTable("comments", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .primaryKey(),
  content: varchar("content", { length: 250 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id),
})

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}))
