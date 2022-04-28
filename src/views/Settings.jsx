import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../store/actions/userActions';
import styles from './Settings.module.css';
export const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navTo = (address) => {
    navigate(address);
  };
  const signout = () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    else {
      dispatch(logout());
    }
  };
  return (
    <div className={styles.container}>
      <h1>settings</h1>
      <div onClick={() => navTo('/my-profile')}>My Profile</div>
      <div onClick={signout}>Signout</div>
    </div>
  );
};
