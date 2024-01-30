"use client"

import { getPosts } from "@/app/api/posts"
import { useQuery } from "@tanstack/react-query"

export default function Posts() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })
  return (
    <ul>{data?.posts.map((post) => <li key={post.id}>{post.content}</li>)}</ul>
  )
}
