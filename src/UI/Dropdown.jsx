import React from 'react';
import styles from './Dropdown.module.css';
export const Dropdown = (props) => {
  return (
    <div className={styles.dropdown}>
      <ul>{props.children}</ul>
    </div>
  );
};
