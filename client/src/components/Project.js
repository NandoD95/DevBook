import React, { useState, useEffect } from "react";
import ProjectForm from "./ProjectForm"; // Adjust the path as per your file structure

function Project({ userId }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`/users/${userId}/projects`) // Assuming there's an endpoint to fetch projects by userId
      .then((response) => response.json())
      .then((projectsData) => setProjects(projectsData))
      .catch((error) => console.error("Error fetching projects:", error));
  }, [userId]);

  const addNewProject = (newProject) => {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
  };

  return (
    <div>
      <h2>Projects</h2>
      <ProjectForm setNewProject={addNewProject} userId={userId} />
      {projects.map((project) => (
        <div key={project.id} className="project">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>{project.link}</p>
        </div>
      ))}
    </div>
  );
}

export default Project;
