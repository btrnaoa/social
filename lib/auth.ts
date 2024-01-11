import { pg } from "@lucia-auth/adapter-postgresql"
import { lucia } from "lucia"
import { nextjs_future } from "lucia/middleware"
import * as context from "next/headers"
import * as React from "react"
import { pool } from "./db"

export const auth = lucia({
  env: "DEV",
  adapter: pg(pool, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },

  getUserAttributes: (data) => {
    return {
      username: data.username,
    }
  },
})

export type Auth = typeof auth

export function getPageSession() {
  return React.cache(() => {
    const authRequest = auth.handleRequest("GET", context)
    return authRequest.validate()
  })
}
