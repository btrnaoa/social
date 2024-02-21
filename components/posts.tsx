"use client"

import { postsSchema } from "@/lib/validations/post"
import { useQuery } from "@tanstack/react-query"
import PostCard from "./post-card"

interface PostsProps {
  sessionUserId: string | undefined
}

export default function Posts({ sessionUserId }: PostsProps) {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts")
      const data = await res.json()
      const posts = postsSchema.parse(data)
      return posts
    },
  })
  return (
    <ul className="mx-2 space-y-4 sm:mx-auto sm:max-w-fit">
      {data?.posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} sessionUserId={sessionUserId} />
        </li>
      ))}
    </ul>
  )
}
