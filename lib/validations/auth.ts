import { z } from "zod"

export const userAuthSchema = z.object({
  username: z
    .string()
    .min(4, { message: "User name must contain at least 4 characters" })
    .max(32, { message: "User name must contain at most 32 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" })
    .max(128, { message: "Password must contain at most 128 characters" }),
})
