"use client"

import { cn } from "@/lib/utils"
import { postCreateSchema } from "@/lib/validations/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, PlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import PostCreateForm from "./post-create-form"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

export default function PostCreateDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      content: "",
    },
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (content: string) => {
      await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      form.reset()
      setOpen(false)
    },
  })

  const onSubmit = async (values: z.infer<typeof postCreateSchema>) => {
    mutation.mutate(values.content)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-0 left-2/4 mb-2 -translate-x-2/4 rounded-full"
          size="icon"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
        </DialogHeader>
        <PostCreateForm form={form} />
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={mutation.isPending}
            className="grid justify-items-center"
          >
            {mutation.isPending && <Loader2 className="animate-spin" />}
            <span className={cn({ invisible: mutation.isPending })}>
              Submit
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
