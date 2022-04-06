import React from "react";
import styles from "./UpdateUserDetailsModal.module.css";
import xIcon from "../../assets/imgs/x-icon.png";
export const UpdateUserDetailsModal = ({
  show,
  address,
  education,
  career,
  userId,
}) => {
  const onExit = () => {
    show(false);
  };
  const onUpdate = (data) => {
    //TODO: prevent default or use useForm
    //TODO: send the correct data - depends on which form sends it
    // maybe can use same func for everyone and just send different data
    //TODO: handle callback to start/end a loader
    //TODO: keep new text (fetch it with the callback or just keep what was sent)
    //TODO: user msg?
  };
  return (
    <>
      <div className={styles.cover} onClick={onExit}></div>
      <div className={styles.container}>
        <img className={styles.exit} src={xIcon} alt="" onClick={onExit} />
        {/* this requires google maps. its ready, but for now i wont use it, since it costs money */}
        {/* <h2>Update Address</h2> */}
        {/* <form className={styles["address-update-form"]}>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            defaultValue={address}
            placeholder={"Where are you from?"}
          ></textarea>
            <div className={styles["btn-container"]}>
            <button className={styles["update-btn"]}>Update!</button>
          </div>
        </form> */}
        <form className={styles["education-update-form"]}>
          <h2>Update Education</h2>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            defaultValue={education}
            placeholder={"Where did you study?"}
          ></textarea>
          <div className={styles["btn-container"]}>
            <button className={styles["update-btn"]}>Update!</button>
          </div>
        </form>
        <form className={styles["career-update-form"]}>
          <h2>Update Career</h2>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            defaultValue={career}
            placeholder={"Where do you work at the moment?"}
          ></textarea>
          <div className={styles["btn-container"]}>
            <button className={styles["update-btn"]}>Update!</button>
          </div>
        </form>
      </div>
    </>
  );
};
