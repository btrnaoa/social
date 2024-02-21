import { db } from "@/lib/db"
import { post } from "@/lib/db/schema/post"
import { user } from "@/lib/db/schema/user"
import { desc, eq } from "drizzle-orm"

export async function getAllPosts() {
  const posts = await db
    .select({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      user: {
        id: user.id,
        username: user.username,
      },
    })
    .from(post)
    .innerJoin(user, eq(post.userId, user.id))
    .orderBy(desc(post.createdAt))
  return { posts }
}
