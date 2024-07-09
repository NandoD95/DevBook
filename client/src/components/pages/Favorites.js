// import React, { useEffect, useState } from "react";
// import Navbar from "../navbar";

// function Favorites() {
//   const [favorite, setFavorite] = useState(null);

//   useEffect(() => {
//     const fetchFavorite = async () => {
//       try {
//         const response = await fetch(`/favorites`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch favorite');
//         }

//         const data = await response.json();
//         setFavorite(data); 

//       } catch (error) {
//         console.error('Error fetching favorite:', error.message);
//       }
//     };

//     fetchFavorite();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <h1>Favorite</h1>
//       {favorite && (
//         <div>
//           <p>Favorite ID: {favorite.id}</p>
//           <p>Post ID: {favorite.post_id}</p>
//           <p>User ID: {favorite.user_id}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Favorites;

import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import Project from "../Project";
import "../Style/favorites.css"

function Favorites({user}) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/favorites");
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const favoritesData = await response.json();
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error fetching favorites:", error.message);
      }
    };

    fetchFavorites();
  }, []);
  
  return (
    <div className="favorites-page">
      <Navbar />
      <div className="favorites-content">
        <h1 className="matrix-text">My Favorites</h1>
        <div className="favorites-container">
            {favorites.map((favorite) => (
            <Project key={favorite.id} project={favorite.projects} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
