import React from 'react';
import styles from './CommentEditor.module.css';
import send from '../../assets/imgs/send.png';
import cancel from '../../assets/imgs/cancel-black.png';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { save } from '../../store/actions/itemActions';
export const CommentEditor = ({ prevText, setStartEditing, comment }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const newComment = {
      ...comment,
      text: data['new-text'],
    };
    dispatch(save(newComment, 'comment'));
    setStartEditing(false);
  };
  return (
    <form className={styles.editor} onSubmit={handleSubmit(onSubmit)}>
      <img
        className={styles.cancel}
        src={cancel}
        alt=''
        onClick={() => setStartEditing(false)}
      />
      <textarea
        name=''
        id=''
        cols='30'
        rows='10'
        defaultValue={prevText}
        {...register('new-text')}
        autoFocus
        onFocus={(ev) =>
          ev.target.setSelectionRange(
            ev.target.value.length,
            ev.target.value.length
          )
        }
      ></textarea>
      <button type={'submit'}>
        <img src={send} alt='' />
      </button>
    </form>
  );
};
