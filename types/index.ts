export interface PostWithUser {
  id: string
  content: string
  createdAt: Date
  user: {
    id: string
    username: string
  } | null
}
