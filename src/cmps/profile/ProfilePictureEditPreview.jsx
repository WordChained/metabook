import React, { useState } from "react";
import styles from "./ProfilePictureEditPreview.module.css";
import closeIcon from "../../assets/imgs/x-icon.png";
import checkMark from "../../assets/imgs/check-mark.png";
import { useDispatch } from "react-redux";
import { uploadImageToSubFolder } from "../../services/img-upload-service";
import { update } from "../../store/actions/userActions";
export const ProfilePictureEditPreview = ({
  newPP,
  cancelProfilePictureEdit,
  fileToUpload,
  userId,
}) => {
  const [showActions, setShowActions] = useState(false);

  const dispatch = useDispatch();

  const onChangeProfilePicture = async () => {
    const newProfilePictureData = await uploadImageToSubFolder(
      fileToUpload,
      userId,
      "profile-pictures"
    );
    //update takes three args: userId,colName, newValue
    console.log(newProfilePictureData.url);
    dispatch(update(userId, "profilePicture", newProfilePictureData.url));
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
            alt=""
            onClick={cancelProfilePictureEdit}
            className={styles.cancel}
          />
          <img
            src={checkMark}
            alt=""
            className={styles.ok}
            onClick={onChangeProfilePicture}
          />
        </div>
      )}
      <img className={styles.preview} src={newPP} alt="" />
    </div>
  );
};
