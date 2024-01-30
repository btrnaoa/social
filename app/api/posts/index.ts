import { Post } from "@/lib/db/schema/post"

export async function getPosts() {
  const res = await fetch("/api/posts")
  const posts: Post[] = await res.json()
  return { posts }
}
