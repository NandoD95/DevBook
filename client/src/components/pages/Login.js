import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik"
import * as yup from "yup";

function Login({ setIsLoggedIn, setUserId }) {

    const [loginUser, setLoginUser] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const navigate = useNavigate()

    function logIn(e) {
        e.preventDefault()
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    username: loginUser,
                    password: loginPassword
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
                if (data === undefined) {
                    alert("Something went wrong. Please try again.")
                }
                else {
                    const userId = data.id
                    setUserId(userId)
                    setLoginPassword("")
                    setLoginUser("")
                    navigate(`/user/${userId}`)
                    setIsLoggedIn(true)
                }
            })
    }

    let loginSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
    })

    // return (
    //     <>
    //         <div className="">
    //             <h1 className="">DevBook</h1>
    //         </div>
    //         <div className="">
    //             <h2 className="">Welcome to DevBook</h2>
    //             <form className="" onSubmit={(e) => logIn(e)}>
    //                 <div>
    //                     <h3 className="">Username:</h3>
    //                     <input id="username" className="inputs" autoComplete="username" onChange={(e) => setLoginUser(e.target.value)} />
    //                 </div>
    //                 <div>
    //                     <h3 className="">Password:</h3>
    //                     <input id="password" className="inputs" autoComplete="current-password" type="password" onChange={(e) => setLoginPassword(e.target.value)} />
    //                 </div>
    //                 <button className="" type="submit">Log In</button>
    //             </form>
    //             <h3 className="">New to DevBook? <Link className="" to="/signup">Sign Up</Link></h3>
    //         </div>
    //     </>
    // )

    return (
        <div id="loginCont">

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={loginSchema}
                onSubmit={logIn}>
                {(props) => {
                    const { values: { username, password, }, handleChange, handleSubmit, errors } = props
                    return (
                        <form className="loginSignupEditForm" onSubmit={handleSubmit}>
                            <div><label htmlFor="username">Username: </label>
                            <input id="username" onChange={handleChange} value={username}
                                type="text" name="username" /></div>

                            <div><label htmlFor="password">Password: </label>
                            <input id="password" onChange={handleChange} value={password}
                                type="text" name="password" /></div>

                            <button type="submit">Login</button>
                        </form>
                    )
                }}
            </Formik>
            <h3 className="">New to DevBook? <Link className="" to="/signup">Sign Up</Link></h3>

        </div>
    )
}

export default Login;