import { z } from "zod"

export const postMutateSchema = z.object({
  content: z.string().min(1).max(250),
})
