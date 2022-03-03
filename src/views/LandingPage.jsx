import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import { Signup } from "../cmps/login/Signup";
import { Login } from "../cmps/login/Login";
import pandemic from "../assets/imgs/pandemic.png";
import dice from "../assets/imgs/dice-no-bg.png";

export const LandingPage = () => {
  const [checkIfUser, setCheckIfUser] = useState(true);

  return (
    <section className={styles["landing-page"]}>
      <header>
        <h1>Metabook</h1>
      </header>
      <div className={styles.content}>
        <div className={styles.greeting}>
          <img className={styles.dice} src={dice} alt="" />
          <p>
            {
              "Metabook is a where you shouldn't be when you have important stuff to do.\nNo, really, You should go do them..."
            }
          </p>
          <div className={styles["pandemic-container"]}>
            <img src={pandemic} alt="" />
          </div>
        </div>
        {!checkIfUser && <Signup setCheckIfUser={setCheckIfUser} />}
        {checkIfUser && <Login setCheckIfUser={setCheckIfUser} />}
      </div>
    </section>
  );
};
