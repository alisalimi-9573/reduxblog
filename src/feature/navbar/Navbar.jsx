import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <section>
          <div className="navContent">
            <div className="navLinks">
              <Link to={"/posts"}>Posts</Link>
              <Link to={"users"}>Users</Link>
              <Link to={"/"}>Back To Home</Link>
            </div>
          </div>
        </section>
      </nav>
    </>
  );
}
