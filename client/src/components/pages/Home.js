import React from "react";
import Navbar from "../navbar";
import "../Style/home.css"
import About from "../About";

function Home (){
    return(
        <div className="matrix-container">
            <h1 className="matrix-text">Welcome To Dev Book</h1>
            <Navbar/>
            <About/>
        </div>
    )
}

export default Home;