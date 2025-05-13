import "./App.css";
import Navbar from "./feature/navbar/Navbar";
import AddPosts from "./feature/posts/AddPosts";
import PostsList from "./feature/posts/PostsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./feature/users/Users";
import UserPostPage from "./feature/posts/UserPostPage";
import UserPage from "./feature/users/UserPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AddPosts />
                  <PostsList />
                  <Users />
                </>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userId" element={<UserPage />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="posts/:postId" element={<UserPostPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
