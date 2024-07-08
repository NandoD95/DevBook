import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Post";
import Search from "../Search";
import PostForm from "../PostForm";
import Navbar from "../navbar";
import ProjectFrom from "../ProjectForm";
import Project from "../Project";

function User({ setIsLoggedIn, userId, setUserId }) {
  const [userData, setUserData] = useState("");
  const [otherUser, setOtherUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/post")
      .then((r) => r.json())
      .then((info) => {
        setPosts(info);
      });

    fetch("/users")
      .then((r) => r.json())
      .then((users) => {
        const filteredUsers = users.filter((user) => user.id !== userId);
        const currentUser = users.find((user) => user.id === userId);
        setUserData(currentUser);
        setOtherUser(filteredUsers);
      });
  }, [userId]);

  function handleLogOut() {
    setIsLoggedIn(false);
    setUserId(0);
    fetch("/login", {
      method: "DELETE",
    });
    navigate("/login");
  }

  const postCard = posts
    .filter((post) => post.user_id === userId)
    .map((post) => (
      <Post key={post.id} post={post} userId={userId} username={userData.username} />,
      console.log(userData.username)
    ));

  return (
    <>
      <div className="">
        <Navbar />
        <h1 className="">DevBook</h1>
        <Search otherUser={otherUser} />
        <button className="" onClick={() => handleLogOut()}>
          Logout
        </button>
      </div>
      <PostForm setNewPost={setNewPost} userId={userId} />
      <div className="">
        <div className="">
          <h2 className="">{userData.username}</h2>
          <h3 className="">Posts: {postCard.length}</h3>
        </div>
      </div>
      <ProjectFrom userId={userId} />
      {/* <Project /> */}
      {postCard}
      {newPost && <Post post={newPost} username={userData.username} />} {/* Display new post */}
    </>
  );
}

export default User;