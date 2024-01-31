"use client"

import { getPosts } from "@/app/api/posts"
import { useQuery } from "@tanstack/react-query"
import PostCard from "./post-card"

interface PostsProps extends React.HTMLAttributes<HTMLUListElement> {}

export default function Posts({ className }: PostsProps) {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })
  return (
    <ul className={className}>
      {data?.posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
