import PostCreateDialog from "@/components/post-create-dialog"
import Posts from "@/components/posts"
import { Button } from "@/components/ui/button"
import UserNav from "@/components/user-nav"
import { getAllPosts } from "@/lib/api/posts"
import { validateRequest } from "@/lib/auth"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import Link from "next/link"

export default async function Home() {
  const { session, user } = await validateRequest()

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  })

  return (
    <>
      {session ? (
        <UserNav className="m-4 flex justify-end" />
      ) : (
        <div className="flex justify-end">
          <Button variant="link" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts sessionUserId={user?.id} />
      </HydrationBoundary>
      {session && <PostCreateDialog />}
    </>
  )
}
