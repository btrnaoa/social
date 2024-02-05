import { db } from "@/lib/db"
import { user } from "@/lib/db/schema/user"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { z } from "zod"

const pageContextSchema = z.object({
  params: z.object({
    username: z.string(),
  }),
})

export default async function Page({
  params,
}: z.infer<typeof pageContextSchema>) {
  const users = await db
    .select()
    .from(user)
    .where(eq(user.username, params.username))
    .limit(1)
  if (users.length === 0) {
    return notFound()
  }
  return <div>{users[0].username}</div>
}
