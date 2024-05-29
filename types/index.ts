export interface PostWithUser {
  id: string
  content: string
  createdAt: Date
  user: {
    id: string
    username: string
  } | null
}

export interface CommentWithUser {
  id: string
  content: string
  createdAt: Date
  post: {
    id: string
  } | null
  user: {
    id: string
    username: string
  } | null
}
