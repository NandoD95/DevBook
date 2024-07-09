// import React, { useState, useEffect } from "react";
// import "./Style/project.css"

// function Project({ userId, project, username }) {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     fetch(`/projects/${project.id}`) 
//         .then((res) => res.json())
//         .then((data) => setProjects(data));
//   }, [project.id]);

//   return (
//     <div className="project-card">
//       <h2 className="project-title">{project.name}</h2>
//       <p className="project-description">{project.description}</p>
//       <p className="project-link">
//         <a href={project.link} target="_blank" rel="noopener noreferrer">
//           {project.link}
//         </a>
//       </p>
//       <p className="project-author">Created by: {username}</p>
//     </div>
//   );

// //   const addNewProject = (newProject) => {
// //     setProjects((prevProjects) => [newProject, ...prevProjects]);
// //   };

// //   return (
// //     <div className="project-card">
// //       <h2 className="project-title">{username}: Project</h2>
// //       <p className="">{project.name}</p>
// //       <p>{project.description}</p>
// //       <p>{project.link}</p>
// //     </div>
// //   );
// }

// export default Project;

import React from "react";
import "./Style/project.css"; // 

const Project = ({ project, onFavoriteClick, username }) => {
  const handleFavoriteClick = () => {
    onFavoriteClick(project); // Pass project data to the parent handler
  };

  return (
    <div className="project-card">
      <h2 className="project-title">{project.name}</h2>
      <p className="project-description">{project.description}</p>
      <p className="project-link">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          {project.link}
        </a>
      </p>
      <p className="project-author">Created by: {username}</p>
      <button onClick={handleFavoriteClick}>Favorite</button>
    </div>
  );
};

export default Project;

