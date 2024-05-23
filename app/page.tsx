import PostCreateDialog from "@/components/post-create-dialog"
import Posts from "@/components/posts"
import { Button } from "@/components/ui/button"
import UserNav from "@/components/user-nav"
import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import Link from "next/link"

export default async function Home() {
  const { session } = await validateRequest()

  const allPosts = await db.query.posts.findMany({
    columns: {
      userId: false,
    },
    with: {
      user: {
        columns: {
          passwordHash: false,
        },
      },
    },
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
      <Posts posts={allPosts} />
      {session && <PostCreateDialog />}
    </>
  )
}
