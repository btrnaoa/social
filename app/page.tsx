import PostCreateDialog from "@/components/post-create-dialog"
import Posts from "@/components/posts"
import { Button } from "@/components/ui/button"
import UserNav from "@/components/user-nav"
import { getPageSession } from "@/lib/auth"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import Link from "next/link"
import { getPosts } from "./api/posts"

export default async function Home() {
  const session = await getPageSession()

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
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
        <Posts
          sessionUserId={session?.user.userId}
          className="mx-2 space-y-4 sm:mx-auto sm:max-w-fit"
        />
      </HydrationBoundary>
      {session && <PostCreateDialog />}
    </>
  )
}
