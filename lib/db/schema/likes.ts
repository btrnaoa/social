import { pgTable } from "@/lib/utils"
import { relations } from "drizzle-orm"
import { text, timestamp } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"
import { posts, users } from "../schema"

export const likes = pgTable("likes", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id),
})

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}))
