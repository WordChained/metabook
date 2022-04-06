import React, { useEffect, useState } from 'react';
import styles from './PostMedia.module.css';
import errorImage from '../assets/imgs/default-error-image.jpg';

export const MediaItem = ({ item, length }) => {
  const [correctMedia, setCorrectMedia] = useState(item);
  const [checkMediaCrashed, setCheckMediaCrashed] = useState(false);
  const videoRegexCheck = new RegExp(
    /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i
  );
  const imageRegexCheck = new RegExp(
    /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i
  );

  useEffect(() => {
    setCorrectMedia();
    if (!checkMediaCrashed) {
      setCorrectMedia(item);
      return;
    }
    setCorrectMedia(errorImage);
  }, [checkMediaCrashed, errorImage]);

  if (videoRegexCheck.test(correctMedia)) {
    return (
      <div className={styles['video-container']}>
        <video
          onError={(e) => {
            e.target.onerror = null;
            setCheckMediaCrashed(true);
          }}
          width={'100%'}
          height={'100%'}
          controls
        >
          <source src={correctMedia} />
        </video>
      </div>
    );
  } else if (imageRegexCheck.test(correctMedia)) {
    return (
      <div className={styles['image-container']}>
        <img src={correctMedia} alt='' />
      </div>
    );
  } else {
    return <img src={errorImage} alt='' />;
  }
};
