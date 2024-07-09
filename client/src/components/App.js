import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Redirect from "./Redirect";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MyProfile from "./pages/MyProfile"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch('/check_session')
      .then(response => {
        if (response.ok) {
          setIsLoggedIn(true);
          return response.json();
        } else {
          setIsLoggedIn(false);
        }
      })
      .then(data => {
        if (data !== undefined) {
          setUser(data);
        }
      })
      .catch(error => {
        console.error('Session check failed:', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect isLoggedIn={isLoggedIn} userId={user?.id} />} />
        <Route path='/Login' element={<Login setIsLoggedIn={setIsLoggedIn} setUserId={setUser}/>}></Route>
        <Route path='/signup' element={<SignUp setIsLoggedIn={setIsLoggedIn} setUserId={setUser} />} />
        <Route path='/user/:id' element={<User setIsLoggedIn={setIsLoggedIn} user={user} setUserId={setUser} />} />
        <Route path='/home' element= {<Home userId={user?.id}/> } />
        <Route path='/favorites' element= {<Favorites user={user}/> } />
        <Route path='/myprofile' element= {<MyProfile /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
