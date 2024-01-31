import UserAuthForm from "@/components/user-auth-form"
import { getPageSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getPageSession()

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
