import { type Post } from "@/lib/db/schema/post"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import PostCardOptionsMenu from "./post-card-options-menu"
import { Card, CardContent, CardHeader } from "./ui/card"
import UserAvatar from "./user-avatar"

dayjs.extend(relativeTime)

interface PostCardProps {
  post: Post
  sessionUserId: string | undefined
}

export default function PostCard({ post, sessionUserId }: PostCardProps) {
  const { content, createdAt, user } = post
  return (
    <Card className="border-none">
      <CardHeader className="flex-row justify-between">
        <div className="flex items-center">
          <UserAvatar name={user.username} className="h-14 w-14" />
          <div className="ml-4 space-y-2">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-[0.625rem] leading-none text-muted-foreground">
              {dayjs(createdAt).fromNow()}
            </p>
          </div>
        </div>
        {sessionUserId && user.id === sessionUserId && (
          <PostCardOptionsMenu postId={post.id} postContent={content} />
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-none sm:w-[50ch]">{content}</p>
      </CardContent>
    </Card>
  )
}
