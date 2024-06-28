import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

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