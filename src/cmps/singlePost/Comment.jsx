import React, { Fragment, useRef, useState, useEffect } from "react";
import styles from "./Comment.module.css";
import randomImage from "../../assets/imgs/profile-color.png";

import { CommentActions } from "./CommentActions";
import { CommentOptions } from "./CommentOptions";
import { CommentEditor } from "./CommentEditor";
import option from "../../assets/imgs/option.png";
import { useSelector } from "react-redux";
import { getTitledName } from "../../services/utilService";

export const Comment = ({ comment }) => {
  const { loggedInUser } = useSelector((state) => state.userModule);

  const [showCommentOptions, setShowCommentOptions] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [limitHeight, setLimitHeight] = useState(false);
  const [highComment, setHighComment] = useState(false);
  const [startEditing, setStartEditing] = useState(false);

  const commentRef = useRef();
  useEffect(() => {
    if (commentRef.current.offsetHeight > 200) {
      console.log("high comment:", comment.text);
      setLimitHeight(true);
      setHighComment(true);
    }
  }, []);
  const toggleShow = () => {
    setLimitHeight(!limitHeight);
    setShowFullText(!showFullText);
  };
  return (
    <Fragment>
      <section
        className={styles.comment}
        onMouseLeave={() => setShowCommentOptions(false)}
        ref={commentRef}
      >
        <div className={styles["comment-user-image"]}>
          <img
            src={
              comment.publisher.profilePicture
                ? comment.publisher.profilePicture
                : randomImage
            }
            alt=""
          />
        </div>
        <div className={styles.content}>
          {loggedInUser.userId === comment.publisher.id && (
            <>
              {!startEditing && (
                <img
                  className={styles.options}
                  src={option}
                  alt=""
                  onClick={() => setShowCommentOptions(!showCommentOptions)}
                />
              )}

              {showCommentOptions && !startEditing && (
                <CommentOptions
                  comment={comment}
                  userId={loggedInUser.userId}
                  setStartEditing={setStartEditing}
                />
              )}
            </>
          )}
          <span>{getTitledName(comment.publisher.name)}</span>
          {!startEditing && (
            <>
              <p
                className={`${styles.text} ${limitHeight ? styles.limit : ""}`}
              >
                {comment.text.length > 150 && !showFullText
                  ? comment.text.slice(0, 150)
                  : comment.text}
              </p>
              {(comment.text.length > 150 || highComment) && (
                <span onClick={toggleShow}>
                  {showFullText || !limitHeight ? " ...Less" : " ...More"}
                </span>
              )}
            </>
          )}
          {startEditing && (
            <CommentEditor
              prevText={comment.text}
              setStartEditing={setStartEditing}
              comment={comment}
            />
          )}
        </div>
      </section>
      <CommentActions commentDate={comment.date} />
    </Fragment>
  );
};
