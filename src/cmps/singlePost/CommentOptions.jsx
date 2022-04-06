import React from 'react';
import styles from './CommentOptions.module.css';

import trash from '../../assets/imgs/trash.png';
import edit from '../../assets/imgs/edit.png';
import { useDispatch } from 'react-redux';
import { removeComment } from '../../store/actions/itemActions';
export const CommentOptions = ({ comment, userId, setStartEditing }) => {
  const dispatch = useDispatch();
  const startEditing = () => {
    //
    setStartEditing(true);
  };
  const deleteComment = () => {
    if (!window.confirm('Are you sure you want to delete your comment?'))
      return;
    dispatch(
      removeComment(comment._id, userId, comment.publisher.id, comment.parentId)
    );
  };

  return (
    <ul className={styles.window}>
      <li>
        <img src={trash} alt='' onClick={deleteComment} />
      </li>
      <li>
        <img src={edit} alt='' onClick={startEditing} />
      </li>
    </ul>
  );
};
