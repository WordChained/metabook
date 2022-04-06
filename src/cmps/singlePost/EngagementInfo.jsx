import React, { useEffect, useState } from 'react';
import styles from './EngagementInfo.module.css';

//reactionIcons:
import happyIcon from '../../assets/icons/happy.png';
import sadIcon from '../../assets/icons/sad.png';
import loveIcon from '../../assets/icons/love.png';
import angryIcon from '../../assets/icons/angry.png';
import likeIcon from '../../assets/icons/like-color.png';

export const EngagementInfo = ({ data, setShowComments, showComments }) => {
  const [showLikes, setShowLikes] = useState(false);
  const [showLove, setShowLove] = useState(false);
  const [showSad, setShowSad] = useState(false);
  const [showHappy, setShowHappy] = useState(false);
  const [showAngry, setShowAngry] = useState(false);
  const [numberOfReactions, setNumberOfReactions] = useState(0);

  const openReactionsList = () => {
    //need to either link to a different url or open a modal with a list of who did what reaction
  };
  const checkPlural = (word, length) => {
    if (length > 1) return word.concat('s');
    else return word;
  };
  useEffect(() => {
    displayCorrectReactions();
    calculateNumberOfReactions();
    // console.log(data.comments);
  }, [data.reactions]);
  const calculateNumberOfReactions = () => {
    setNumberOfReactions(
      data.reactions.likes.length +
        data.reactions.love.length +
        data.reactions.sad.length +
        data.reactions.happy.length +
        data.reactions.angry.length
    );
  };
  const displayCorrectReactions = () => {
    setShowLikes(!!data.reactions.likes.length);
    setShowLove(!!data.reactions.love.length);
    setShowSad(!!data.reactions.sad.length);
    setShowHappy(!!data.reactions.happy.length);
    setShowAngry(!!data.reactions.angry.length);
  };
  return (
    <div className={styles.container}>
      <div className={styles['reaction-preview']}>
        {showHappy && <img src={happyIcon} alt='' />}
        {showLove && <img src={loveIcon} alt='' />}
        {showSad && <img src={sadIcon} alt='' />}
        {showAngry && <img src={angryIcon} alt='' />}
        {showLikes && <img src={likeIcon} alt='' />}
        {numberOfReactions > 0 && numberOfReactions}
      </div>

      {data.comments.length > 0 && (
        <span onClick={() => setShowComments(!showComments)}>
          {data.comments.length} {checkPlural('Comment', data.comments.length)}
        </span>
      )}
    </div>
  );
};
