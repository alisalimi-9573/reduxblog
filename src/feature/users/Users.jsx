import React from "react";
import { useSelector } from "react-redux";
import { selectAll } from "./usersSlice";
import { Link } from "react-router-dom";

export default function Users() {
  const users = useSelector(selectAll);
  const usersList = users.map((user) => (
    <li>
      <Link to={`/users/${user.id}`} key={user.id} dideo-checked="true">
        {`${user.firstName} ${user.lastName}`}
      </Link>
    </li>
  ));
  return (
    <>
      <section>
        <h2>Users</h2>
        <ul>{usersList}</ul>
      </section>
    </>
  );
}
