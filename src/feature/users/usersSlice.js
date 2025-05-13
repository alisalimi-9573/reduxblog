import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("http://localhost:5000/users");
  console.log("get users", response);
  return response;
});

const userApdater = createEntityAdapter();
const initialState = userApdater.getInitialState({
  status: "idle",
  error: "null",
});

export const { selectIds, selectAll } = userApdater.getSelectors(
  (state) => state.users
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "success";
        userApdater.upsertMany(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
