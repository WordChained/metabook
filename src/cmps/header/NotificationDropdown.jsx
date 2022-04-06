import React from 'react';
import styles from './NotificationDropdown.module.css';
import { NotificationItem } from './NotificationItem';
export const NotificationDropdown = ({ notifications }) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.angle}></div>
      <h2>Notifications</h2>
      {notifications && (
        <ul>
          {notifications.map((notification) => (
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
