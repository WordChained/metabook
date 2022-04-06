import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import styles from './UdateModal.module.css';

import xIcon from '../../assets/imgs/x-icon.png';

import { save, setCurrentPost } from '../../store/actions/itemActions';
import { toggleScreenCover } from '../../store/actions/userActions';

export const UpdateModal = ({ previousText, post }) => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const newText = data['text'];
    console.log(newText);
    post.text = newText;
    dispatch(save(post, 'post'));
    dispatch(setCurrentPost(null));
    dispatch(toggleScreenCover(false));
  };

  const exit = () => {
    dispatch(toggleScreenCover(false));
    dispatch(setCurrentPost(null));
  };
  return (
    <div className={styles.modal}>
      <img onClick={exit} className={styles.exit} src={xIcon} alt='' />
      <h3>Update Post:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          name=''
          id=''
          cols='30'
          rows='10'
          defaultValue={previousText}
          {...register('text')}
        />
        <button type={'submit'}>Update</button>
      </form>
    </div>
  );
};
