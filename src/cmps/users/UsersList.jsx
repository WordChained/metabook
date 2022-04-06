import React from 'react';
import styles from './UsersList.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// import searchIcon from "../assets/imgs/search.png";
import profilePicture from '../../assets/imgs/profile-color.png';
import { getTitledName } from '../../services/utilService';

export const UsersList = () => {
  const { filteredUsers, loggedInUser } = useSelector(
    (state) => state.userModule
  );

  const navigate = useNavigate();

  // const getCorrectName = (name) => {
  //   if (name.middle.length) return `${name.first} ${name.middle} ${name.last}`;
  //   else return `${name.first} ${name.last}`;
  // };
  const navigateToUser = (id) => {
    if (id === loggedInUser.userId) navigate('/my-profile');
    else navigate(`/profiles/${id}`);
  };
  if (!filteredUsers.length) {
    return <h2 className={styles.placeholder}>No users Found</h2>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {filteredUsers.map((user) => (
          <li key={user.userId}>
            <img
              src={user.profilePicture ? user.profilePicture : profilePicture}
              alt=''
            />
            <div className={styles.info}>
              <span
                className={styles.name}
                onClick={() => navigateToUser(user.userId)}
              >
                {getTitledName(user.name)}
              </span>
              {user.careerInfo.name && <span>{user.careerInfo.name}</span>}
              {user.educationInfo.name && (
                <span> {user.educationInfo.name}</span>
              )}
              {user.address && !user.educationInfo.name && (
                <span>{user.address.full}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
