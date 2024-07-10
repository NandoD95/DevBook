import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import Project from "../Project";
import "../Style/home.css";
import About from "../About";

// home component that displays a list of projects and allows users to favorite them
function Home({userId}) {
  // state variable to store the list of projects
  const [projects, setProjects] = useState([]);
  // navigation function to redirect to a new route
  const navigate = useNavigate();

  // effect hook to fetch projects from the server when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projectsData = await response.json();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      }
    };

    fetchProjects();
  }, []);

  // handles favorite click event
  const handleFavoriteClick = async (project) => {
    console.log(userId)
    try {
      const response = await fetch(`/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            project_id: project.id,
            user_id: userId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add project to favorites");
      }
      // after you favorite a project, navigates to the favorites page
      navigate("/favorites");
    } catch (error) {
      console.error("Error adding project to favorites:", error.message);
    }
  };

  return (
    <div className="matrix-container">
      <h1 className="matrix-text">Welcome To Dev Book</h1>
      <Navbar />
      <About />
      <div className="projects-container">
        <h2>All Projects</h2>
        {projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
