import React from 'react';
import styles from './HomePage.module.css';

import { Posts } from '../cmps/Posts';
import { CreatePost } from '../cmps/createPost/CreatePost';

export const HomePage = React.memo(() => {
  console.log('homepage');
  return (
    <main className={styles.homepage}>
      <CreatePost />
      <Posts />
    </main>
  );
});
