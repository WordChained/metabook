import React, { useRef, useState } from "react";
import styles from "./CommentForm.module.css";

import randomUser from "../../assets/imgs/profile-color.png";

import smiley from "../../assets/imgs/smiley.png";
import thinking from "../../assets/imgs/thinking.png";
import send from "../../assets/imgs/send.png";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { EmojiWindow } from "../other/EmojiWindow";

import { save } from "../../store/actions/itemActions";
import { sendNotification } from "../../store/actions/notificationActions";
export const CommentForm = ({ postId, parentPublisherId }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    // register,
    // reset,
  } = useForm();

  const [formTextLength, setFormTextLength] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showEmojiWindow, setShowEmojiWindow] = useState(false);

  const { loggedInUser } = useSelector((state) => state.userModule);
  // const [isMobile, setIsMobile] = useState(false);
  const checkUserProfilePicture =
    loggedInUser && loggedInUser.profilePicture
      ? loggedInUser.profilePicture
      : randomUser;

  const getCommentText = (ev) => {
    ev.preventDefault();
    setFormTextLength(ev.target.value.length);
    setCommentText(ev.target.value);
  };
  const checkSuccess = (res) => {
    if (!res) return;
    // const notification = {
    //   ...res,
    // };
    if (res.to === res.from) {
      console.log("user doesnt need to notify himself!");
      return;
    }
    dispatch(sendNotification(res));
  };
  const onSubmit = (data) => {
    const comment = {
      parentId: postId,
      parentPublisherId,
      publisher: {
        name: loggedInUser.name,
        profilePicture: loggedInUser.profilePicture,
        id: loggedInUser.userId,
      },
      // text: data['comment-text'],
      text: commentText,
      media: [],
    };
    dispatch(save(comment, "comment", checkSuccess));
    // reset();
    setCommentText("");
    setShowEmojiWindow(false);
  };
  const addEmoji = (emoji) => {
    setCommentText((prevText) => prevText + emoji);
  };
  return (
    <>
      <div className={styles["comment-form"]}>
        <div className={styles["image-container"]}>
          <img src={checkUserProfilePicture} alt="" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            // {...register('comment-text')}
            onInput={getCommentText}
            type="text"
            placeholder="Post a Comment..."
            value={commentText}
          />
          <div className={styles.actions}>
            {/* <img src={checkUserProfilePicture} alt="" /> */}
            <img
              src={!showEmojiWindow ? smiley : thinking}
              alt=""
              onClick={() => setShowEmojiWindow(!showEmojiWindow)}
            />

            {/* <img src={gif} alt="" /> */}
          </div>
          <button disabled={formTextLength < 1}>
            <img src={send} alt="" />
          </button>
        </form>
      </div>
      <div className={styles["emoji-window-container"]}>
        {showEmojiWindow && <EmojiWindow addEmoji={addEmoji} />}
      </div>
    </>
  );
};
