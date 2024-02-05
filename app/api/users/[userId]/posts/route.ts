import { db } from "@/lib/db"
import { post } from "@/lib/db/schema/post"
import { eq } from "drizzle-orm"
import { ZodError, z } from "zod"

const requestContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof requestContextSchema>
) {
  try {
    const { params } = requestContextSchema.parse(context)

    const posts = await db
      .select()
      .from(post)
      .where(eq(post.userId, params.userId))
    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return new Response(JSON.stringify(e.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
