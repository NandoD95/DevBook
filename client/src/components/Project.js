import React, { useState, useEffect } from "react";

function Project({ userId, project, username }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`/projects/${project.id}`) 
        .then((res) => res.json())
        .then((data) => setProjects(data));
  }, [project.id]);

//   const addNewProject = (newProject) => {
//     setProjects((prevProjects) => [newProject, ...prevProjects]);
//   };

  return (
    <div>
      <h2>{username}:Projects</h2>
      <p>{project.name}</p>
      <p>{project.description}</p>
      <p>{project.link}</p>
    </div>
  );
}

export default Project;
