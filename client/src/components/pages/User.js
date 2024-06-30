import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Post from "../Post"

function User({ setIsLoggedIn, userId, setUserId }) {

    const [userData, setUserData] = useState("")
    const [otherUser, setOtherUser] = useState([])
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState(undefined)

    const navigate = useNavigate()

    useEffect(() => {
        fetch('/posts')
            .then(r => r.json())
            .then(info => {
                setPosts(info)
            })
        fetch('/users')
            .then(r => r.json())
            .then(users => {
                const filteredUsers = users.filter(user => user.id !== userId)
                const currentUser = users.filter(user => user.id == userId)
                currentUser.map(user => {
                    setUserData(user)
                })
                setOtherUser(filteredUsers)
            })
    }, [userId])

    function handleLogOut() {
        setIsLoggedIn(false)
        setUserId(0)
        fetch(`/login`, {
            method: "DELETE"
        })
        navigate('/login')
    }

    const post = posts?.filter((post) => {
        return (post.id == userData.id)
    })

    const postCard = post.map((post) => {
        return <Post key={post.id} post={post} userId={userId} username={userData.username} />
    })

    return (
        <>
            <div className="">
                <h1 className="">DevBook</h1>
                {/* <Search otherUser={otherUser}/> */}
                <button className="" onClick={() => handleLogOut()}>Logout</button>
            </div>
           {/* <PostForm setNewPost={setNewPost} />  */}
            <div className="">
                <div className="">
                    <h2 className="">{userData.username}</h2>
                    <h3 className="">Posts: {post.length}</h3>
                </div>
            </div>
            {postCard}
            {newPost && <Post post={newPost} username={userData.username} />}
        </>
    )
}

export default User;