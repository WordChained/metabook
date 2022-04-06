import React, { useState } from 'react';
import styles from './UsersSearchBar.module.css';
import searchIcon from '../../assets/imgs/search.png';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../store/actions/userActions';
import { useNavigate } from 'react-router';
export const UsersSearchBar = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let timer;
  const [showForm, setShowForm] = useState(false);
  const onSubmit = (data) => {
    if (showForm) {
      //this is where i send the info
      if (data['filter'].length > 0) {
        dispatch(getUsers(data['filter']));
        navigate('/search-users');
        reset();
        setShowForm(false);
      }
    } else {
      setShowForm(true);
    }
  };
  const closeBar = () => {
    timer = setTimeout(() => {
      setShowForm(false);
    }, 5000);
  };
  const keepBarOpen = () => {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
  };
  return (
    <div
      className={styles.container}
      onMouseLeave={closeBar}
      onMouseEnter={keepBarOpen}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={!showForm ? styles.show : ''}
      >
        <input
          type='text'
          placeholder='Look For new Friends...'
          id='filter'
          {...register('filter')}
          autoComplete='off'
        />
        <button type='submit'>
          <img src={searchIcon} alt='' />
        </button>
      </form>
    </div>
  );
};
