import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import Project from "../Project";
import "../Style/home.css";
import About from "../About";

function Home({userId}) {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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
