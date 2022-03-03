import React, { useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';
import styles from './EmojiWindow.module.css';

export const EmojiWindow = ({ addEmoji, setShowEmojiWindow }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  useEffect(() => {
    if (!chosenEmoji) return;
    addEmoji(chosenEmoji.emoji);
    //eslint-disable-next-line
  }, [chosenEmoji]);
  return (
    <div
      // onMouseLeave={() => setShowEmojiWindow(false)}
      className={styles['emoji-window-container']}
    >
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};
