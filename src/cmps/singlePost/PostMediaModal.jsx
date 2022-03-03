import React, { useEffect, useState } from "react";
import { eventBusService } from "../../services/eventBusService";
import styles from "./PostMediaModal.module.css";

import randomUser from "../../assets/imgs/profile-color.png";
import arrowIcon from "../../assets/imgs/next.png";

import { useDispatch, useSelector } from "react-redux";
import { toggleScreenCover } from "../../store/actions/userActions";
import { getTitledName } from "../../services/utilService";
export const PostMediaModal = () => {
  const dispatch = useDispatch();
  // I CAN OPEN THE CURRENT POST ===> MEDIA ===> CHOOSE BY IDX ===> WATCH ALL IMAGES WITH ARROWS
  // const [isVideo, setIsVideo] = useState(false);
  const [currentIdx, setCurrentIdx] = useState();
  const [currentMedia, setCurrentMedia] = useState();
  const [currentMediaArray, setCurrentMediaArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [publisherInfo, setPublisherInfo] = useState(null);
  const [postDate, setPostDate] = useState(null);

  const videoRegexCheck = new RegExp(
    /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i
  );

  useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        setShowModal(false);
        dispatch(toggleScreenCover(false));
      } else return;
    });
    eventBusService.on(
      "media-modal",
      ({ clickedIdx, publisher, date, allMedia }) => {
        // setIsVideo(type === 'video');
        setCurrentIdx(clickedIdx);
        setCurrentMediaArray(allMedia);
        setShowModal(true);
        setPublisherInfo(publisher);
        setPostDate(date);
        setCurrentMedia(allMedia[clickedIdx]);
      }
    );
  }, []);

  const exitModal = () => {
    setShowModal(false);
    dispatch(toggleScreenCover(false));
  };

  const getCorrectIndex = (move) => {
    if (currentIdx + move >= currentMediaArray.length) {
      setCurrentMedia(currentMediaArray[0]);
      setCurrentIdx(0);
    } else if (currentIdx + move < 0) {
      setCurrentMedia(currentMediaArray[currentMediaArray.length - 1]);
      setCurrentIdx(currentMediaArray.length - 1);
    } else {
      setCurrentMedia(currentMediaArray[currentIdx + move]);
      setCurrentIdx(currentIdx + move);
    }
  };

  if (!publisherInfo)
    return <div className={styles["container"]}>Loading...</div>;
  return (
    <>
      <div
        className={showModal ? styles["container-show"] : styles["container"]}
      >
        <div className={styles.content}>
          <button className={styles.exit} onClick={exitModal}>
            X
          </button>
          <div className={styles.publisher}>
            <div className={styles["image-container"]}>
              <img
                src={
                  publisherInfo.profilePicture
                    ? publisherInfo.profilePicture
                    : randomUser
                }
                alt=""
              />
            </div>
            <div className={styles.info}>
              <p>{getTitledName(publisherInfo.name)}</p>
              <span>{new Date(postDate).toLocaleDateString("he-IL")}</span>
            </div>
          </div>
          {!currentMedia && (
            <div className={styles["lds-grid"]}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          <div className={styles["media-item-container"]}>
            {currentMediaArray.length > 2 && (
              <img
                className={styles.left}
                src={arrowIcon}
                alt=""
                onClick={() => getCorrectIndex(-1)}
              />
            )}
            {currentMediaArray.length && (
              <div>
                {!videoRegexCheck.test(currentMedia) && (
                  <img src={currentMedia.url} alt="" />
                )}
                {videoRegexCheck.test(currentMedia) && (
                  <video src={currentMedia.url}></video>
                )}
              </div>
            )}
            {currentMediaArray.length > 2 && (
              <img
                className={styles.right}
                src={arrowIcon}
                alt=""
                onClick={() => getCorrectIndex(1)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
