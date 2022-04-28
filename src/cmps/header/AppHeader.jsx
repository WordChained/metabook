import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './AppHeader.module.css';

import mLogo from '../../assets/imgs/letter-m.png';
import homeIcon from '../../assets/imgs/home.png';
import profileIcon from '../../assets/imgs/profile.png';
import booksIcon from '../../assets/imgs/open-book.png';
import notificationBellIcon from '../../assets/imgs/bell.png';
import settingCorgwheel from '../../assets/imgs/setting.png';

import { useDispatch, useSelector } from 'react-redux';

import { HeaderProfilePreview } from './HeaderProfilePreview';
import { UsersSearchBar } from './UsersSearchBar';
import { eventBusService } from '../../services/eventBusService';
// import { socketService } from "../../services/socketService";
import { sendNotification } from '../../store/actions/notificationActions';
import { useWindowSize } from '../../customHooks/useWindowSize';
export const AppHeader = () => {
  const windowSize = useWindowSize();
  const { loggedInUser } = useSelector((state) => state.userModule);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    eventBusService.on('notification', (notification) => {
      if (notification.to === notification.from) {
        console.log('user doesnt need to notify himself!');
        return;
      }
      dispatch(sendNotification(notification));
    });
    // socketService.emit('notification', notification)
  }, []);
  const onLeavingHeader = () => {
    setShowDropdown(false);
    setShowNotificationDropdown(false);
  };
  return (
    <header className={styles.header} onMouseLeave={onLeavingHeader}>
      <div className={styles['logo-row']}>
        <img
          className={styles.logo}
          src={mLogo}
          alt=''
          onClick={() => navigate('/')}
        />
        <UsersSearchBar />
      </div>
      <nav>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <img className={styles['nav-icons']} src={homeIcon} alt='' />
        </NavLink>
        <NavLink
          to='/my-profile'
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <img className={styles['nav-icons']} src={profileIcon} alt='' />
        </NavLink>
        <NavLink
          to='/stories'
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <img className={styles['nav-icons']} src={booksIcon} alt='' />
        </NavLink>
        {windowSize.width < 1000 && (
          <NavLink
            to='/notifications'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <img
              className={styles['nav-icons']}
              src={notificationBellIcon}
              alt=''
            />
          </NavLink>
        )}
        {windowSize.width < 1000 && (
          <NavLink
            to='/settings'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <img
              className={styles['nav-icons']}
              src={settingCorgwheel}
              alt=''
            />
          </NavLink>
        )}
      </nav>
      <HeaderProfilePreview
        user={loggedInUser}
        setShowNotificationDropdown={setShowNotificationDropdown}
        showNotificationDropdown={showNotificationDropdown}
        setShowDropdown={setShowDropdown}
        showDropdown={showDropdown}
      />
    </header>
  );
};
