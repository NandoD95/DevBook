import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Redirect from "./Redirect";
import SignUp from "./pages/SignUp"
import User from "./pages/User"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(0)

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
          setUserId(data['id']);
        }
      })
      .catch(error => {
        console.error('Session check failed:', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect isLoggedIn={isLoggedIn} userId={userId} />} />
        <Route path='/Login' element={<Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>}></Route>
        <Route path='/signup' element={<SignUp setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />} />
        <Route path='/users/:id' element={<User setIsLoggedIn={setIsLoggedIn} userId={userId} setUserId={setUserId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
