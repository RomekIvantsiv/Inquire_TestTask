import { NewPost } from '../react-app-env.d';

export const BASE_URL = 'https://bloggy-api.herokuapp.com';
export const COMMENTS_URL = 'https://bloggy-api.herokuapp.com/comments';

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const getPost = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const getPostComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}?_embed=comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const createCommentToPost = async (postId: number, body: string) => {
  const response = await fetch(`${COMMENTS_URL}`, {
    method: 'POST',
    body: JSON.stringify({ postId, body }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const createPost = async (obj: NewPost) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json',
    },
  });

  return response.json();
};

export const deletePost = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });

  return response.json();
};

export const updatePost = async (postId: number, obj: NewPost) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json',
    },
  });

  return response.json();
};
