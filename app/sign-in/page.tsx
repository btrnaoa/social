import UserAuthForm from "@/components/user-auth-form"
import { signin } from "@/lib/actions/auth"
import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const { user } = await validateRequest()

  if (user) redirect("/")

  return (
    <UserAuthForm
      submitButtonText="Sign in"
      headerText="Sign in"
      footerText="Don't have an account?"
      footerLink="/sign-up"
      footerLinkText="Sign up"
      handleSubmit={async (formData) => {
        "use server"

        await signin(formData)
      }}
    />
  )
}
