// / <reference types="react-scripts" />

export interface Post {
  id: number,
  title: string,
  body: string,
}

export interface NewPost {
  title: string,
  body: string,
}

export interface State {
  posts: Post[],
  currentPost: Post | null,
  currentPostId: string,
  comments: PostDetails | null,
}

export interface Comment {
  id: number,
  postId: number,
  body: string,
}

export interface NewComment {
  postId: number,
  body: string,
}

export interface PostDetails {
  id: number,
  title: string,
  body: string,
  comments: Comment[],
}
