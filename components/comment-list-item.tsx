"use client"

import { deleteComment, updateComment } from "@/lib/actions/comments"
import type { CommentWithUser } from "@/types"
import { formatDistanceToNowStrict } from "date-fns"
import { useState } from "react"
import CommentMutateForm from "./comment-mutate-form"
import { Button } from "./ui/button"
import UserAvatar from "./user-avatar"

interface CommentListItemProps {
  comment: CommentWithUser
  sessionUserId: string | undefined
}

function CommentListItem({ comment, sessionUserId }: CommentListItemProps) {
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  return (
    <li>
      <div className="flex flex-col items-start rounded-md bg-background p-2">
        <div className="flex w-full gap-2">
          <UserAvatar name={comment.user?.username} className="h-6 w-6" />
          <div className="mt-1 w-full space-y-2">
            <p className="space-x-1 text-muted-foreground">
              <span className="font-medium text-primary">
                {comment.user?.username}
              </span>
              <span>&middot;</span>
              <span className="font-normal">
                {formatRelativeTime(
                  formatDistanceToNowStrict(comment.createdAt)
                )}
              </span>
            </p>
            {editMode ? (
              <CommentMutateForm
                autoFocusInput
                initialInputValue={comment.content}
                formAction={async (formData) => {
                  await updateComment(formData, comment.id)
                  toggleEditMode()
                }}
              >
                <div className="*:px flex justify-end space-x-2 px-2 *:h-5 *:px-1 *:text-xs *:text-muted-foreground *:hover:no-underline">
                  <Button type="button" variant="link" onClick={toggleEditMode}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="link">
                    Save
                  </Button>
                </div>
              </CommentMutateForm>
            ) : (
              <>
                <p className="break-all">{comment.content}</p>
                {sessionUserId === comment.user?.id && (
                  <div className="flex justify-end space-x-2 px-2 *:h-5 *:px-1 *:text-xs *:text-muted-foreground *:hover:no-underline">
                    <Button variant="link" onClick={toggleEditMode}>
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => deleteComment(comment.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

function formatRelativeTime(time: string) {
  const units = {
    year: "y",
    month: "mo",
    week: "w",
    day: "d",
    hour: "h",
    minute: "m",
    second: "s",
  } as { [key: string]: string }

  if (time === "0 seconds") {
    return "now"
  }

  return time
    .split(" ")
    .map((str, idx) => {
      if (idx % 2 !== 0) {
        return Object.keys(units)
          .filter((key) => str.startsWith(key))
          .map((u) => units[u])
          .join()
      }
      return str
    })
    .join("")
}

export default CommentListItem
