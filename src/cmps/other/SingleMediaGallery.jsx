import React from 'react';
import styles from './SingleMediaGallery.module.css';
import closeIcon from '../../assets/imgs/x-icon.png';

export const SingleMediaGallery = ({ mediaItem, close }) => {
  const videoRegexCheck = new RegExp(
    /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i
  );

  return (
    <div className={styles.container}>
      <img
        className={styles.close}
        src={closeIcon}
        alt=''
        onClick={() => close()}
      />
      {videoRegexCheck.test(mediaItem) ? (
        <video className={styles['media-item']}>
          <source src={mediaItem} />
        </video>
      ) : (
        <img className={styles['media-item']} src={mediaItem} alt='' />
      )}
    </div>
  );
};
