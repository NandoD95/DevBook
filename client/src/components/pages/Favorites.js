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

// import React, { useState, useEffect } from "react";
// import Navbar from "../navbar";
// import Project from "../Project";
// import "../Style/favorites.css";

// function Favorites({ userId, username }) {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await fetch(`/favorites?userId=${userId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch favorites");
//         }
//         const favoritesData = await response.json();
//         setFavorites(favoritesData);
//       } catch (error) {
//         console.error("Error fetching favorites:", error.message);
//       }
//     };

//     fetchFavorites();
//   }, [userId]);

//   return (
//     <div className="favorites-page">
//       <Navbar />
//       <div className="favorites-content">
//         <h1 className="matrix-text">My Favorites</h1>
//         <div className="favorites-container">
//           {favorites.map((favorite) => (
//             <Project key={favorite.id} project={favorite.projects} username={username} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Favorites;
