"use server"

import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { validateRequest } from "../auth"
import { db } from "../db"
import { comments } from "../db/schema"

export async function createComment(postId: string, formData: FormData) {
  const { user } = await validateRequest()
  if (!user) return

  const content = formData.get("content")?.toString()
  if (!content) return

  await db.insert(comments).values({ content, postId, userId: user.id })

  revalidatePath("/")
}

export async function updateComment(formData: FormData, commentId: string) {
  const { user } = await validateRequest()
  if (!user) return

  const content = formData.get("content")?.toString()
  if (!content) return

  await db
    .update(comments)
    .set({ content })
    .where(and(eq(comments.id, commentId), eq(comments.userId, user.id)))

  revalidatePath("/")
}

export async function deleteComment(commentId: string) {
  const { user } = await validateRequest()
  if (!user) return

  await db
    .delete(comments)
    .where(and(eq(comments.id, commentId), eq(comments.userId, user.id)))

  revalidatePath("/")
}
