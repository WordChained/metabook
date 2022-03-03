import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { getUsers } from "../../store/actions/userActions";

export const UsersSearchForm = React.memo(() => {
  const dispatch = useDispatch();
  let debounce;
  const { handleSubmit } = useForm();
  const onSubmit = (ev) => {
    const filterTerm = ev.target.value;
    if (debounce) clearTimeout(debounce);
    if (!filterTerm.length) return;
    debounce = setTimeout(() => {
      dispatch(getUsers(filterTerm));
    }, 700);
  };
  return (
    <form onSubmit={(ev) => ev.preventDefault()}>
      <input
        id="filter"
        onChange={(ev) => handleSubmit(onSubmit(ev))}
        type="text"
        placeholder="Search for new friends..."
        autoComplete="off"
      />
    </form>
  );
});
