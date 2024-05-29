"use client"

import { MessageSquareMoreIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"

interface CommentsProps {
  count: number
  children: React.ReactNode
}

export default function Comments({ count, children }: CommentsProps) {
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="text-xs text-muted-foreground"
        onClick={() => setShowComments((prev) => !prev)}
      >
        <MessageSquareMoreIcon className="h-4 w-4" />
        <span className="ml-0.5 font-normal">{count}</span>
      </Button>
      {showComments && children}
    </div>
  )
}
