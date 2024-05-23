import { pgTable } from "@/lib/utils"
import { relations } from "drizzle-orm"
import { text, varchar } from "drizzle-orm/pg-core"
import { posts } from "./posts"

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  username: varchar("username", { length: 31 }).unique().notNull(),
  passwordHash: text("password_hash").notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))
