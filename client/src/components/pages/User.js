import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Post";
import Search from "../Search";
import PostForm from "../PostForm";
import Navbar from "../navbar";
import ProjectFrom from "../ProjectForm";
import Project from "../Project";

function User({ setIsLoggedIn, user, setUserId }) {
  const [otherUser, setOtherUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(null);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/post")
      .then((r) => r.json())
      .then((info) => {
        setPosts(info);
      });

    fetch ("/projects")
      .then((r) => r.json())
      .then((info) => {
        setProjects(info);
      })

    // fetch("/users")
    //   .then((r) => r.json())
    //   .then((users) => {
    //     const filteredUsers = users.filter((user) => user.id !== userId);
    //     const currentUser = users.find((user) => user.id === userId);
    //     setUserData(currentUser);
    //     setOtherUser(filteredUsers);
    //   });
  }, [user?.id]);

  function handleLogOut() {
    setIsLoggedIn(false);
    setUserId(0);
    fetch("/login", {
      method: "DELETE",
    });
    navigate("/login");
  }

  const postCard = posts
    .filter((post) => post.user_id === user.id)
    .map((post) => (
      <Post key={post.id} post={post} userId={user.id} username={user.username} />
    ));

  const projectCard = projects
    .filter((project) => project.user_id === user.id)
    .map((project) => (
        <Project key={project.id} project={project} userId={user.id} username={user.username} />
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
      <PostForm setNewPost={setNewPost} userId={user.id} />
      <div className="">
        <div className="">
          <h2 className="">{user.username}</h2>
          <h3 className="">Posts: {postCard.length}</h3>
        </div>
      </div>
      {postCard}
      {newPost && <Post post={newPost} username={user.username} />} {/* Display new post */}
      <ProjectFrom userId={user.id} setNewProject={setNewProject} />
      <div className="">
        <div className="">
            <h2 className="">{user.username}</h2>
            <h3 className="">Projects: {projectCard.length}</h3>
        </div>
      </div>
      {projectCard}
      {newProject && <Project project={newProject} username={user.username}/>} 
    </>
  );
}

export default User;