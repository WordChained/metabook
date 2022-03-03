import React, { useRef, useEffect } from 'react';
import styles from './ErrorPage.module.css';
import gsap from 'gsap';
import { useNavigate } from 'react-router';
export const ErrorPage = () => {
  //refs for animation
  const cog1Ref = useRef();
  const cog2Ref = useRef();
  const wrongParamRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (cog1Ref && cog2Ref && wrongParamRef) {
      let t1 = gsap.timeline();
      let t2 = gsap.timeline();
      let t3 = gsap.timeline();
      t1.to(cog1Ref.current, {
        transformOrigin: '50% 50%',
        rotation: '+=360',
        repeat: -1,
        ease: 'none',
        duration: 8,
      });

      t2.to(cog2Ref.current, {
        transformOrigin: '50% 50%',
        rotation: '-=360',
        repeat: -1,
        ease: 'none',
        duration: 8,
      });

      t3.fromTo(
        wrongParamRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          stagger: {
            repeat: -1,
            yoyo: true,
          },
        }
      );
    }
  }, [cog1Ref, cog2Ref, wrongParamRef]);

  return (
    <div className={styles['container']}>
      <h1 className={styles['first-four']}>4</h1>
      <div className={styles['cog-wheel1']}>
        <div className={styles['cog1']} ref={cog1Ref}>
          <div className={styles['top']}></div>
          <div className={styles['down']}></div>
          <div className={styles['left-top']}></div>
          <div className={styles['left-down']}></div>
          <div className={styles['right-top']}></div>
          <div className={styles['right-down']}></div>
          <div className={styles['left']}></div>
          <div className={styles['right']}></div>
        </div>
      </div>
      <div className={styles['cog-wheel2']}>
        <div className={styles['cog2']} ref={cog2Ref}>
          <div className={styles['top']}></div>
          <div className={styles['down']}></div>
          <div className={styles['left-top']}></div>
          <div className={styles['left-down']}></div>
          <div className={styles['right-top']}></div>
          <div className={styles['right-down']}></div>
          <div className={styles['left']}></div>
          <div className={styles['right']}></div>
        </div>
      </div>
      <h1 className={styles['second-four']}>4</h1>
      <p className={styles['wrong-para']} ref={wrongParamRef}>
        Uh Oh! Page not found!
        <button
          className={styles['back-to-safety']}
          onClick={() => navigate('/')}
        >
          Back To Safety
        </button>
      </p>
    </div>
  );
};
