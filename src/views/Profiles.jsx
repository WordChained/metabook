import React, { useEffect, useState } from 'react';
import styles from './MyProfilePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getUserForProfile } from '../store/actions/userActions';
import { MyPosts } from '../cmps/profile/MyPosts';
// import { CreatePost } from '../cmps/createPost/CreatePost';
// import { MyImages } from '../cmps/profile/MyImages';
import { FriendsList } from '../cmps/profile/FriendsList';
import cameraIcon from '../assets/imgs/camera.png';
import locationIcon from '../assets/imgs/location-pin.png';
import educationIcon from '../assets/imgs/education.png';
import careerIcon from '../assets/imgs/career.png';
import randomUser from '../assets/imgs/profile-color.png';
import more from '../assets/imgs/more.png';
import { MyImages } from '../cmps/profile/MyImages';
import { getTitledName } from '../services/utilService';
import { addFriend, removeFriend } from '../store/actions/friendsActions';
import { sendNotification } from '../store/actions/notificationActions';
import { SingleMediaGallery } from '../cmps/other/SingleMediaGallery';
const Profiles = () => {
  const [singleMedia, setSingleMedia] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [isPendingFriendRequest, setIsPendingFriendRequest] = useState(false);
  const [isMoreDropDownOpen, setIsMoreDropDownOpen] = useState(false);
  const [callBackUser, setCallBackUser] = useState(null);
  const [coverPhotoImageError, setCoverPhotoImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.userModule);
  const { friends, pendingFriends } = useSelector(
    (state) => state.friendsModule
  );

  useEffect(() => {
    // if (!callBackUser || callBackUser.userId !== id) {
    onGetUser();
    // }
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    //when friends are loaded, perform checks
    console.log('re-checking');
    checkIsFriend();
    checkIsPendingFriend();
  }, [friends, pendingFriends, isFriend]);

  const onGetUser = () => {
    dispatch(getUserForProfile(id, returnUser));
  };
  const returnUser = (res) => {
    // console.log("callBackUser:", res);
    setCallBackUser(res);
  };

  const checkIsFriend = () => {
    if (!friends) return;
    const exists = friends.find((friend) => {
      return friend.userId === loggedInUser.userId;
    });
    if (exists) setIsFriend(true);
    console.log('does exist?:', !!exists);
    return !!exists;
  };

  const checkIsPendingFriend = () => {
    if (!callBackUser) return;
    const exists = pendingFriends.find((friend) => {
      console.log('friend in checkIsPendingFriend', friend);
      console.log('callBackUser in checkIsPendingFriend', callBackUser);
      return friend.userId === callBackUser.userId;
    });
    if (exists) setIsPendingFriendRequest(true);
    console.log('is pending:', !!exists);
    return !!exists;
  };
  const onSendNotification = (notification) => {
    if (!notification) return;
    dispatch(sendNotification(notification));
  };
  const friendAction = () => {
    if (isFriend) return;
    dispatch(addFriend(loggedInUser.userId, id, 'request', onSendNotification));
  };
  const onRemoveFriend = () => {
    dispatch(
      removeFriend(loggedInUser.userId, id, () => {
        setIsFriend(false);
        setIsPendingFriendRequest(false);
      })
    );
    setIsMoreDropDownOpen(false);
  };
  const onOpenMore = () => {
    setIsMoreDropDownOpen(!isMoreDropDownOpen);
  };
  if (!callBackUser)
    return (
      <div className={styles['lds-grid']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  else
    return (
      <section
        className={`${styles['profile-page']} ${id ? styles['other'] : ''} ${
          singleMedia ? styles['no-scroll'] : ''
        }`}
      >
        {singleMedia && (
          <SingleMediaGallery
            mediaItem={singleMedia}
            close={() => setSingleMedia(null)}
          />
        )}
        <div
          className={styles['upper-part-container']}
          onMouseLeave={() => setIsMoreDropDownOpen(false)}
        >
          <button className={styles.friendship}>
            <span className={styles.status} onClick={friendAction}>
              <span>
                {isFriend
                  ? 'Friends'
                  : isPendingFriendRequest
                  ? 'Pending Request'
                  : 'Add Friend'}
              </span>
            </span>
            {/* {(isFriend || isPendingFriendRequest) && <span> | </span>} */}
            {(isFriend || isPendingFriendRequest) && (
              <span className={styles['more-container']} onClick={onOpenMore}>
                <img className={styles.more} src={more} alt='' />
              </span>
            )}
            {isMoreDropDownOpen && (
              <div className={styles['more-modal']}>
                <div className={styles.angle}></div>
                <ul>
                  <li onClick={onRemoveFriend}>
                    {isPendingFriendRequest ? 'Cancel Request' : 'Unfriend'}
                  </li>
                </ul>
              </div>
            )}
          </button>
          <div className={styles['hero-container']}>
            {!coverPhotoImageError && callBackUser.coverPhoto && (
              <img
                className={styles.hero}
                src={callBackUser.coverPhoto}
                alt=''
                onClick={() => setSingleMedia(callBackUser.coverPhoto)}
                onError={() => setCoverPhotoImageError(true)}
              />
            )}
          </div>
          <div className={styles['profile-picture-conatiner']}>
            <img
              className={styles['profile-picture']}
              src={
                callBackUser.profilePicture && !profileImageError
                  ? callBackUser.profilePicture
                  : randomUser
              }
              alt=''
              onClick={() => setSingleMedia(callBackUser.profilePicture)}
              onError={() => setProfileImageError(true)}
            />
            {!id && (
              <span className={styles['edit-container']}>
                <img src={cameraIcon} alt='' />
              </span>
            )}
          </div>
          <div className={styles['name-container']}>
            <h1>{getTitledName(callBackUser.name)}</h1>
          </div>
        </div>
        <div className={styles['lower-part-container']}>
          <div className={styles.left}>
            <div className={styles.intro}>
              <h2>Intro</h2>
              <div className={styles.location}>
                <img src={locationIcon} alt='' /> Lives in{' '}
                {callBackUser.address.full}
              </div>
              {callBackUser.education && (
                <div className={styles.education}>
                  <img src={educationIcon} alt='' /> studied in{' '}
                  {callBackUser.education}
                </div>
              )}
              {callBackUser.career && (
                <div className={styles.career}>
                  <img src={careerIcon} alt='' /> works in {callBackUser.career}
                </div>
              )}
              {/* <button>Edit address</button> */}
            </div>
            <div className={styles['images-container']}>
              <h2>Images</h2>
              <MyImages userId={callBackUser.userId} user={callBackUser} />
              {/* insert logic for all my images. */}
            </div>
            <div className={styles['friends-container']}>
              <h2>Friends</h2>
              <FriendsList
                userId={callBackUser.userId}
                loggedInUser={loggedInUser}
              />
            </div>
          </div>
          <div className={styles.right}>
            <MyPosts userId={callBackUser.userId} />
          </div>
        </div>
      </section>
    );
};

export default Profiles;
