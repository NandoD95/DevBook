import React from "react";
import "./Style/project.css"; // 

const Project = ({ project, onFavoriteClick, username }) => {
  const handleFavoriteClick = () => {
    onFavoriteClick(project);
    console.log(project)
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
      <button className="favorite-btn" onClick={handleFavoriteClick}>Favorite</button>
    </div>
  );
};

export default Project;

