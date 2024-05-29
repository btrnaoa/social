import { PostWithUser } from "@/types"
import PostCard from "./post-card"

interface PostsProps {
  posts: PostWithUser[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <ul className="mx-2 space-y-4 sm:mx-auto sm:max-w-fit">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
