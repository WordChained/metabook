import React from 'react';
import styles from './CommentActions.module.css';
export const CommentActions = ({ commentDate }) => {
  var isoDateTime = new Date(
    commentDate - new Date(commentDate).getTimezoneOffset() * 60000
  ).toISOString(); //   console.log(new Date(isoDate).toLocaleDateString('he-IL'));

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

  return (
    <div className={styles.actions}>
      {/* <span>Like</span>
      <span> · </span>
      <span>Reply</span>
      <span> · </span>
      <span>Share</span>
      <span> · </span> */}
      <span>{prettyDate(isoDateTime)}</span>
    </div>
  );
};
