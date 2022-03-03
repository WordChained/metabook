import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { eventBusService } from "../../services/eventBusService";
import { getAllUserMedia } from "../../store/actions/cloudinaryActions";
import { toggleScreenCover } from "../../store/actions/userActions";
import styles from "./MyImages.module.css";
// import { getAllUsersImages } from '../../services/img-upload-service';
export const MyImages = ({ userId, user }) => {
  const { userMedia, currentUserId } = useSelector(
    (state) => state.cloudinaryModule
  );
  const dispatch = useDispatch();

  const getMedia = () => {
    dispatch(getAllUserMedia(userId));
  };
  const { id } = useParams();
  useEffect(() => {
    if (id && userMedia && id === currentUserId) return;
    getMedia();
  }, []);

  const openMediaModal = (clickedIdx, date) => {
    eventBusService.emit("media-modal", {
      clickedIdx,
      publisher: user,
      date,
      allMedia: userMedia,
    });
    dispatch(toggleScreenCover(true));
  };

  if (!userMedia || !userMedia.length) return <div>No Media to Show</div>;
  return (
    <div className={styles.container}>
      {userMedia.map((item, idx) =>
        item.resource_type === "image" ? (
          <img
            src={item.secure_url}
            alt=""
            onClick={() => openMediaModal(idx, item.created_at)}
            key={item.public_id}
          />
        ) : (
          <video key={item.public_id}>
            <source
              key={item.public_id}
              src={item.secure_url}
              onClick={() => openMediaModal()}
            />
          </video>
        )
      )}
    </div>
  );
};
