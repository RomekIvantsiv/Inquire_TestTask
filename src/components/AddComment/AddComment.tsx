import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentToPost, getPostComments } from '../../api/api';
import { setComments } from '../../store';
import { getCurrentPostIdSelector } from '../../store/selectors';
import './AddComments.scss';

export const AddComment: React.FC = () => {
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  const postId = useSelector(getCurrentPostIdSelector);

  const handlerFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const comment = body;

    const addComment = async (posId: number) => {
      event.preventDefault();

      await createCommentToPost(posId, comment);

      const comments = await getPostComments(posId);

      dispatch(setComments(comments));
    };

    addComment(+postId);
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handlerFormSubmit}
    >
      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={body}
          onChange={({ target }) => {
            setBody(target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
