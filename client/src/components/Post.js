import React, { useState, useEffect } from "react";
import "./Style/post.css"

function Post({ post, username, userId }) {
  const [like, setLike] = useState(false);
  const [interaction, setInteraction] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [comment, setComment] = useState(true);

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

  return (
    <div className="post-container">
      <div className="post">
        <div className="post-header">
          <h2 className="">{username}</h2>
        </div>
        <img className="post-image" src={post.image_url} alt="No Photo" />
        <p className="post-content">{post.content}</p>
        <p className="post-language">Language Used: {post.language_used}</p>
        {/* <form onSubmit={(e) => addComment(e)}>
        <input className="" id="comment" placeholder="Add Comment" onChange={(e) => setCommentText(e.target.value)} />
        </form> */}
        {/* {comment ? <></> : <div className="">{comments}</div>} */}
      </div>
    </div>
  );
}

export default Post;
