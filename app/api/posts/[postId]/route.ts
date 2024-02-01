import { getPageSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { post } from "@/lib/db/schema/post"
import { and, eq } from "drizzle-orm"

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getPageSession()
    if (!session) {
      return new Response(null, { status: 403 })
    }

    await db
      .delete(post)
      .where(
        and(eq(post.id, params.postId), eq(post.userId, session.user.userId))
      )
    return new Response(null, { status: 204 })
  } catch (e) {
    return new Response(null, { status: 500 })
  }
}
