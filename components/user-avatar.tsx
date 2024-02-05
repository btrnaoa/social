import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserAvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string | undefined
}

export default function UserAvatar({ name, className }: UserAvatarProps) {
  return (
    <Avatar className={cn("h-9 w-9", className)}>
      <AvatarImage
        src={`https://source.boringavatars.com/marble/${name}`}
        alt={`@${name}`}
      />
      <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
