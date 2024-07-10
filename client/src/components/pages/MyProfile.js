// import React from "react";
// import Navbar from "../navbar";

// function MyProfile (){

//     fetch ('/users/<int:id>',{
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//             },
//             body: JSON.stringify({
//                 'username': 'username',
//                 'email': 'email',
//                 'password': 'password'
//             })
//     })
//     return(
//         <div>
//             <Navbar/>
//             <h1>My Profile</h1>
//         </div>
//     )
// }

// export default MyProfile;

import React, { useState } from "react";
import Navbar from "../navbar";

function MyProfile({id}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/users/<int:id>`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user information");
      }
      console.log("User information updated successfully");
      // Optionally handle success or update local state
    } catch (error) {
      console.error("Error updating user information:", error);
      // Handle error scenarios
    }
  };

  return (
    <div>
      <Navbar />
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleChangeUsername}
          />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleChangeEmail} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>
        <br />
        <button onClick={handleSubmit} type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default MyProfile;
