import React from 'react';
import profileIcon from '../../assets/imgs/profile.png';
import checkMark from '../../assets/imgs/check-mark.png';
import denyIcon from '../../assets/imgs/no.png';

import { getTitledName } from '../../services/utilService';
import styles from './NotificationItem.module.css';
import { useDispatch } from 'react-redux';
import { addFriend, removeFriend } from '../../store/actions/friendsActions';
import {
  removeNotification,
  sendNotification,
} from '../../store/actions/notificationActions';
export const NotificationItem = ({ notification }) => {
  const dispatch = useDispatch();

  var isoDateTime = new Date(
    notification.date - new Date(notification.date).getTimezoneOffset() * 60000
  ).toISOString(); //
  const prettyDate = (time) => {
    let date = new Date((time || '').replace(/-/g, '/').replace(/[TZ]/g, ' '));
    let diff = (Date.now() - date.getTime()) / 1000;
    let day_diff = Math.floor(diff / 86400);
    let month_diff = Math.floor(diff / 2629800);
    // let year_diff = Math.floor(diff / 31557600);
    if (month_diff && month_diff > 0) {
      let num = 0;
      let years = 0;
      while (month_diff > num) {
        num += 12;
        years += 1;
      }
      if (num > 12) {
        const monthsLeft = month_diff + 1 - num + 12; //what part of the year(12m) is left
        return years + 'y' + (monthsLeft ? monthsLeft + 'm' : '');
      }
      return month_diff + 'mths';
    }
    if (month_diff && month_diff > 0) {
    }
    return (
      (day_diff === 0 &&
        ((diff < 60 && 'just now') ||
          (diff < 120 && '1m') ||
          (diff < 3600 && Math.floor(diff / 60) + ' m') ||
          (diff < 7200 && '1m') ||
          (diff < 86400 && Math.floor(diff / 3600) + ' h'))) ||
      (day_diff === 1 && '1d') ||
      (day_diff < 7 && day_diff + ' d') ||
      (day_diff < 31 && Math.ceil(day_diff / 7) + ' w')
    );
  };

  //   const getNotification = () => {
  //     return `${notification.from} has ${notification.type} your ${notification.item.type}.`;
  //   };

  const getShortText = (text) => {
    if (text.length > 50) return text.slice(0, 50) + '...';
    else return text;
  };
  const getDescription = (interaction) => {
    switch (interaction) {
      case 'comment':
        return 'Has commented on your';
      case 'reaction':
        return 'Has reacted to your';
      case 'friend_req':
        return 'Has sent you a';
      default:
        break;
    }
  };

  const onDenyFriendRequest = () => {
    //remove friend gets a callback func to change friend status in two useStates
    // in case opening notifications in friends page - the button wont change w/o refresh
    //need to decide what to do - leave it as is or somehow change it
    dispatch(
      removeFriend(notification.user_id, notification.sender_id, () => {})
    );
    dispatch(removeNotification(notification.id));
  };
  const onApproveFriendRequest = () => {
    //mabye will add notification on approving friend requests later.
    //meanwhile sending empty function to deny notificaiton
    dispatch(
      addFriend(
        notification.user_id,
        notification.sender_id,
        'approve',
        () => {}
      )
    );
    dispatch(removeNotification(notification.id));
  };

  return (
    <li className={`${styles.item} ${styles[notification.status]}`}>
      <div className={styles['image-conatiner']}>
        <img src={profileIcon} alt='' />
      </div>
      <div className={styles.content}>
        <div>
          <span className={styles.bold}>
            {getTitledName(notification.user_info.name)}
          </span>
          <span>
            {getDescription(notification.interaction)} {notification.item_type}:
          </span>
          {notification.content && (
            <span>"{getShortText(notification.content)}"</span>
          )}
          {!notification.content && (
            <span className={styles.actions}>
              <img onClick={onApproveFriendRequest} src={checkMark} alt='' />{' '}
              <img onClick={onDenyFriendRequest} src={denyIcon} alt='' />
            </span>
          )}
        </div>
        <span className={styles.date}>{prettyDate(isoDateTime)}</span>
      </div>
    </li>
  );
};
