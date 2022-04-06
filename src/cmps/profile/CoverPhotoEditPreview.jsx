import React, { useState } from 'react';
import styles from './CoverPhotoEditPreview.module.css';
import closeIcon from '../../assets/imgs/x-icon.png';
import checkMark from '../../assets/imgs/check-mark.png';
import { useDispatch } from 'react-redux';
import { uploadImageToSubFolder } from '../../services/img-upload-service';
import { update } from '../../store/actions/userActions';
export const CoverPhotoEditPreview = ({
  cancelCoverPhotoEdit,
  newCP,
  fileToUpload,
  userId,
}) => {
  const [showActions, setShowActions] = useState(false);

  const dispatch = useDispatch();

  const onChangeCoverPhoto = async () => {
    const newCoverPhotoData = await uploadImageToSubFolder(
      fileToUpload,
      userId,
      'cover-photos'
    );
    //update takes three args: userId,colName, newValue
    dispatch(update(userId, 'coverPhoto', newCoverPhotoData.url));
  };
  return (
    <div
      className={styles.container}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {showActions && (
        <div className={styles.actions}>
          <img
            src={closeIcon}
            alt=''
            onClick={cancelCoverPhotoEdit}
            className={styles.cancel}
          />
          <img
            src={checkMark}
            alt=''
            className={styles.ok}
            onClick={onChangeCoverPhoto}
          />
        </div>
      )}
      <img className={styles.preview} src={newCP} alt='' />
    </div>
  );
};
