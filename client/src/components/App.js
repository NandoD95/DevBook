import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Redirect from "./Redirect";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(0)

  useEffect(() => {
    fetch('/session')
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
