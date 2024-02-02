import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { post } from "../db/schema/post"

export const postMutateSchema = createInsertSchema(post, {
  userId: z.undefined(),
})
