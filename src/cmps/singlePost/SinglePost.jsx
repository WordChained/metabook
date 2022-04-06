import React, { useState } from 'react';
import styles from './SinglePost.module.css';

import { PostMedia } from './PostMedia';
import { PostActions } from './PostActions';
import { EngagementInfo } from './EngagementInfo';
import { Comments } from './Comments';
import { PostOptions } from './PostOptions';
import randomUser from '../../assets/imgs/profile-color.png';
import optionsIcon from '../../assets/imgs/option.png';
import { useSelector } from 'react-redux';
// import { UpdateModal } from '../UpdateModal';

// feeling icons:
import happyIcon from '../../assets/icons/happy.png';
import sadIcon from '../../assets/icons/sad.png';
import confusedIcon from '../../assets/icons/happy.png';
import proudIcon from '../../assets/icons/proud.png';
import excitedIcon from '../../assets/icons/excited.png';
import angryIcon from '../../assets/icons/angry.png';
import { useNavigate } from 'react-router';
import { getTitledName, titleCase } from '../../services/utilService';

export const SinglePost = ({ post }) => {
  // console.log('singlePost from mongo:', post);
  // const postId = [...Object.keys(post.post)][0];
  // const postContent = post.post[`${postId}`];
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.userModule);

  const [fullText, setFullText] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showOptionDropdown, setShowOptionDropdown] = useState(false);

  // const isLongText = postContent.postText && postContent.postText.length < 180;

  // const getCorrectTextLength = () => {
  //   return fullText || isLongText
  //     ? postContent.postText
  //     : postContent.postText.slice(0, 180) + '...';
  // };

  const isLongText = post.text && post.text.length < 180;

  const getCorrectTextLength = () => {
    return fullText || isLongText ? post.text : post.text.slice(0, 180) + '...';
  };
  const getFeelingIcon = (feeling) => {
    let feelingIcon;
    switch (feeling) {
      case 'happy':
        feelingIcon = happyIcon;
        break;
      case 'sad':
        feelingIcon = sadIcon;
        break;
      case 'confused':
        feelingIcon = confusedIcon;
        break;
      case 'proud':
        feelingIcon = proudIcon;
        break;
      case 'excited':
        feelingIcon = excitedIcon;
        break;
      case 'angry':
        feelingIcon = angryIcon;
        break;

      default:
        break;
    }
    return feelingIcon;
  };

  const navigateToProfile = (id) => {
    if (id === loggedInUser.userId) navigate('/my-profile');
    else navigate(`/profiles/${id}`);
  };

  return (
    <section
      className={styles.post}
      onMouseLeave={() => setShowOptionDropdown(false)}
    >
      {loggedInUser.userId === post.publisher.id && (
        <img
          className={styles.options}
          src={optionsIcon}
          alt=''
          onClick={() => setShowOptionDropdown(!showOptionDropdown)}
        />
      )}
      {showOptionDropdown && (
        <PostOptions
          post={post}
          postId={post._id}
          userId={loggedInUser.userId}
          publisherId={post.publisher.id}
        />
      )}
      <div className={styles['post-info']}>
        <div className={styles['post-user-image-container']}>
          <img
            src={
              post.publisher.profilePicture
                ? post.publisher.profilePicture
                : randomUser
            }
            alt=''
          />
        </div>
        <span className={styles['post-name-date-container']}>
          <span onClick={() => navigateToProfile(post.publisher.id)}>
            {getTitledName(post.publisher.name)}
          </span>
          <span>
            {new Date(post.date).toLocaleDateString('he-IL') +
              ', ' +
              new Date(post.date).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
          </span>
        </span>
      </div>
      <div className={styles['content-container']}>
        {post.feeling && (
          <span className={styles.feeling}>
            {`${titleCase(loggedInUser.name.first)} is Feeling ${post.feeling}`}
            <img src={getFeelingIcon(post.feeling)} alt='' />
          </span>
        )}
        <p>
          {getCorrectTextLength()}
          {!isLongText && (
            <span className={styles['text-length']}>
              <button onClick={() => setFullText(!fullText)}>
                Read {fullText ? 'Less' : 'More'}
              </button>
            </span>
          )}
        </p>
      </div>
      {post.media.length > 0 && (
        <PostMedia
          media={post.media}
          publisher={post.publisher}
          date={post.date}
        />
      )}
      <EngagementInfo
        data={post.engagement}
        setShowComments={() => setShowComments(!showComments)}
        showComments={showComments}
      />
      <PostActions
        setShowComments={() => setShowComments(!showComments)}
        showComments={showComments}
        post={post}
        userId={loggedInUser.userId}
      />
      {showComments && (
        <Comments
          parentPublisherId={post.publisher.id}
          comments={post.engagement.comments}
          postId={post._id}
        />
      )}
    </section>
  );
};
