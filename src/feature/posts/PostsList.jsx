import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostReactins from "./PostReactins";
import { fetchPosts, selectById, selectIds } from "./postsSlice";
import { Link } from "react-router-dom";

export function PostExcerpt({ postId }) {
  const post = useSelector((state) => selectById(state, postId));

  return (
    <>
      <article className="post-excerpt">
        <h3>{post.title}</h3>
        <p className="post-content">{post.content}</p>
        <PostReactins postId={post.id} reactions={post.reactions} />
        <Link
          className="button muted-button"
          to={`/posts/${post.id}`}
          dideo-checked="true"
        >
          View Post
        </Link>
      </article>
    </>
  );
}

export default function PostsList() {
  const dispatch = useDispatch();
  const postIds = useSelector(selectIds);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  let content;
  if (status === "loading") {
    content = <div>loading ...</div>;
  } else if (status === "success") {
    content = postIds.map((id) => <PostExcerpt postId={id} key={id} />);
  } else if (status === "error") {
    content = <div>error</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
}
