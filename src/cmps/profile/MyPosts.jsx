import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SinglePost } from '../singlePost/SinglePost';
import { UpdateModal } from '../singlePost/UpdateModal';
import { queryMyPosts } from '../../store/actions/itemActions';
import styles from './MyPosts.module.css';
export const MyPosts = ({ userId }) => {
  const dispatch = useDispatch();

  const { myPosts, currentPost } = useSelector((state) => state.itemModule);
  const getMyPosts = () => {
    dispatch(queryMyPosts(userId));
  };
  useEffect(() => {
    getMyPosts();
    //when user changes, fetch posts again
  }, [userId]);

  if (!myPosts) return <div>No posts yet!</div>;
  return (
    <section className={styles.container}>
      {currentPost && (
        <UpdateModal previousText={currentPost.text} post={currentPost} />
      )}
      <h2>Posts</h2>
      {myPosts.map((post) => (
        <SinglePost key={post._id} post={post} />
      ))}
      {(!myPosts || myPosts.length) < 1 && (
        <div className={styles.filler}>Nothing Yet!</div>
      )}
    </section>
  );
};
