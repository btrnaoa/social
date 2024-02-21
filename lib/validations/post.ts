import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { post } from "../db/schema/post"
import { postSchema } from "../schema/post"

export const postsSchema = z.object({
  posts: z.array(postSchema),
})

export const postMutateSchema = createInsertSchema(post, {
  userId: z.undefined(),
})
