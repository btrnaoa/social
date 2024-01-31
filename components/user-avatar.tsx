import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserAvatarProps extends React.HTMLAttributes<HTMLSpanElement> {}

export default function UserAvatar({ className }: UserAvatarProps) {
  return (
    <Avatar className={cn("h-9 w-9", className)}>
      <AvatarImage src="https://github.com/btrnaoa.png" alt="@btrnaoa" />
      <AvatarFallback>B</AvatarFallback>
    </Avatar>
  )
}
