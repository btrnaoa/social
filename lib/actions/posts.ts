"use server"

import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { validateRequest } from "../auth"
import { db } from "../db"
import { posts } from "../db/schema"

export async function createPost(content: string) {
  const { user } = await validateRequest()

  if (!user) return

  await db.insert(posts).values({ content, userId: user.id })

  revalidatePath("/")
}

export async function updatePost({
  postId,
  content,
}: {
  postId: string
  content: string
}) {
  const { user } = await validateRequest()

  if (!user) return

  await db
    .update(posts)
    .set({ content })
    .where(and(eq(posts.id, postId), eq(posts.userId, user.id)))

  revalidatePath("/")
}

export async function deletePost({ postId }: { postId: string }) {
  const { user } = await validateRequest()

  if (!user) return

  await db
    .delete(posts)
    .where(and(eq(posts.id, postId), eq(posts.userId, user.id)))

  revalidatePath("/")
}
