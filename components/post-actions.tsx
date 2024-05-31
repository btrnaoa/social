"use client"

import { createComment } from "@/lib/actions/comments"
import { likePost } from "@/lib/actions/likes"
import { cn } from "@/lib/utils"
import { CommentWithUser } from "@/types"
import { HeartIcon, MessageSquareMoreIcon } from "lucide-react"
import { useState } from "react"
import CommentListItem from "./comment-list-item"
import CommentMutateForm from "./comment-mutate-form"
import { Button } from "./ui/button"

interface PostActionsProps {
  postId: string
  liked: boolean
  count: {
    likes: number
    comments: number
  }
  comments: CommentWithUser[]
  sessionUserId: string | undefined
}

export default function PostActions({
  postId,
  liked,
  count,
  comments,
  sessionUserId,
}: PostActionsProps) {
  const [showComments, setShowComments] = useState(false)

  const createCommentWithPostId = createComment.bind(null, postId)

  return (
    <div className="flex w-full flex-col gap-2">
      <div>
        <Button
          variant="ghost"
          size="icon"
          className="text-xs text-muted-foreground"
          onClick={() => likePost(postId)}
        >
          <HeartIcon
            className={cn("h-4 w-4", { "fill-red-600 stroke-red-600": liked })}
          />
          <span
            className={cn("ml-0.5 font-normal", { "text-red-600 ": liked })}
          >
            {count.likes}
          </span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-xs text-muted-foreground"
          onClick={() => setShowComments((prev) => !prev)}
        >
          <MessageSquareMoreIcon className="h-4 w-4" />
          <span className="ml-0.5 font-normal">{count.comments}</span>
        </Button>
      </div>
      <div>
        {showComments && (
          <>
            <ul className="space-y-2 text-xs">
              {comments.map((comment) => (
                <CommentListItem
                  key={comment.id}
                  comment={comment}
                  sessionUserId={sessionUserId}
                />
              ))}
            </ul>
            <CommentMutateForm
              formAction={createCommentWithPostId}
              className="mt-2"
            />
          </>
        )}
      </div>
    </div>
  )
}
