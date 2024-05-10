import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { posts } from "../db/schema"
import { postSchema } from "../schema/post"

export const postsSchema = z.object({
  posts: z.array(postSchema),
})

export const postMutateSchema = createInsertSchema(posts, {
  userId: z.undefined(),
})
