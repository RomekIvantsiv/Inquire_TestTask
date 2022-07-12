import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, getPosts } from '../../api/api';
import { NewPost } from '../../react-app-env.d';
import { setPosts } from '../../store';
import './CreatePostForm.scss';

export const CreatePostForm: React.FC = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const clearInputs = () => {
    setTitle('');
    setBody('');
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newPost: NewPost = {
      title,
      body,
    };

    await createPost(newPost);

    const updatedPosts = await getPosts();

    dispatch(setPosts(updatedPosts));
    clearInputs();
  };

  return (
    <form
      className="NewPostForm"
      onSubmit={handleFormSubmit}
    >
      <h2>
        Add a new post
      </h2>
      <div className="form-wrapper">
        <div className="form-field">
          <input
            type="text"
            name="title"
            placeholder="Write a title"
            className="NewPostForm__input"
            required
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </div>

        <div className="form-field">
          <input
            name="body"
            placeholder="Write description"
            className="NewPostForm__input"
            required
            value={body}
            onChange={({ target }) => {
              setBody(target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="NewPostForm__submit-button button"
        >
          Add a post
        </button>
      </div>

    </form>
  );
};
