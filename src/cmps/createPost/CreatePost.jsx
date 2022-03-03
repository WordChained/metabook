import React, { useState, useRef, useEffect } from "react";

import { FeelingDropdown } from "./FeelingDropdown";
import { useForm } from "react-hook-form";

import randomUser from "../../assets/imgs/profile-color.png";
// import sendIcon from '../../assets/imgs/send.png';
import pictureIcon from "../../assets/imgs/picture-color.png";
import videoIcon from "../../assets/imgs/video-player-color.png";
import feelingIcon from "../../assets/imgs/feeling-color.png";
import videoBG from "../../assets/imgs/video-bg.png";
import smiley from "../../assets/imgs/smiley.png";

// feeling icons:
import happyIcon from "../../assets/icons/happy.png";
import sadIcon from "../../assets/icons/sad.png";
import confusedIcon from "../../assets/icons/happy.png";
import proudIcon from "../../assets/icons/proud.png";
import excitedIcon from "../../assets/icons/excited.png";
import angryIcon from "../../assets/icons/angry.png";

import styles from "./CreatePost.module.css";
import { uploadImg } from "../../services/img-upload-service";
import { useDispatch, useSelector } from "react-redux";
import { save, toggleUploadLoader } from "../../store/actions/itemActions";
import { toggleScreenCover } from "../../store/actions/userActions";
import { EmojiWindow } from "../EmojiWindow";
import { titleCase } from "../../services/utilService";
export const CreatePost = React.memo(() => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { loggedInUser } = useSelector((state) => state.userModule);
  const { showLoader } = useSelector((state) => state.itemModule);

  const previewRef = useRef();
  const fileInputRef = useRef();
  // const textareaRef = useRef();

  const [postText, setPostText] = useState("");
  const [showFeelingDropdown, setShowFeelingDropdown] = useState(false);
  const [postFeeling, setPostFeeling] = useState();
  const [inputPositionAbsolute, setInputPositionAbsolute] = useState(false);

  const [checkMediaPreview, setCheckMediaPreview] = useState(false);
  const [loader, setLoader] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState(null);

  const [showEmojiWindow, setShowEmojiWindow] = useState(false);

  const discardFiles = (alert = true) => {
    if (alert) {
      if (!window.confirm("Are you sure you want to discard your changes?"))
        return;
    }
    setFilesToUpload(null);
    previewRef.current = "";
    setCheckMediaPreview(false);
    setLoader(false);
  };

  const discardSingleFile = (fileToDiscard) => {
    setFilesToUpload((prevFiles) => {
      const newFilesToUpload = prevFiles.filter(
        (f) => f.name !== fileToDiscard.name
      );
      return newFilesToUpload;
    });
    const childIndex = Array.from(previewRef.current.children).findIndex(
      (child) => {
        return child.id === fileToDiscard.name;
      }
    );
    previewRef.current.removeChild(previewRef.current.children[childIndex]);
  };
  const getFeelingIcon = (feeling) => {
    let feelingIcon;
    switch (feeling) {
      case "happy":
        feelingIcon = happyIcon;
        break;
      case "sad":
        feelingIcon = sadIcon;
        break;
      case "confused":
        feelingIcon = confusedIcon;
        break;
      case "proud":
        feelingIcon = proudIcon;
        break;
      case "excited":
        feelingIcon = excitedIcon;
        break;
      case "angry":
        feelingIcon = angryIcon;
        break;

      default:
        break;
    }
    return feelingIcon;
  };

  const addEmoji = (emoji) => {
    setPostText((prevText) => prevText + emoji);
  };
  const onSubmit = async (data) => {
    dispatch(toggleUploadLoader(true));
    let filePromises;
    try {
      if (filesToUpload) {
        filePromises = await Promise.all(
          filesToUpload.map(async (file) => {
            const uploadedFileRes = await uploadImg(file, loggedInUser.userId);
            console.log("uploadedImageRes:", uploadedFileRes);
            return uploadedFileRes;
          })
        );
      }
      dispatch(
        save(
          {
            text: data["post-text"],
            media: filePromises && filePromises[0] ? filePromises : [],
            publisher: {
              id: loggedInUser.userId,
            },
            feeling: postFeeling ? postFeeling : "",
          },
          "post"
        )
      );
      discardFiles(false); //the false is whether to show alert or not
      setPostText("");
      reset();
    } catch (err) {
      console.log("uploadImage error:", err);
      console.log(err.fatal);
      if (err.fatal) {
        alert("failed uploading");
      }
      return;
    }
  };

  const imageUploadHandler = async (ev) => {
    if (!ev.target.files[0]) return;
    const files = ev.target.files;
    const fileArray = Array.from(files);
    console.log("fileArray", fileArray);
    setFilesToUpload(fileArray);
    setLoader(true);
    fileArray.forEach(async (file) => {
      const fileReader = new FileReader();
      const isImage = file.type.includes("image");
      const isVideo = file.type.includes("video");
      if (isVideo) {
        setCheckMediaPreview(true);
        const video = document.createElement("video");
        // const source = document.createElement('source');
        //source.src = //uploaded video
        const blob = URL.createObjectURL(file);
        video.src = blob;
        video.id = file.name;
        video.title = "Click Me To Discard This Item";
        video.addEventListener("click", () => {
          const res = window.confirm("Would you like to Delete this file?");
          if (!res) return;
          discardSingleFile(file);
        });
        video.addEventListener("loadstart", () => {
          console.log("blob:", blob);

          video.style.backgroundImage = `url("${videoBG}")`;
          previewRef.current.appendChild(video);
        });
      } else if (isImage) {
        console.log("isVideo:", isVideo);
        setCheckMediaPreview(true);
        fileReader.readAsDataURL(file);
        fileReader.addEventListener(
          "load",
          async (reader) => {
            let image = new Image();
            image.src = reader.currentTarget.result;
            image.id = file.name;
            image.title = "Click Me To Remove Me";
            // image.setAttribute('data-tip', 'Click Item To Remove It');
            // image.setAttribute('data-place', 'top');
            image.addEventListener("click", () => {
              const res = window.confirm("Would you like to Delete this file?");
              if (!res) return;
              discardSingleFile(file);
            });
            previewRef.current.appendChild(image);
          },
          false
        );
      }
      setLoader(false);
    });
  };

  return (
    <>
      <section
        className={`${styles.container} ${
          inputPositionAbsolute ? styles["out"] : ""
        }`}
      >
        {postFeeling && (
          <img
            className={styles["feeling-preview"]}
            src={getFeelingIcon(postFeeling)}
            alt=""
          />
        )}

        {/* <ReactTooltip /> */}
        <div className={styles["form-container"]}>
          <div className={styles["image-container"]}>
            <img
              src={
                loggedInUser.profilePicture
                  ? loggedInUser.profilePicture
                  : randomUser
              }
              alt=""
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              placeholder={`What's on your mind, ${titleCase(
                loggedInUser.name.first
              )}?`}
              className={styles.input}
              autoComplete="off"
              onClick={() => setInputPositionAbsolute(true)}
              {...register("post-text")}
              onInput={(ev) => setPostText(ev.target.value)}
              value={postText}
            />
            <img
              className={styles["emoji-window-toggler"]}
              src={smiley}
              alt=""
              onClick={() => setShowEmojiWindow(!showEmojiWindow)}
            />
            {showEmojiWindow && (
              <EmojiWindow
                addEmoji={addEmoji}
                setShowEmojiWindow={setShowEmojiWindow}
              />
            )}
            {!showLoader && <button disabled={!postText.length}>POST</button>}
            {showLoader && (
              <div className={styles["lds-roller"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </form>
        </div>
        <div
          className={styles.actions}
          onMouseLeave={() => setShowFeelingDropdown(false)}
        >
          <div className={styles["action-container"]}>
            <label htmlFor="add-img">
              <img src={pictureIcon} alt="" className={styles.icon} />
              Add Picture
            </label>
            <input
              className={styles["upload-media-input"]}
              type="file"
              accept="image/*"
              id="add-img"
              onChange={imageUploadHandler}
              multiple
            />
          </div>
          <div className={styles["action-container"]}>
            <label htmlFor="add-vid">
              <img src={videoIcon} alt="" className={styles.icon} />
              Add Video
            </label>
            <input
              className={styles["upload-media-input"]}
              type="file"
              accept="video/*"
              id="add-vid"
              onChange={imageUploadHandler}
              multiple
              ref={fileInputRef}
            />
          </div>
          <div
            className={styles["action-container"]}
            onClick={() => setShowFeelingDropdown(!showFeelingDropdown)}
          >
            <img src={feelingIcon} alt="" className={styles.icon} />
            Add Feeling
            {showFeelingDropdown && (
              <FeelingDropdown setPostFeeling={setPostFeeling} />
            )}
          </div>
        </div>
        {loader && (
          <div className={styles["lds-ellipsis"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {checkMediaPreview && !loader && (
          <>
            <button
              onClick={discardFiles}
              className={styles["discard-files-btn"]}
            >
              Remove All Files
            </button>
            <div className={styles.preview} ref={previewRef}></div>
          </>
        )}
      </section>
    </>
  );
});
