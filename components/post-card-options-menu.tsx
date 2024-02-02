"use client"

import { postMutateSchema } from "@/lib/validations/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MoreVerticalIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import PostMutateForm from "./post-mutate-form"
import PostSubmitButton from "./post-submit-button"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface PostCardOptionsMenuProps {
  postId: string
  postContent: string
}

export default function PostCardOptionsMenu({
  postId,
  postContent,
}: PostCardOptionsMenuProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const queryClient = useQueryClient()

  const editPostForm = useForm<z.infer<typeof postMutateSchema>>({
    resolver: zodResolver(postMutateSchema),
    defaultValues: {
      content: postContent,
    },
  })

  const editPost = useMutation({
    mutationFn: async (content: string) => {
      await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({ content }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      setDialogOpen(false)
    },
  })

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

  const onEditPostFormSubmit = async (
    values: z.infer<typeof postMutateSchema>
  ) => {
    editPost.mutate(values.content)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
          <DialogTrigger asChild>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={() => deletePost.mutate()}>
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogTitle>Edit post</DialogTitle>
        <PostMutateForm form={editPostForm} />
        <DialogFooter>
          <PostSubmitButton
            isPending={editPost.isPending}
            onClick={editPostForm.handleSubmit(onEditPostFormSubmit)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
