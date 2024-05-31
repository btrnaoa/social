"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { validateRequest } from "../auth"
import { db } from "../db"
import { likes } from "../db/schema"

export async function likePost(postId: string) {
  const { user } = await validateRequest()
  if (!user) return

  const like = await db.query.likes.findFirst({
    where: (likes, { and, eq }) =>
      and(eq(likes.postId, postId), eq(likes.userId, user.id)),
  })

  if (like) {
    await db.delete(likes).where(eq(likes.id, like.id))
  } else {
    await db.insert(likes).values({ postId, userId: user.id })
  }

  revalidatePath("/")
}
