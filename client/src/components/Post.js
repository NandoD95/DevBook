import React, { useState, useEffect } from "react";
import "./Style/post.css"
import { Formik } from 'formik'

function Post({ post, username, userId }) {
    const [like, setLike] = useState(false);
    const [interaction, setInteraction] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [comment, setComment] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content)

    useEffect(() => {
        fetch(`/post/${post.id}`)
            .then((r) => r.json())
            .then((data) => {
                if (data && data.interactions) {
                    setInteraction(data.interactions);
                    const index = data.interactions.length - 1;
                    const currentLike = data.interactions[index]?.like;
                    setLike(currentLike);
                }
            })
            .catch((error) => console.error("Error fetching interactions:", error));
    }, [post.id]);

    //   const updateLike = () => {
    //     setLike((prevLike) => !prevLike);
    //     const index = interaction.length - 1; // Assuming interaction is properly set
    //     const interactionId = interaction[index]?.id;
    //     fetch(`/interactions/${interactionId}`, {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         like: !like,
    //         user_id: userId,
    //         post_id: post.id,
    //       }),
    //     });
    //   };

    //   const addComment = (e) => {
    //     e.preventDefault();
    //     fetch("/interactions", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         comment: commentText,
    //         like: like,
    //         user_id: userId,
    //         post_id: post.id,
    //       }),
    //     })
    //       .then((r) => r.json())
    //       .then((newComment) => {
    //         setInteraction((prevInteraction) => [...prevInteraction, newComment]);
    //         setCommentText("");
    //       })
    //       .catch((error) => console.error("Error adding comment:", error));
    //   };

    //   const comments = interaction ? (
    //     interaction.map((comment) => (
    //       <p key={comment.id} className="">
    //         {comment.user.username}: {comment.comment}
    //       </p>
    //     ))
    //   ) : (
    //     <p>No comments available</p>
    //   );


    const handleEdit = (values) => {
        fetch(`/post/${post.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((r) => r.json())
            .then((updatedPost) => {
                console.log(updatedPost)
                // Update the post content after successful edit
                // post.content = updatedPost.content;
                setEditing(false);
                setEditedContent(updatedPost.content)
            })
            .catch((error) => console.error("Error editing post:", error));
    };

    const handleDelete = () => {
        fetch(`/post/${post.id}`, {
            method: "DELETE",
        })
            .then(() => {
                // Handle post deletion (e.g., remove from UI)
                console.log("Post deleted successfully");
            })
            .catch((error) => console.error("Error deleting post:", error));
    };

    return (
        <div className="post-container">
            <div className="post">
                <div className="post-header">
                    <h2>{username}</h2>
                    <div>
                        {/* <button onClick={updateLike}>{like ? "Unlike" : "Like"}</button> */}
                        { !editing ?
                            <div>
                                <button onClick={() => setEditing(!editing)}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                                <p>{editedContent}</p>
                            </div> :
                            <Formik
                                initialValues={{ content: post.content }}
                                onSubmit={handleEdit}>
                                {(props) => {
                                    const { values: { content }, handleChange, handleSubmit, errors, touched } = props
                                    return (
                                        <form className="loginSignupEditForm" onSubmit={handleSubmit}>
                                            <div><label htmlFor="content">Content: </label>
                                                <input id="content" onChange={handleChange} value={content}
                                                    type="text" content="content" /></div>
                                            <button type='submit'>Save</button>
                                            <button onClick={() => setEditing(!editing)}>Cancel</button>
                                        </form>
                                    )
                                }}
                            </Formik>
                        }
                    </div>
                </div>
                <img className="post-image" src={post.image_url} alt="No Photo" />
                {editing ? (
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                ) : (
                    <p className="post-content">{}</p>
                )}
                <p className="post-language">Language Used: {post.language_used}</p>
                {/* Display comments section */}
            </div>
        </div>
    );

    //   return (
    //     <div className="post-container">
    //       <div className="post">
    //         <div className="post-header">
    //           <h2 className="">{username}</h2>
    //         </div>
    //         <button onClick={toggleEdit}>Edit</button>
    //         <img className="post-image" src={post.image_url} alt="No Photo" />
    //         <p className="post-content">{post.content}</p>
    //         <p className="post-language">Language Used: {post.language_used}</p>
    //         <button onClick={handleDelete}>Delete</button>
    //         {/* <form onSubmit={(e) => addComment(e)}>
    //         <input className="" id="comment" placeholder="Add Comment" onChange={(e) => setCommentText(e.target.value)} />
    //         </form> */}
    //         {/* {comment ? <></> : <div className="">{comments}</div>} */}
    //       </div>
    //     </div>
    //   );
}

export default Post;
