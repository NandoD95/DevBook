import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignUp({ setIsLoggedIn, setUserId }) {

    const navigate = useNavigate()

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
            fetch('/users', {
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

    return (
        <>
            <div className="flex select-none mb-16 border-b-2">
                <h1 className="">DevBook</h1>
            </div>
            <div className="">
                <h2 className="">Please type in information to create account:</h2>
                <form className="" onSubmit={(e) => createdNewUser(e)}>
                    <div className="">
                        <h3 className="">Full Name:</h3>
                        <input className="" id="fullname" autoComplete="off" onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div>
                        <h3 className="">Username:</h3>
                        <input className="inputs" id="username" autoComplete="off" onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div>
                        <h3 className="">Email:</h3>
                        <input className="inputs" id="email" autoComplete="email" onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    {incorrectPassword
                        ?
                        <>
                            <h3 className="">Password:</h3>
                            <input className="inputs" id="password" type="password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)} />
                            <h3 className="">Verify Password:</h3>
                            <input className="inputs" id="verifyPassword" type="password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)} />
                            <button className="" type="submit">Sign Up</button>
                        </>
                        :
                        <>
                            <h3 className="">Password:</h3>
                            <input className="inputs-incorrect" id="password" type="password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)} />
                            <h4 className="">Passwords are not the same or must be at least 8 characters in length. Please re-enter password</h4>
                            <h3 className="">Verify Password:</h3>
                            <input className="inputs-incorrect" id="verifyPassword" type="password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)} />
                            <h4 className="">Passwords are not the same or must be at least 8 characters in length. Please re-enter password</h4>
                            <button className="" type="submit">Sign Up</button>
                        </>
                    }
                </form>
            </div>
        </>
    )
}

export default SignUp;