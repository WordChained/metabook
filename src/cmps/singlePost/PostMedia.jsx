import React, { useEffect, useState } from 'react';
import styles from './PostMedia.module.css';
import ReactPhotoGrid from 'react-photo-grid';
import { eventBusService } from '../../services/eventBusService';
import { useDispatch } from 'react-redux';
import { toggleScreenCover } from '../../store/actions/userActions';
// import { MediaItem } from './MediaItem';
// import { useWindowSize } from '../customHooks/useWindowSize';
// import errorImage from '../assets/imgs/default-error-image.jpg';
export const PostMedia = ({ media, publisher, date }) => {
  // const [gridWidth, setGridWidth] = useState();
  // const size = useWindowSize();
  // useEffect(() => {
  //   if (size.width < 680) setGridWidth('400X400');
  //   else setGridWidth('600X600');
  // }, [size.width]);
  const videoRegexCheck = new RegExp(
    /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i
  );

  const dispatch = useDispatch();

  const handleImageClick = (url) => {
    dispatch(toggleScreenCover(true));
    // const isVideo = videoRegexCheck.test(url);

    const clickedIdx = media.findIndex((m) => m.url === url);
    eventBusService.emit('media-modal', {
      // url,
      // type: isVideo ? 'video' : 'image',
      clickedIdx,
      publisher,
      date,
      allMedia: media,
    });
  };
  const getUrls = () => {
    return media.map((item) => item.url);
  };
  return (
    <div className={styles.container}>
      {media.length > 1 && (
        <ReactPhotoGrid
          data={getUrls()}
          // gridSize={gridWidth}
          onImageClick={handleImageClick}
        />
      )}
      {media.length === 1 && (
        <div
          className={styles['media-container']}
          onClick={(ev) => handleImageClick(ev.target.src)}
        >
          {!videoRegexCheck.test(media[0]) ? (
            <img src={media[0].url} alt='' />
          ) : (
            <video src={media[0].url}>{/* <source src={media[0]} /> */}</video>
          )}
          {}
        </div>
      )}
    </div>
  );
};
//   if (imageRegexCheck.test(correctMedia)) {
//     //check if image
//     return (
//       <div className={styles['image-container']}>
//         <img src={correctMedia} alt="" />
//       </div>
//     );
//   } else if (videoRegexCheck.test(correctMedia)) {
//     //check if video
//     return (
//       <div className={styles['video-container']}>
//         <video
//           onError={(e) => {
//             e.target.onerror = null;
//             setCheckMediaCrashed(true);
//           }}
//           width={'100%'}
//           height={'100%'}
//           controls
//         >
//           <source src={correctMedia} />
//         </video>
//       </div>
//     );
//   } else {
//     return <img src={errorImage} alt="" />;
//   }
// };
