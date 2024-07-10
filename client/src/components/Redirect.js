import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

// redirect users to a specific route based on login status
// if user is logged in they will be redirected to their user page
// if not logged in they will be redirected to the login page
function Redirect({ isLoggedIn, userId }) {

    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn === true) {
            navigate(`/user/${userId}`)
        }
        else {
            navigate('/login')
        }
    }, [isLoggedIn, userId, navigate])

    return null;
}

export default Redirect;