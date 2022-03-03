import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryFriends } from "../../store/actions/friendsActions";
import styles from "./FriendsList.module.css";

import randomUser from "../../assets/imgs/profile-color.png";
import { getTitledName, titleCase } from "../../services/utilService";
import { useNavigate } from "react-router";
export const FriendsList = ({ userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friendsModule);
  const onGetFriends = () => {
    dispatch(queryFriends(userId));
  };
  useEffect(() => {
    onGetFriends();
  }, []);

  const linkToFriend = (userId) => {
    navigate(`/profiles/${userId}`);
  };

  if (!friends || !friends.length)
    return <div>No Friends to Show Yet. Make Some!</div>;
  return (
    <div className={styles.container}>
      {console.log("friends:", friends)}
      {friends.map((f) => (
        <div
          className={styles.friend}
          key={f.userId}
          onClick={() => linkToFriend(f.userId)}
        >
          <img src={f.profilePicture ? f.profilePicture : randomUser} alt="" />
          <span>{getTitledName(f.name)}</span>
        </div>
      ))}
    </div>
  );
};
