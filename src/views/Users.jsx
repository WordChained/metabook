import React, { useEffect } from "react";
import styles from "./Users.module.css";

import { UsersList } from "../cmps/UsersList";
import { UsersSearchForm } from "../cmps/UsersSearchForm";
import { useSelector } from "react-redux";
export const Users = React.memo(() => {
  const { previousSearch, users } = useSelector((state) => state.userModule);
  useEffect(() => {
    console.log("users is re rendered", previousSearch);
  }, []);
  return (
    <section className={styles.container}>
      <UsersSearchForm />
      {previousSearch && (
        <div className={styles.previous}>
          Search Results for <span>"{previousSearch}"</span>:
        </div>
      )}
      <UsersList />
    </section>
  );
});
