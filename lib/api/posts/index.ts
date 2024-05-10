import { db } from "@/lib/db"
import { posts, users } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"

export async function getAllPosts() {
  const allPosts = await db
    .select({
      id: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      user: {
        id: users.id,
        username: users.username,
      },
    })
    .from(posts)
    .innerJoin(users, eq(posts.userId, users.id))
    .orderBy(desc(posts.createdAt))
  return { posts: allPosts }
}
