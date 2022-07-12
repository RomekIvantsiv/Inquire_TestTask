import {
  configureStore,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

import { State, Post, PostDetails } from '../react-app-env.d';

export const initialState: State = {
  posts: [],
  currentPost: null,
  currentPostId: '',
  comments: null,
};

export const setPosts = createAction<Post[]>('SET_POSTS');
export const setPost = createAction<Post>('SET_POST');
export const setCurrentPostId = createAction<string>('SET_CURRENT_POST_ID');
export const setComments = createAction<PostDetails>('SET_POST_COMMENTS');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setPosts, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.posts = action.payload;
  });
  builder.addCase(setPost, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.currentPost = action.payload;
  });
  builder.addCase(setCurrentPostId, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.currentPostId = action.payload;
  });
  builder.addCase(setComments, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.comments = action.payload;
  });
});

export const store = configureStore({ reducer });
