import { postgres } from "@lucia-auth/adapter-postgresql"
import { lucia } from "lucia"
import { nextjs_future } from "lucia/middleware"
import * as context from "next/headers"
import * as React from "react"
import { tablePrefix } from "./constants"
import { client } from "./db"

export const auth = lucia({
  env: "DEV",
  adapter: postgres(client, {
    user: `${tablePrefix}_auth_user`,
    key: `${tablePrefix}_user_key`,
    session: `${tablePrefix}_user_session`,
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

export const getPageSession = React.cache(() => {
  const authRequest = auth.handleRequest("GET", context)
  return authRequest.validate()
})
