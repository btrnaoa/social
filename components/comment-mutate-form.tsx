"use client"

import { useState } from "react"
import { Input } from "./ui/input"

interface CommentMutateFormProps extends React.ComponentProps<"form"> {
  initialInputValue?: string
  autoFocusInput?: boolean
  formAction: (formData: FormData) => Promise<void>
}

export default function CommentMutateForm({
  initialInputValue = "",
  autoFocusInput = false,
  formAction,
  children,
  className,
}: CommentMutateFormProps) {
  const [inputValue, setInputValue] = useState(initialInputValue)

  return (
    <form action={formAction} className={className}>
      <Input
        name="content"
        placeholder="Comment"
        value={inputValue}
        autoComplete="off"
        autoFocus={autoFocusInput}
        className="h-8 border-none text-xs"
        onChange={(event) => setInputValue(event.currentTarget.value)}
      />
      {children}
    </form>
  )
}
