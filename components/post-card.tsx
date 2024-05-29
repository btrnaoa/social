import { createComment } from "@/lib/actions/comments"
import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostWithUser } from "@/types"
import { formatDistanceToNow } from "date-fns"
import CommentList from "./comment-list"
import CommentMutateForm from "./comment-mutate-form"
import Comments from "./comments"
import PostCardOptionsMenu from "./post-card-options-menu"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Separator } from "./ui/separator"
import UserAvatar from "./user-avatar"

interface PostCardProps {
  post: PostWithUser
}

export default async function PostCard({ post }: PostCardProps) {
  const createCommentWithPostId = createComment.bind(null, post.id)

  const { session } = await validateRequest()

  const comments = await db.query.comments.findMany({
    with: {
      post: true,
      user: {
        columns: {
          passwordHash: false,
        },
      },
    },
    where: (comments, { eq }) => eq(comments.postId, post.id),
    orderBy: (comments, { asc }) => asc(comments.createdAt),
  })

  return (
    <Card className="border-none sm:w-[50ch]">
      <CardHeader className="flex-row justify-between">
        <div className="flex items-center">
          <UserAvatar name={post.user?.username} className="h-14 w-14" />
          <div className="ml-4 space-y-2">
            <p className="text-sm font-medium leading-none">
              {post.user?.username}
            </p>
            <p className="text-[0.625rem] leading-none text-muted-foreground">
              {formatDistanceToNow(post.createdAt, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </p>
          </div>
        </div>
        {session?.userId === post.user?.id && (
          <PostCardOptionsMenu postId={post.id} postContent={post.content} />
        )}
      </CardHeader>
      <CardContent className="px-6 py-2">
        <p className="text-sm leading-none">{post.content}</p>
        <Separator className="mt-4" />
      </CardContent>
      <CardFooter>
        <Comments count={comments.length}>
          <CommentList comments={comments} />
          <CommentMutateForm
            formAction={createCommentWithPostId}
            className="mt-2"
          />
        </Comments>
      </CardFooter>
    </Card>
  )
}
