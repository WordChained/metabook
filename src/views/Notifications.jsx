import React from 'react';
import { useSelector } from 'react-redux';
import { NotificationItem } from '../cmps/header/NotificationItem';
import styles from './Notifications.module.css';

export const Notifications = () => {
  const { notifications } = useSelector((state) => state.notificationModule);
  return (
    <div className={styles.container}>
      <h2>Notifications</h2>
      {notifications && (
        <ul>
          {notifications.map((notification) => (
            //TODO: might need to add another cmp of notificationItem
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
