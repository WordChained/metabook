import React, { useEffect } from 'react';
import styles from './Posts.module.css';
import { SinglePost } from './singlePost/SinglePost';
import { useSelector, useDispatch } from 'react-redux';
import { queryPosts } from '../store/actions/itemActions';
import { UpdateModal } from './singlePost/UpdateModal';
export const Posts = () => {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const { items, currentPost } = useSelector((state) => state.itemModule);
  const { friends } = useSelector((state) => state.friendsModule);

  const dispatch = useDispatch();

  const getPosts = () => {
    if (!loggedInUser) return;
    dispatch(queryPosts(loggedInUser.userId));
  };
  useEffect(() => {
    console.log('posts is re-rendered');
    getPosts();
  }, []);

  if (!items.posts) {
    return (
      <div className={styles['lds-grid']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  return (
    <section className={styles.posts}>
      {currentPost && (
        <UpdateModal previousText={currentPost.text} post={currentPost} />
      )}
      {items.posts.length > 0 ? (
        items.posts.map((post) => <SinglePost key={post._id} post={post} />)
      ) : (
        <div className={styles.placeholder}>
          No posts yet... Try making friends :)
        </div>
      )}
    </section>
  );
};
