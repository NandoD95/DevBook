import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Post";
import Search from "../Search";
import PostForm from "../PostForm";
import Navbar from "../navbar";
import ProjectForm from "../ProjectForm";
import Project from "../Project";
import "../Style/user.css"

function User({ setIsLoggedIn, user, setUserId }) {
  // state to store other users
  const [otherUser, setOtherUser] = useState([]);
  // state to store posts and new post
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(null);
  // state to store projects and new project
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState(null);
  // navigation function 
  const navigate = useNavigate();

  // fetch post and projects on mount
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
    //     const filteredUsers = users.filter((user) => user.id !== user);
    //     const currentUser = users.find((user) => user.id === user);
    //     setUserId(currentUser);
    //     setOtherUser(filteredUsers);
    //   });
  }, [user?.id]);

  // handles logout functionality 
  function handleLogOut() {
    setIsLoggedIn(false);
    setUserId(0);
    fetch("/login", {
      method: "DELETE",
    });
    navigate("/login");
  }

  // filters and map posts to display
  const postCard = posts
    .filter((post) => post.user_id === user.id)
    .map((post) => (
      <Post key={post.id} post={post} userId={user.id} username={user.username} />
    ));

  // filters and map projects to display
  const projectCard = projects
    .filter((project) => project.user_id === user.id)
    .map((project) => (
        <Project key={project.id} project={project} userId={user.id} username={user.username} />
    ));

    return (
        <div className="user-portal">
          <div className="header">
            <h1 className="matrix-text">DevBook</h1>
            <Navbar />
            {/* <Search otherUsers={otherUser} /> */}
            <button className="logout-btn" onClick={handleLogOut}>
              Logout
            </button>
          </div>
    
          <div className="content">
            <div className="posts-section">
              <h2 className="section-title">Posts ({posts.length})</h2>
              <PostForm setNewPost={setNewPost} userId={user.id} />
              {postCard}
              {newPost && <Post post={newPost} username={user.username} />}
            </div>
    
            <div className="projects-section">
              <h2 className="section-title">Projects ({projects.length})</h2>
              <ProjectForm userId={user.id} setNewProject={setNewProject} />
              {projectCard}
              {newProject && <Project project={newProject} username={user.username} />}
            </div>
          </div>
        </div>
      );
}

export default User;