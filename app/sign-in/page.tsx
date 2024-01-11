import UserAuthForm from "@/components/user-auth-form"
import { auth } from "@/lib/auth"
import * as context from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
  const authRequest = auth.handleRequest("GET", context)
  const session = await authRequest.validate()

  if (session) redirect("/")

  return (
    <UserAuthForm
      action="/api/signin"
      submitButtonText="Sign in"
      headerText="Sign in"
      footerText="Don't have an account?"
      footerLink="/sign-up"
      footerLinkText="Sign up"
    />
  )
}
