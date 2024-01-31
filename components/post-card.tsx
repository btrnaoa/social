import { type Post } from "@/lib/db/schema/post"
import { Card, CardContent, CardHeader } from "./ui/card"
import UserAvatar from "./user-avatar"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { content, user } = post
  return (
    <Card className="border-none">
      <CardHeader>
        <div className="flex items-center">
          <UserAvatar className="h-14 w-14" />
          <div className="ml-4 space-y-2">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-[0.625rem] leading-none text-muted-foreground">
              45 min ago
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-none sm:min-w-[50ch] sm:max-w-[50ch]">
          {content}
        </p>
      </CardContent>
    </Card>
  )
}
