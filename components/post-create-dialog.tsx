"use client"

import { createPost } from "@/lib/actions/posts"
import { postMutateSchema } from "@/lib/validations/posts"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import PostMutateForm from "./post-mutate-form"
import PostSubmitButton from "./post-submit-button"
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
  const { pending } = useFormStatus()

  const form = useForm<z.infer<typeof postMutateSchema>>({
    resolver: zodResolver(postMutateSchema),
    defaultValues: {
      content: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof postMutateSchema>) => {
    await createPost(values.content)
    setOpen(false)
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
        <PostMutateForm form={form} />
        <DialogFooter>
          <PostSubmitButton
            isPending={pending}
            onClick={form.handleSubmit(onSubmit)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
