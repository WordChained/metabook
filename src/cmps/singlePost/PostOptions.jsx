import React from 'react';
import styles from './PostOptions.module.css';

import trash from '../../assets/imgs/trash.png';
import editIcon from '../../assets/imgs/edit.png';
import { useDispatch } from 'react-redux';
import { removePost, setCurrentPost } from '../../store/actions/itemActions';
import { toggleScreenCover } from '../../store/actions/userActions';
export const PostOptions = ({ postId, userId, publisherId, post }) => {
  const dispatch = useDispatch();

  const deletePost = () => {
    const public_ids = post.media.map((item) => item.public_id);
    console.log('public_ids:', public_ids);
    dispatch(removePost(postId, userId, publisherId, public_ids));
  };

  const updatePost = () => {
    dispatch(setCurrentPost(post));
    dispatch(toggleScreenCover(true));
  };

  return (
    <ul className={styles.list}>
      <li onClick={deletePost}>
        <img src={trash} alt='' /> Remove
      </li>
      <li onClick={updatePost}>
        <img src={editIcon} alt='' /> Edit Text
      </li>
    </ul>
  );
};
