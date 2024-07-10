// // import React from "react";
// // import Navbar from "../navbar";

// // function MyProfile (){

// //     fetch ('/users/<int:id>',{
// //         method: 'PATCH',
// //         headers: {
// //             'Content-Type': 'application/json',
// //             'Accept': 'application/json'
// //             },
// //             body: JSON.stringify({
// //                 'username': 'username',
// //                 'email': 'email',
// //                 'password': 'password'
// //             })
// //     })
// //     return(
// //         <div>
// //             <Navbar/>
// //             <h1>My Profile</h1>
// //         </div>
// //     )
// // }

// // export default MyProfile;

// import React, { useState } from "react";
// import Navbar from "../navbar";

// function MyProfile({id}) {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleChangeUsername = (e) => {
//     setUsername(e.target.value);
//   };

//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     // e.preventDefault();
//     try {
//       const response = await fetch(`/users/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: username,
//           email: email,
//           password: password,
//         }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update user information");
//       }
//       console.log("User information updated successfully");
//       // Optionally handle success or update local state
//     } catch (error) {
//       console.error("Error updating user information:", error);
//       // Handle error scenarios
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <h1>My Profile</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={handleChangeUsername}
//           />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input type="email" value={email} onChange={handleChangeEmail} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={handleChangePassword}
//           />
//         </label>
//         <br />
//         <button onClick={handleSubmit} type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// }

// export default MyProfile;

import React, { useState } from "react";
import Navbar from "../navbar";
import "../Style/myprofile.css"

function MyProfile({ id }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(`/users/${id}`, {
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
      setIsLoading(false);

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      setSuccessMessage("User information updated successfully");
      // Optionally update local state or perform any other action on success
    } catch (error) {
      setIsLoading(false);
      setError("Failed to update user information");
      console.error("Error updating user information:", error);
      // Handle error scenarios
    }
  };

  return (
    <div className="my-profile-container">
      <Navbar />
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Username:
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={handleChangeUsername}
            required
          />
        </label>
        <br />
        <label className="form-label">
          Email:
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={handleChangeEmail}
            required
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={handleChangePassword}
            required
          />
        </label>
        <br />
        <button className="form-button" type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
}

export default MyProfile;

