import React, { useState, useEffect } from 'react';
import styles from './HeaderProfilePreview.module.css';
import { ProfileDropdown } from './ProfileDropdown';
import RandomUser from '../../assets/imgs/profile-color.png';

import downArrowFull from '../../assets/imgs/down-arrow-full.png';
import notificationBellIcon from '../../assets/imgs/bell.png';
import { NotificationDropdown } from './NotificationDropdown';
import { useNavigate } from 'react-router';
import { titleCase } from '../../services/utilService';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotifications,
  updateNotificationsStatus,
} from '../../store/actions/notificationActions';
import { socketService } from '../../services/socketService';

export const HeaderProfilePreview = ({
  user,
  setShowNotificationDropdown,
  showNotificationDropdown,
  setShowDropdown,
  showDropdown,
}) => {
  const { notifications } = useSelector((state) => state.notificationModule);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [showDropdown, setShowDropdown] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  // const [showNotificationDropdown, setShowNotificationDropdown] =
  useState(false);

  const getUnreadNotifications = (notifications) => {
    if (!notifications.length) return;
    const unreadNotifications = notifications.filter((ntf) => {
      return ntf.status === 'unread';
    });
    setUnreadNotifications(unreadNotifications.map((ntf) => ntf.id));
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setShowDropdown(false);
    if (unreadNotifications.length > 0) {
      dispatch(updateNotificationsStatus(unreadNotifications));
    }
    getUnreadNotifications(notifications);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowNotificationDropdown(false);
  };
  useEffect(() => {
    dispatch(getNotifications(user.userId, getUnreadNotifications));
    socketService.on('notification-added', () => {
      dispatch(getNotifications(user.userId, getUnreadNotifications));
    });
  }, []);

  return (
    <div className={styles['preview-container']}>
      <div
        className={styles['image-name-container']}
        onClick={() => {
          navigate('/my-profile');
        }}
      >
        <span className={styles['image-container']}>
          <img
            src={user.profilePicture ? user.profilePicture : RandomUser}
            alt=''
          />
        </span>
        <span>{titleCase(user.name.first)}</span>
      </div>
      <span
        onClick={toggleDropdown}
        className={`
          ${styles['dropdown-window-btn-container']} ${
          showDropdown ? styles.open : ''
        }`}
      >
        <img src={downArrowFull} alt='downArrow' />
      </span>
      <span
        onClick={toggleNotificationDropdown}
        className={`
          ${styles['dropdown-window-btn-container']} ${
          showNotificationDropdown ? styles.open : ''
        }`}
      >
        {unreadNotifications.length > 0 && (
          <span className={styles['unread-count']}>
            {unreadNotifications.length}
          </span>
        )}
        <img src={notificationBellIcon} alt='notification-bell' />
      </span>
      {showDropdown && (
        <ProfileDropdown setShowDropdown={setShowDropdown} user={user} />
      )}
      {showNotificationDropdown && (
        <NotificationDropdown notifications={notifications} />
      )}
    </div>
  );
};
