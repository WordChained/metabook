import React from "react";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import styles from "./Comments.module.css";

export const Comments = ({ parentPublisherId, comments, postId }) => {
  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
      <CommentForm parentPublisherId={parentPublisherId} postId={postId} />
    </div>
  );
};
