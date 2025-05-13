import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("http://localhost:5000/posts");
  console.log("get posts", response);
  return response;
});

export const addNewPost = createAsyncThunk(
  "posts/addPost",
  async (newPostData) => {
    const response = await client.post(
      "http://localhost:5000/posts",
      newPostData
    );
    return response;
  }
);

export const increaseReaction = createAsyncThunk(
  "posts/increaseReaction",
  async ({ reaction, postId }) => {
    const response = await client.post(
      `http://localhost:5000/posts/${postId}/reaction/${reaction}`,
      {}
    );
    return { reaction, postId };
  }
);

const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: "null",
});

export const { selectById, selectIds, selectAll } = postsAdapter.getSelectors(
  (state) => state.posts
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(increaseReaction.fulfilled, (state, action) => {
        const { reaction, postId } = action.payload;
        state.entities[postId].reactions[reaction] += 1;
      });
  },
});

export default postsSlice.reducer;
