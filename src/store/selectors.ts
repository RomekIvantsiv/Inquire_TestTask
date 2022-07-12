import { State } from '../react-app-env.d';

export const getPostsSelector = (state: State) => state.posts;
export const getCurrentPostSelector = (state: State) => state.currentPost;
export const getCurrentPostIdSelector = (state: State) => state.currentPostId;
export const getComments = (state: State) => state.comments;
