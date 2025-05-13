import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectById, fetchPosts } from "./postsSlice";
import PostReactions from "./PostReactins";

export default function UserPostPage() {
  const { postId } = useParams();
  const selectedPost = useSelector((state) => selectById(state, postId));
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [dispatch, status]);

  return (
    <section>
      <article class="post">
        <h2>{selectedPost.title}</h2>
        <div>
          <span></span>
          <span title="2021-02-06T21:44:01.564Z">
            &nbsp; <i></i>
          </span>
        </div>
        <p class="post-content">{selectedPost.content}</p>
        <PostReactions
          postId={selectedPost.id}
          reactions={selectedPost.reactions}
        />
      </article>
    </section>
  );
}
