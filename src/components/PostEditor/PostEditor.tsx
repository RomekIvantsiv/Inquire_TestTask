import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, getPosts, updatePost } from '../../api/api';
import { NewPost } from '../../react-app-env.d';
import { setPost, setPosts } from '../../store';
import { getCurrentPostIdSelector } from '../../store/selectors';

export const PostEditor: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const dispatch = useDispatch();

  const postId = useSelector(getCurrentPostIdSelector);

  const clearInputs = () => {
    setNewBody('');
    setNewTitle('');
  };

  const handleFormUpdate = (event: React.FormEvent) => {
    event.preventDefault();

    const updator = async (posId: number) => {
      const updatedPost: NewPost = {
        title: newTitle,
        body: newBody,
      };

      await updatePost(posId, updatedPost);
      const uptadedPost = await (getPost(posId));
      const allPosts = await (getPosts());

      dispatch(setPost(uptadedPost));
      dispatch(setPosts(allPosts));
    };

    updator(+postId);
    clearInputs();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleFormUpdate}
    >
      <div className="form-field">
        <input
          name="body"
          placeholder="Type new title"
          className="NewCommentForm__input"
          required
          value={newBody}
          onChange={({ target }) => {
            setNewBody(target.value);
          }}
        />
      </div>
      <div className="form-field">
        <input
          name="body"
          placeholder="Type new body"
          className="NewCommentForm__input"
          required
          value={newTitle}
          onChange={({ target }) => {
            setNewTitle(target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Update a post
      </button>
    </form>
  );
};
