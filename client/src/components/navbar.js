import React from "react";
import { Link } from "react-router-dom";
import "./Style/navbar.css"

function Navbar (){
    // navbar with links to the destination
    return(
        <div className="navbar-container">
                <Link to="/Home" className="nav-link">
                Home
                </Link>
                <Link to='/user/:id' className="nav-link">
                User
                </Link>
                <Link to="/favorites" className="nav-link">
                Favorites
                </Link>
                <Link to="/myprofile" className="nav-link">
                My Profile
                </Link>
        </div>
    );
}

export default Navbar;