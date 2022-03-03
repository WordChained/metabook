import React, { useState, useEffect, useRef } from 'react';
import { eventBusService } from '../services/eventBusService';
import styles from './UserMsg.module.css';
export const UserMsg = () => {
  const [show, setShow] = useState(false);
  const [userMsg, setUserMsg] = useState('');
  const userMsgModal = useRef();

  let firstTimeout = null;
  let secondTimeout = null;
  useEffect(() => {
    eventBusService.on('userMsg', ({ msg, time = 2000 }) => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
      setUserMsg(msg);
      setShow(true);
      firstTimeout = setTimeout(() => {
        setShow(false);
        secondTimeout = setTimeout(() => {
          setUserMsg('');
        }, time + 1000);
      }, time);
    });
    return () => {};
  }, []);

  return (
    <div
      ref={userMsgModal}
      className={`${styles['general-user-msg']} ${show ? styles['show'] : ''}`}
    >
      <p>{userMsg}</p>
    </div>
  );
};
