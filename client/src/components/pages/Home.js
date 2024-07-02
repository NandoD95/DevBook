import React from "react";
import Navbar from "../navbar";
import "../Style/home.css"

function Home (){
    return(
        <div className="matrix-container">
            <Navbar/>
            <h1 className="matrix-text">Welcome To Dev Book</h1>
        </div>
    )
}

export default Home;