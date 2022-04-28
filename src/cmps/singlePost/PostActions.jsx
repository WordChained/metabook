import React, { Fragment, useState } from 'react';
import styles from './PostActions.module.css';

import likeIcon from '../../assets/icons/like.png';
import likeColorIcon from '../../assets/icons/like-color.png';
import happyIcon from '../../assets/icons/happy.png';
import sadIcon from '../../assets/icons/sad.png';
import loveIcon from '../../assets/icons/love.png';
import angryIcon from '../../assets/icons/angry.png';

import shareIcon from '../../assets/icons/share.png';
import commentIcon from '../../assets/icons/comment.png';
import closeCommentIcon from '../../assets/imgs/close-comment.png';
import { ReactionMenu } from './ReactionMenu';
import { useDispatch } from 'react-redux';
import { save } from '../../store/actions/itemActions';
import {
  removeNotification,
  sendNotification,
} from '../../store/actions/notificationActions';
export const PostActions = ({
  setShowComments,
  showComments,
  post,
  userId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  let openReactionMenuTimer = null;
  let closeReactionMenuTimer = null;
  const dispatch = useDispatch();
  const checkIsHovered = (hover) => {
    clearTimeout(closeReactionMenuTimer);
    clearTimeout(openReactionMenuTimer);
    if (hover) {
      openReactionMenuTimer = setTimeout(() => {
        setIsHovered(true);
      }, 1500);
    } else if (!hover && isHovered) {
      closeReactionMenuTimer = setTimeout(() => {
        clearTimeout(openReactionMenuTimer);
        setIsHovered(false);
      }, 1000);
    }
  };

  const addReaction = (type) => {
    //for notification on comment i need to copy this and change item_type to comment
    //this (checkSuccess) is inside cause i rewrite the function to an empty one to block a notification on removing reactions/ changing reaction type
    let checkSuccess = (res) => {
      if (!res) return;
      const notification = {
        ...res,
        to: post.publisher.id,
        from: userId,
        item_type: 'post',
        interaction: 'reaction',
      };
      console.log('res:', notification);
      if (notification.to === notification.from) {
        console.log('user doesnt need to notify himself!');
        return;
      }
      dispatch(sendNotification(notification));
    };
    console.log('reaction type:', type);
    const existInSameReactionType = checkExist(post.engagement.reactions, type);
    if (existInSameReactionType) {
      console.log('exists in same reaction');
      //if exists in same type, splice it
      const idx = post.engagement.reactions[type].findIndex(
        (id) => id === userId
      );
      post.engagement.reactions[type].splice(idx, 1);
      checkSuccess = () => {
        // dispatch(removeNotification())
        //no idea how to 'remember' the notification id
      };
    } else {
      //if doesnt, need to check if exists in other types
      let correctReactionType;
      const object = post.engagement.reactions;
      for (const reactionType in object) {
        if (object[reactionType].includes(userId)) {
          correctReactionType = reactionType;
        } else {
          // console.log('not in', reactionType);
        }
      }
      if (correctReactionType) {
        //if it does, splice and change it!
        checkSuccess = () => {};
        // console.log('correctReactionType:', correctReactionType);
        const idx = post.engagement.reactions[type].findIndex(
          (id) => id === userId
        );
        post.engagement.reactions[correctReactionType].splice(idx, 1);
        post.engagement.reactions[type].push(userId);
      } else {
        //if it doesnt just add it
        // console.log('just adding');
        post.engagement.reactions[type].push(userId);
      }
    }
    // console.log("post after reaction:", post);
    dispatch(save(post, 'post', checkSuccess, false));
  };

  const checkExist = (reactions, type) => {
    return reactions[type].includes(userId);
  };
  const onAddComment = () => {
    setShowComments(true);
  };
  const sharePost = () => {
    console.log('i want to share this!');
  };

  const getReactionType = () => {
    const object = post.engagement.reactions;
    let reaction;
    for (const reactionType in object) {
      if (object[reactionType].includes(userId)) reaction = reactionType;
    }
    return reaction;
  };
  const getReactionIcon = () => {
    let reaction = getReactionType();
    switch (reaction) {
      case 'likes':
        return likeColorIcon;

      case 'angry':
        return angryIcon;

      case 'sad':
        return sadIcon;

      case 'love':
        return loveIcon;

      case 'happy':
        return happyIcon;

      default:
        return likeIcon;
    }
  };
  return (
    <Fragment>
      <div className={styles.container}>
        <button
          onMouseEnter={() => checkIsHovered(true)}
          onMouseLeave={() => checkIsHovered(false)}
        >
          {isHovered && <ReactionMenu addReaction={addReaction} />}
          <img
            src={getReactionIcon()}
            alt=''
            onClick={() => addReaction('likes')}
          />
          {/* Like */}
        </button>
        <button onClick={() => onAddComment()}>
          <img src={!showComments ? commentIcon : closeCommentIcon} alt='' />
        </button>
        {/* <button onClick={() => sharePost()}>
          <img src={shareIcon} alt='' />
        </button> */}
      </div>
    </Fragment>
  );
};
