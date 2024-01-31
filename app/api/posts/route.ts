import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { post } from "@/lib/db/schema/post"
import { user } from "@/lib/db/schema/user"
import { postCreateSchema } from "@/lib/validations/post"
import { eq } from "drizzle-orm"
import * as context from "next/headers"
import { ZodError } from "zod"

export async function GET(req: Request) {
  const posts = await db
    .select({
      id: post.id,
      content: post.content,
      user: {
        username: user.username,
      },
    })
    .from(post)
    .innerJoin(user, eq(post.userId, user.id))
  return new Response(JSON.stringify(posts))
}

export async function POST(req: Request) {
  const authRequest = auth.handleRequest(req.method, context)
  const session = await authRequest.validate()

  if (!session) {
    return new Response("Unauthorized", { status: 403 })
  }

  try {
    const json = await req.json()
    const data = postCreateSchema.parse(json)

    // TODO: rename this
    const foo = await db
      .insert(post)
      .values({ content: data.content, userId: session.user.userId })
      .returning()

    return new Response(JSON.stringify(foo))
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
  }
}
