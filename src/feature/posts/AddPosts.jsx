import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAll } from "../users/usersSlice";

export default function AddPosts() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState();
  console.log("author", author);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("idle");

  const titleOnChange = (e) => setTitle(e.target.value);
  const authorOnChange = (e) => setAuthor(e.target.value);
  const contentOnChange = (e) => setContent(e.target.value);

  const dispatch = useDispatch();
  const users = useSelector(selectAll);

  const usersOption = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.lastName}
    </option>
  ));

  const canSave = () => {
    return [title, content, author].every(Boolean) && status === "idle";
  };

  const onSave = async () => {
    if (canSave()) {
      try {
        setStatus("pending");
        await dispatch(
          addNewPost({
            title,
            content,
            user: author,
            reactions: {
              eyes: 0,
              heart: 0,
              hooray: 0,
              rocket: 0,
              thumbsUp: 0,
            },
          })
        );
        setTitle("");
        setAuthor("");
        setContent("");
      } catch (error) {
        console.error("Failed to save the post: ", error);
      } finally {
        setStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label for="postTitle">Post Title:</label>
        <input
          value={title}
          onChange={titleOnChange}
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
        />
        <label for="postAuthor">Author:</label>
        <select id="postAuthor" value={author} onChange={authorOnChange}>
          {usersOption}
        </select>
        <label for="postContent">Content:</label>
        <textarea
          value={content}
          onChange={contentOnChange}
          id="postContent"
          name="postContent"
        ></textarea>
        <button onClick={onSave} disabled={!canSave()} type="button">
          Save Post
        </button>
      </form>
    </section>
  );
}
