import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik"
import * as yup from "yup";
import '../Style/Login.css'

function Login({ setIsLoggedIn, setUserId }) {

    const navigate = useNavigate()

    function handleLogIn(e) {
        console.log(e)
        // e.preventDefault()
        fetch('/login', {
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
                if (data === undefined) {
                    alert("Something went wrong. Please try again.")
                }
                else {
                    const userId = data.id
                    setUserId(userId)
                    // setLoginPassword("")
                    // setLoginUser("")
                    navigate(`/user/${userId}`)
                    setIsLoggedIn(true)
                }
            })
    }

    let loginSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
    })

    return (
        <div id="loginCont">

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={loginSchema}
                onSubmit={handleLogIn}>
                {(props) => {
                    const { values: { username, password }, handleChange, handleSubmit, errors, touched } = props
                    return (
                        <form className="loginSignupEditForm" onSubmit={handleSubmit}>
                            <div><label htmlFor="username">Username: </label>
                            <input id="username" onChange={handleChange} value={username}
                                type="text" name="username" /></div>

                            <div>
                                <label htmlFor="password">Password: </label>
                                <input id="password" onChange={handleChange} value={password}
                                    type="text" name="password" />
                                {errors.password && touched.password &&
                                    <div className="error">{errors.password}</div>}
                            </div>

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