import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import '../Style/Signup.css'

function SignUp({ setIsLoggedIn, setUserId }) {

    const navigate = useNavigate()

    // creates a new user and logs them in
    function createdNewUser(e) {
        // e.preventDefault()
        // console.log(e)
            fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(e)
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
                    // console.log(data)
                    const userId = data.id
                    setUserId(data)
                    // setFullName("")
                    // setUserName("")
                    // setUserEmail("")
                    // setUserPassword("")
                    // setCheckPassword("")
                    navigate(`/user/${userId}`)
                    setIsLoggedIn(true)
                })
                .catch(error => {
                    alert("Something went wrong. Please try again.")
                    console.error('Login failed:', error)
                })
    }

    // Yup schema for validating the create user form data
    let createUserSchema = yup.object().shape({
        name: yup.string().max(40, 'First name too Long!').required(),
        username: yup.string().max(20, 'Username too Long!').required(),
        password: yup.string().max(20, 'Password too Long!').required(),
        password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
        // image_url: yup.string(),
        email: yup.string().email().required(),
    })

    return (
        <>
        <div className="signup-container">
            <h1 className="signup-header">DevBook</h1>
            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
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
                        <p>* Required Fields</p>

                        <label htmlFor="name">* Name: </label>
                        <input onChange={handleChange} value={name}
                            type="text" name="name" />
                        <p className="errorText">{errors.name}</p>

                        <label htmlFor="email">* Email Address: </label>
                        <input onChange={handleChange} value={email}
                            type="email" name="email" />
                        <p className="errorText">{errors.email}</p>

                        <label htmlFor="username">* Username: </label>
                        <input onChange={handleChange} value={username}
                            type="text" name="username" />
                        <p className="errorText">{errors.username}</p>

                        <label htmlFor="password">* Password: </label>
                        <input onChange={handleChange} value={password}
                            type="password" name="password" />
                        <p className="errorText">{errors.password}</p>

                        <label htmlFor="password_confirmation">* Confirm Password: </label>
                        <input onChange={handleChange} value={password_confirmation}
                            type="password" name="password_confirmation" />
                        <p className="errorText">{errors.password_confirmation}</p>

                        {/* <label>Profile Picture URL: </label>
                        <input onChange={handleChange} value={image_url}
                            type="text" name="image_url" /> */}

                        {/* {error ? <p className="signupEditErrorMessage">{error.error}</p> : ""} */}

                        <button type="submit">Sign Up</button>

                    </form>)
                }}
            </Formik>
            <div className="login-link">
                <p>Already have an account? <Link to="/login">Log In</Link></p>
            </div>

        </div>

        </>
    )
}

export default SignUp;