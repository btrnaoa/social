import PostCreateDialog from "@/components/post-create-dialog"
import Posts from "@/components/posts"
import { Button } from "@/components/ui/button"
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
    <div>
      <p>
        {session.user.username} ({session.user.userId})
      </p>
      <form action="/api/signout" method="post">
        <Button type="submit">Sign out</Button>
      </form>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
      <PostCreateDialog />
    </div>
  )
}
