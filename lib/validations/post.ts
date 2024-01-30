import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"
import { post } from "../db/schema/post"

export const postCreateSchema = createInsertSchema(post, {
  userId: z.undefined(),
})
