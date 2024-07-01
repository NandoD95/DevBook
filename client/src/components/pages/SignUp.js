import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { Formik } from 'formik';
import { Link } from "react-router-dom";

function SignUp({ setIsLoggedIn, setUserId }) {

    const navigate = useNavigate()
    const [error, setError] = useState("")

    const [fullName, setFullName] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [incorrectPassword, setIncorrectPassword] = useState(true)

    function createdNewUser(e) {
        e.preventDefault()
        if (userPassword === checkPassword && userPassword.length >= 8) {
            setIncorrectPassword(true)
            fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        fullName: fullName,
                        username: userName,
                        email: userEmail,
                        password: userPassword
                    }
                )
            })
                .then(r => {
                    if (r.ok) {
                        return r.json()
                    }
                    else {
                        alert("Not Valid Login")
                        return undefined
                    }
                })
                .then(data => {
                    const userId = data.id
                    setUserId(userId)
                    setFullName("")
                    setUserName("")
                    setUserEmail("")
                    setUserPassword("")
                    setCheckPassword("")
                    navigate(`/user/${userId}`)
                    setIsLoggedIn(true)
                })
                .catch(error => {
                    alert("Something went wrong. Please try again.")
                    console.error('Login failed:', error)
                })
        }
        else {
            setIncorrectPassword(false)
        }
    }

    let createUserSchema = yup.object().shape({
        name: yup.string().max(40, 'First name too Long!').required(),
        username: yup.string().max(20, 'Username too Long!').required(),
        password: yup.string().max(20, 'Password too Long!').required(),
        password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
        // image_url: yup.string(),
        email: yup.string().email().required(),
    })

    // return (
    //     <>
    //         <div className="flex select-none mb-16 border-b-2">
    //             <h1 className="">DevBook</h1>
    //         </div>
    //         <div className="">
    //             <h2 className="">Please type in information to create account:</h2>
    //             <form className="" onSubmit={(e) => createdNewUser(e)}>
    //                 <div className="">
    //                     <h3 className="">Full Name:</h3>
    //                     <input className="" id="fullname" autoComplete="off" onChange={(e) => setFullName(e.target.value)} />
    //                 </div>
    //                 <div>
    //                     <h3 className="">Username:</h3>
    //                     <input className="inputs" id="username" autoComplete="off" onChange={(e) => setUserName(e.target.value)} />
    //                 </div>
    //                 <div>
    //                     <h3 className="">Email:</h3>
    //                     <input className="inputs" id="email" autoComplete="email" onChange={(e) => setUserEmail(e.target.value)} />
    //                 </div>
    //                 {incorrectPassword
    //                     ?
    //                     <>
    //                         <h3 className="">Password:</h3>
    //                         <input className="inputs" id="password" type="password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)} />
    //                         <h3 className="">Verify Password:</h3>
    //                         <input className="inputs" id="verifyPassword" type="password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)} />
    //                         <button className="" type="submit">Sign Up</button>
    //                     </>
    //                     :
    //                     <>
    //                         <h3 className="">Password:</h3>
    //                         <input className="inputs-incorrect" id="password" type="password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)} />
    //                         <h4 className="">Passwords are not the same or must be at least 8 characters in length. Please re-enter password</h4>
    //                         <h3 className="">Verify Password:</h3>
    //                         <input className="inputs-incorrect" id="verifyPassword" type="password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)} />
    //                         <h4 className="">Passwords are not the same or must be at least 8 characters in length. Please re-enter password</h4>
    //                         <button className="" type="submit">Sign Up</button>
    //                     </>
    //                 }
    //             </form>
    //         </div>
    //     </>
    // )

    return (
        <>
        <div className="">
            <h1 className="">DevBook</h1>
            <Formik
                initialValues={{
                    fullname: '',
                    username: '',
                    email: '',
                    password: '',
                    verifyPassword: ''
                }}
                validationSchema={createUserSchema}
                onSubmit={createdNewUser}
            >
                {(props) => {
                    const { values: {
                        name,
                        email,
                        username,
                        password,
                        password_confirmation,
                        // image_url,
                    },
                        handleChange, handleSubmit, errors } = props
                    return (<form className="signup-form" onSubmit={handleSubmit}>
                        <p>*required fields</p>

                        <label>*Name: </label>
                        <input onChange={handleChange} value={name}
                            type="text" name="name" />
                        <p className="errorText">{errors.name}</p>

                        <label>*Email Address: </label>
                        <input onChange={handleChange} value={email}
                            type="email" name="email" />
                        <p className="errorText">{errors.email}</p>

                        <label>*Username: </label>
                        <input onChange={handleChange} value={username}
                            type="text" name="username" />
                        <p className="errorText">{errors.username}</p>

                        <label>*Password: </label>
                        <input onChange={handleChange} value={password}
                            type="text" name="password" />
                        <p className="errorText">{errors.password}</p>

                        <label>*Confirm Password: </label>
                        <input onChange={handleChange} value={password_confirmation}
                            type="text" name="password_confirmation" />
                        <p className="errorText">{errors.password_confirmation}</p>

                        {/* <label>Profile Picture URL: </label>
                        <input onChange={handleChange} value={image_url}
                            type="text" name="image_url" /> */}

                        {/* {error ? <p className="signupEditErrorMessage">{error.error}</p> : ""} */}

                        <button type="submit">Sign Up</button>
                        <div>
                            <p>Already have an account? <Link to="/login">Log In</Link></p>
                        </div>

                    </form>)
                }}
            </Formik>

        </div>

        </>
    )
}

export default SignUp;