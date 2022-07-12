import React, { useEffect } from 'react';
import './PostDetails.scss';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  getComments,
  getCurrentPostIdSelector,
  getCurrentPostSelector,
  // getPostsSelector,
} from '../../store/selectors';
import { getPost, getPostComments } from '../../api/api';
import { setComments, setPost } from '../../store';
import { AddComment } from '../AddComment';
import { PostEditor } from '../PostEditor';

export const PostComments: React.FC = () => {
  const dispatch = useDispatch();
  const currentPost = useSelector(getCurrentPostSelector);
  // const posts = useSelector(getPostsSelector);
  const currentPostId = useSelector(getCurrentPostIdSelector);
  const comments = useSelector(getComments);

  // eslint-disable-next-line no-console
  console.log(currentPost);

  useEffect(() => {
    const loadPostComments = async () => {
      try {
        const postFromServer = await getPost(+currentPostId);

        const commentsToPost = await getPostComments(+currentPostId);

        dispatch(setPost(postFromServer));
        dispatch(setComments(commentsToPost));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    loadPostComments();
  }, [currentPostId]);

  return (
    <div className="App__content">
      <div className="PostDetails">
        <h2>Post details:</h2>
        <section className="PostDetails__post">
          <p>
            <span className="PostDetails__description">Post description: </span>
            {currentPost?.body}
          </p>
        </section>
        {comments?.comments.length !== 0
          ? <h3>Comments to post: </h3>
          : <h3>No comments yet</h3>}
        <ul className="PostDetails__list">
          {comments?.comments.map(comment => (
            <li key={comment.id} className="PostDetails__list-item">
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
        <section className="PostDetails__form">
          <h3>Add comment</h3>
          <div className="PostDetails__form-wrapper">
            <AddComment />
          </div>
        </section>
        <section className="PostDetails__form">
          <h3>Edit post</h3>
          <div className="PostDetails__form-wrapper">
            <PostEditor />
          </div>
        </section>
      </div>
    </div>

  );
};
