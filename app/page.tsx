import PostCreateDialog from "@/components/post-create-dialog"
import Posts from "@/components/posts"
import UserNav from "@/components/user-nav"
import { getPageSession } from "@/lib/auth"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { getPosts } from "./api/posts"

export default async function Home() {
  const session = await getPageSession()

  if (!session) redirect("/sign-in")

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })

  return (
    <>
      <UserNav className="m-4 flex justify-end" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts
          sessionUserId={session.user.userId}
          className="mx-2 space-y-4 sm:mx-auto sm:max-w-fit"
        />
      </HydrationBoundary>
      <PostCreateDialog />
    </>
  )
}
