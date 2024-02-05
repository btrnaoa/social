import { Post } from "@/lib/db/schema/post"

export async function getAllPosts() {
  const res = await fetch("/api/posts")
  const posts: Post[] = await res.json()
  return { posts }
}
