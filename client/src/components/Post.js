import { useState, useEffect } from "react";

function Post({ post, username, userId }) {
    const [like, setLike] = useState(false);
    const [comment, showComment] = useState(true);
    const [interaction, setInteraction] = useState([]);
    const [commentText, setCommentText] = useState("")

    const number = interaction.length - 1;

    useEffect(() => {
        fetch(`/post/${post.id}`)
            .then(r => r.json())
            .then(data => {
                setInteraction(data['interactions']);
                const index = data['interactions'].length - 1;
                const currentLike = data['interactions'][index]?.like;
                setLike(currentLike);
            })
            .catch(error => console.error('Error fetching interactions:', error));
    }, [post.id]);

    // function showComments(e) {
    //     e.preventDefault();
    //     showComment((prevcom) => !prevcom);
    // }

    // function updateLike() {
    //     setLike((prevLike) => !prevLike);
    //     const interactionId = interaction[number]?.id;
    //     fetch(`/interactions/${interactionId}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(
    //             {
    //                 like: !like,
    //                 user_id: userId,
    //                 post_id: post.id
    //             }
    //         )
    //     })
    // }

    // function addComment(e) {
    //     e.preventDefault()
    //     fetch('/interactions', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(
    //             {
    //                 comment: commentText,
    //                 like: like,
    //                 user_id: userId,
    //                 post_id: post.id,
    //             }
    //         )
    //     })
    //         .then(r => r.json())
    //         .then(newComment => {
    //             setInteraction(prevInteraction => [...prevInteraction, newComment]);
    //             setCommentText("");
    //         })
    //         .catch(error => console.error('Error adding comment:', error));
    // }

    const comments = interaction.map(comment => {
        return <p key={comment.id} className="">{comment.user.username}: {comment.comment}</p>
    });

    return (
        <div className="">
            <div>
                <div className="">
                    <h2 className="">{username}</h2>
                </div>
                <img src={post.image_url} />
                {/* <div className="">
                    {like
                        ? <img className="" src="get a heart liked photo here" onClick={() => updateLike()} />
                        : <img className="" src="get a unheart like photo here" onClick={() => updateLike()} />
                    }
                    <img className="" src="get a section for comments" onClick={(e) => showComments(e)} />
                </div> */}
                <p className="">{post.caption}</p>
                {comment
                    ? <></>
                    : <div className="">{comments}</div>
                }
                {/* <form onSubmit={(e) => addComment(e)}>
                    <input className="" id="comment" placeholder="Add Comment" onChange={(e) => setCommentText(e.target.value)} />
                </form> */}
            </div>
        </div>
    );
}

export default Post;