"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MoreVerticalIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface PostCardOptionsMenuProps {
  postId: string
}

export default function PostCardOptionsMenu({
  postId,
}: PostCardOptionsMenuProps) {
  const queryClient = useQueryClient()
  const deletePost = useMutation({
    mutationFn: async () => {
      await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative -right-2 -top-4"
          variant="ghost"
          size="icon"
        >
          <MoreVerticalIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => deletePost.mutate()}>
          <span className="text-destructive">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
