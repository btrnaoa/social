import UserAuthForm from "@/components/user-auth-form"
import { getPageSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getPageSession()

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
