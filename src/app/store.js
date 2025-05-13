import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../feature/posts/postsSlice";
import usersSlice, { fetchUsers } from "../feature/users/usersSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    posts: postsSlice,
    users: usersSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

store.dispatch(fetchUsers());

export default store;
