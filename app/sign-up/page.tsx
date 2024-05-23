import UserAuthForm from "@/components/user-auth-form"
import { signup } from "@/lib/actions/auth"
import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const { user } = await validateRequest()

  if (user) redirect("/")

  return (
    <UserAuthForm
      submitButtonText="Sign up"
      headerText="Sign up"
      footerText="Already have an account?"
      footerLink="/sign-in"
      footerLinkText="Sign in"
      handleSubmit={async (formData) => {
        "use server"

        await signup(formData)
      }}
    />
  )
}
