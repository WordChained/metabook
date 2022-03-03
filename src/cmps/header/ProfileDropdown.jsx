import React, { useState } from 'react';
import styles from './ProfileDropdown.module.css';

import corgwheel from '../../assets/imgs/setting.png';
import moon from '../../assets/imgs/moon.png';
import sun from '../../assets/imgs/sun.png';
import logoutIcon from '../../assets/imgs/logout.png';

import RandomUser from '../../assets/imgs/profile-color.png';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/userActions';
export const ProfileDropdown = ({ setShowDropdown, user }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const dispatch = useDispatch();
  const navAndClose = (address) => {
    setShowDropdown(false);
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
      <div className={styles.triangle}></div>
      <ul>
        <li onClick={() => navAndClose('/my-profile')}>
          <div className={styles['action-left-container']}>
            <span className={styles['action-image-container']}>
              <img
                className={styles.profile}
                src={user.profilePicture ? user.profilePicture : RandomUser}
                alt=""
              />
            </span>
          </div>
          <span>Your Profile</span>
        </li>
        <li>
          <div className={styles['action-left-container']}>
            <span className={styles['action-image-container']}>
              <img src={corgwheel} alt="" />
            </span>
          </div>

          <span>settings</span>
        </li>
        {/* <li>
          <div className={styles['action-left-container']}>
            <span className={styles['action-image-container']}>
              <img src={isDarkMode ? moon : sun} alt="" />
            </span>
          </div>
          <span>Theme</span>
        </li> */}

        <li>
          <div className={styles['action-left-container']}>
            <span className={styles['action-image-container']}>
              <img src={logoutIcon} alt="" />
            </span>
          </div>
          <span onClick={signout}> Log Out</span>
        </li>
      </ul>
    </div>
  );
};
