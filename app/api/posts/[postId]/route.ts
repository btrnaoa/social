import { getPageSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { posts } from "@/lib/db/schema"
import { postMutateSchema } from "@/lib/validations/post"
import { and, eq } from "drizzle-orm"
import { ZodError, z } from "zod"

const requestContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof requestContextSchema>
) {
  try {
    const { params } = requestContextSchema.parse(context)

    const session = await getPageSession()
    if (!session) {
      return new Response(null, { status: 403 })
    }

    const data = await req.json()
    const body = postMutateSchema.parse(data)

    await db
      .update(posts)
      .set({ content: body.content })
      .where(
        and(eq(posts.id, params.postId), eq(posts.userId, session.user.userId))
      )

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  context: z.infer<typeof requestContextSchema>
) {
  try {
    const { params } = requestContextSchema.parse(context)

    const session = await getPageSession()
    if (!session) {
      return new Response(null, { status: 403 })
    }

    await db
      .delete(posts)
      .where(
        and(eq(posts.id, params.postId), eq(posts.userId, session.user.userId))
      )

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
