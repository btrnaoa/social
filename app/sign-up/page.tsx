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
      action="/api/signup"
      submitButtonText="Sign up"
      headerText="Sign up"
      footerText="Already have an account?"
      footerLink="/sign-in"
      footerLinkText="Sign in"
    />
  )
}
