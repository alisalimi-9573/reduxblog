import React from "react";
import { useSelector } from "react-redux";
import { selectAll } from "../posts/postsSlice";
import { useParams } from "react-router-dom";
import { PostExcerpt } from "../posts/PostsList";

export default function UserPage() {
  const { userId } = useParams();
  const posts = useSelector(selectAll);

  const userPosts = posts.filter((post) => post.user === userId);
  const showUserPosts = userPosts.map((posts) => (
    <PostExcerpt postId={posts.id} key={posts.id} />
  ));

  return (
    <>
      <section class="posts-list">
        <h2>Posts</h2>
        {showUserPosts}
      </section>
    </>
  );
}
