import React from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import { PostComments } from './components/PostDetails';
import { PostList } from './components/PostsList';
import { getCurrentPostIdSelector } from './store/selectors';
import { CreatePostForm } from './components/CreatePostForm';

export const App: React.FC = () => {
  const isPostSelected = useSelector(getCurrentPostIdSelector);

  return (
    <div className="App">
      <main className="App__main">
        <PostList />
        {isPostSelected
        && <PostComments />}
        <CreatePostForm />
      </main>
    </div>
  );
};
