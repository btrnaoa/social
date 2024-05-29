import { validateRequest } from "@/lib/auth"
import type { CommentWithUser } from "@/types"
import CommentListItem from "./comment-list-item"

interface CommentListProps {
  comments: CommentWithUser[]
}

export default async function CommentList({ comments }: CommentListProps) {
  const { user } = await validateRequest()

  return (
    <ul className="space-y-2 text-xs">
      {comments.map((comment) => (
        <CommentListItem
          key={comment.id}
          comment={comment}
          sessionUserId={user?.id}
        />
      ))}
    </ul>
  )
}
