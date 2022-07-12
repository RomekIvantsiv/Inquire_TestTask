import React, { useEffect } from 'react';
import './PostsList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPosts } from '../../api/api';
import { setCurrentPostId, setPosts } from '../../store';
import { getCurrentPostIdSelector, getPostsSelector } from '../../store/selectors';

export const PostList: React.FC = () => {
  const dispatch = useDispatch();

  const posts = useSelector(getPostsSelector);
  const currentPostId = useSelector(getCurrentPostIdSelector);

  // eslint-disable-next-line no-console
  console.log(posts);

  useEffect(() => {
    const loadPostsFromServer = async () => {
      const postsFromServer = await getPosts();

      dispatch(setPosts(postsFromServer));
    };

    loadPostsFromServer();
  }, []);

  const handleDeleteButton = async (postId: number) => {
    await deletePost(postId);
    const postsFromServer = await getPosts();

    dispatch(setPosts(postsFromServer));
  };

  return (
    <div className="App__sidebar">
      <div className="PostsList">
        <h2>Posts:</h2>

        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <p className="PostsList__title">
                <span className="PostsList__title-bold">Post title: </span>
                {post.title}
              </p>
              <div className="button__container">
                {+currentPostId === post.id
                  ? (
                    <button
                      type="button"
                      className="PostsList__button button"
                      onClick={() => {
                        dispatch(setCurrentPostId(''));
                      }}
                    >
                      Close details
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      className="PostsList__button button"
                      onClick={() => {
                        dispatch(setCurrentPostId(String(post.id)));
                      }}
                    >
                      Open details
                    </button>
                  )}
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    handleDeleteButton(post.id);
                  }}
                >
                  Delete post
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
