import React, { useState } from "react";
import styles from "./Login-Signup.module.css";

import openEye from "../../assets/imgs/open-eye.png";
import closedEye from "../../assets/imgs/closed-eye.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/userActions";
import { validate } from "../../services/utilService";
import { useForm } from "react-hook-form";
export const Login = ({ setCheckIfUser }) => {
  const { register, handleSubmit } = useForm();
  const { ready, loggedInUser, loginLoader } = useSelector(
    (state) => state.userModule
  );
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const userEmail = data["email-input"].trim();
    const userPassword = data["password-input"].trim();
    if (validate("email", userEmail) && validate("password", userPassword)) {
      dispatch(login(userEmail, userPassword));
      // setLoading(false);
    } else {
      console.log("unvalidated, try again.");
    }
  };
  return (
    <div className={`${styles.container} ${styles.login}`}>
      <div className={styles["right-header"]}>
        <button onClick={() => setCheckIfUser(false)}>
          Not a User? Signup!
        </button>
        <div className={styles["h-container"]}>
          <h1>Already a User?</h1>
          <h4>Jump In!</h4>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="email"
          {...register("email-input")}
          required
        />
        <label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            {...register("password-input")}
            minLength={8}
            required
          />
          <div className={styles["eye-image-container"]}>
            <img
              onClick={() => setShowPassword(!showPassword)}
              src={showPassword ? openEye : closedEye}
              alt=""
            />
          </div>
        </label>
        <button type="submit" className={styles["submit-button"]}>
          {loginLoader ? (
            <div className={styles["lds-ellipsis"]}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};
