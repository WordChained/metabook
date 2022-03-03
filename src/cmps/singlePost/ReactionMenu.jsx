import React from 'react';
import styles from './ReactionMenu.module.css';

//reactionIcons:
import happyIcon from '../../assets/icons/happy.png';
import sadIcon from '../../assets/icons/sad.png';
import loveIcon from '../../assets/icons/love.png';
import angryIcon from '../../assets/icons/angry.png';

export const ReactionMenu = ({ addReaction }) => {
  return (
    <section className={styles.reactions}>
      <img onClick={() => addReaction('happy')} src={happyIcon} alt="" />
      <img onClick={() => addReaction('sad')} src={sadIcon} alt="" />
      <img onClick={() => addReaction('love')} src={loveIcon} alt="" />
      <img onClick={() => addReaction('angry')} src={angryIcon} alt="" />
    </section>
  );
};
