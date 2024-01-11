import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import * as context from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const authRequest = auth.handleRequest("GET", context)
  const session = await authRequest.validate()

  if (!session) redirect("/sign-in")

  return (
    <>
      <h1>Profile</h1>
      <p>
        {session.user.username} ({session.user.userId})
      </p>
      <form action="/api/signout" method="post">
        <Button type="submit">Sign out</Button>
      </form>
    </>
  )
}
