import { pgTable } from "@/lib/utils"
import { relations } from "drizzle-orm"
import { bigint, varchar } from "drizzle-orm/pg-core"
import { posts } from "./posts"

export const users = pgTable("auth_user", {
  id: varchar("id", { length: 15 }).primaryKey(),
  username: varchar("username", { length: 31 }).notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const sessions = pgTable("user_session", {
  id: varchar("id", { length: 128 }).primaryKey(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => users.id),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
})

export const keys = pgTable("user_key", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => users.id),
  hashedPassword: varchar("hashed_password", { length: 255 }),
})
