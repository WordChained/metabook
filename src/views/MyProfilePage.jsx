import React, { useState, useEffect } from 'react';
import styles from './MyProfilePage.module.css';
import { useSelector } from 'react-redux';

import { CreatePost } from '../cmps/createPost/CreatePost';
import { MyPosts } from '../cmps/profile/MyPosts';
import { MyImages } from '../cmps/profile/MyImages';
import { FriendsList } from '../cmps/profile/FriendsList';

import cameraIcon from '../assets/imgs/camera.png';
import locationIcon from '../assets/imgs/location-pin.png';
import randomUser from '../assets/imgs/user-512.png';
import { getTitledName } from '../services/utilService';
import { SingleMediaGallery } from '../cmps/other/SingleMediaGallery';
import { ProfilePictureEditPreview } from '../cmps/profile/ProfilePictureEditPreview';
import { useRef } from 'react';
import { CoverPhotoEditPreview } from '../cmps/profile/CoverPhotoEditPreview';
import { UpdateUserDetailsModal } from '../cmps/profile/UpdateUserDetailsModal';

export const MyProfilePage = () => {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const [singleMedia, setSingleMedia] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [showUserDetailsUpdateModal, setShowUserDetailsUpdateModal] =
    useState(false);
  const [coverPhotoImageError, setCoverPhotoImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const profilePictureRef = useRef();
  const coverPhotoRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cancelProfilePictureEdit = () => {
    setNewProfilePicture(null);
    setFileToUpload(null);
    profilePictureRef.current.value = '';
  };
  const cancelCoverPhotoEdit = () => {
    setNewCoverPhoto(null);
    setFileToUpload(null);
    coverPhotoRef.current.value = '';
  };

  const onEditUserMedia = async (ev, typeOfMedia) => {
    console.log(ev);
    if (!ev.target.files[0]) return;
    const file = ev.target.files[0];
    setFileToUpload(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener(
      'load',
      async (reader) => {
        // console.log(reader.currentTarget.result);
        typeOfMedia === 'coverPhoto'
          ? setNewCoverPhoto(reader.currentTarget.result)
          : setNewProfilePicture(reader.currentTarget.result);
      },
      false
    );
  };

  return (
    <section
      className={`${styles['profile-page']} ${
        singleMedia || showUserDetailsUpdateModal ? styles['no-scroll'] : ''
      }`}
    >
      {showUserDetailsUpdateModal && (
        <UpdateUserDetailsModal
          show={setShowUserDetailsUpdateModal}
          address={loggedInUser.address.full}
          education={loggedInUser.edication}
          career={loggedInUser.career}
          userId={loggedInUser.userId}
        />
      )}
      {singleMedia && (
        <SingleMediaGallery
          mediaItem={singleMedia}
          close={() => setSingleMedia(null)}
        />
      )}
      <div className={styles['upper-part-container']}>
        <div className={styles['hero-container']}>
          {!coverPhotoImageError && loggedInUser.coverPhoto && (
            <img
              className={styles.hero}
              src={loggedInUser.coverPhoto}
              alt=''
              onClick={() => setSingleMedia(loggedInUser.coverPhoto)}
              onError={() => {
                setCoverPhotoImageError(true);
              }}
            />
          )}
          {newCoverPhoto && (
            <CoverPhotoEditPreview
              cancelCoverPhotoEdit={cancelCoverPhotoEdit}
              newCP={newCoverPhoto}
              fileToUpload={fileToUpload}
              userId={loggedInUser.userId}
            />
          )}
          <label
            className={`${styles['file-label']} ${
              newCoverPhoto ? styles.hide : ''
            }`}
          >
            <img src={cameraIcon} alt='' />
            <span>
              {loggedInUser.coverPhoto
                ? 'Edit cover photo'
                : 'Add a cover photo'}
            </span>
            <input
              type='file'
              onChange={(ev) => onEditUserMedia(ev, 'coverPhoto')}
              ref={coverPhotoRef}
              onClick={cancelCoverPhotoEdit}
            />
          </label>
        </div>
        <div className={styles['profile-picture-conatiner']}>
          <img
            className={styles['profile-picture']}
            src={
              loggedInUser.profilePicture && !profileImageError
                ? loggedInUser.profilePicture
                : randomUser
            }
            alt=''
            onClick={() => setSingleMedia(loggedInUser.profilePicture)}
            onError={() => {
              setProfileImageError(true);
            }}
          />
          <span className={styles['edit-container']}>
            <label className={styles['file-label']}>
              <img src={cameraIcon} alt='' />
              <span>
                <input
                  type='file'
                  ref={profilePictureRef}
                  onChange={(ev) => onEditUserMedia(ev, 'profilePicture')}
                  onClick={cancelCoverPhotoEdit}
                />
              </span>
            </label>
          </span>
        </div>
        {newProfilePicture && (
          <ProfilePictureEditPreview
            cancelProfilePictureEdit={cancelProfilePictureEdit}
            newPP={newProfilePicture}
            fileToUpload={fileToUpload}
            userId={loggedInUser.userId}
          />
        )}
        <div className={styles['name-container']}>
          <h1>{getTitledName(loggedInUser.name)}</h1>
        </div>
      </div>
      <div className={styles['lower-part-container']}>
        <div className={styles.left}>
          <div className={styles.intro}>
            <h2>Intro</h2>
            <div className={styles.location}>
              <img src={locationIcon} alt='' /> Lives in{' '}
              {loggedInUser.address.full}
            </div>
            <button onClick={() => setShowUserDetailsUpdateModal(true)}>
              Edit details
            </button>
          </div>
          <div className={styles['images-container']}>
            <h2>Images</h2>
            <MyImages userId={loggedInUser.userId} user={loggedInUser} />
            {/* insert logic for all my images. */}
          </div>
          <div className={styles['friends-container']}>
            <h2>Friends</h2>
            <FriendsList
              userId={loggedInUser.userId}
              loggedInUser={loggedInUser}
            />
          </div>
        </div>
        <div className={styles.right}>
          <CreatePost />
          <MyPosts userId={loggedInUser.userId} />
        </div>
      </div>
    </section>
  );
};
