import { z } from "zod"

export const authSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(31)
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid username"),
  password: z.string().min(6).max(255),
})
