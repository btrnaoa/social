import { z } from "zod"

export const postSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().nullable(),
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
})

export type Post = z.infer<typeof postSchema>
