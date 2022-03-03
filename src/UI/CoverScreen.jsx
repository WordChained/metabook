import React from 'react';
import styles from './CoverScreen.module.css';
import { useSelector } from 'react-redux';
import useBodyClass from '../customHooks/useBodyClass';
export const CoverScreen = () => {
  useBodyClass('modal-open');
  const { isCoverOn } = useSelector((state) => state.userModule);
  return <div className={isCoverOn ? styles.cover : ''}></div>;
};
