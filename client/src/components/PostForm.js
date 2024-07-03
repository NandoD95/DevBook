import React, { useState } from 'react';
import "./Style/postForm.css"
import { Formik } from "formik"
import * as yup from "yup";

const PostForm = ({ setNewPost }) => {
  // State variables
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Event handlers
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageURL(URL.createObjectURL(selectedImage)); // Create temporary URL
  };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // Create FormData object to send image file
//       const formData = new FormData();
//       formData.append('content', content);
//       formData.append('image', image);
//       formData.append('user_id', 1); // Replace with actual user ID

//       const response = await fetch('/post', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit the form');
//       }

//       // Reset form after successful submission
//       setContent('');
//       setImage(null);
//       setImageURL('');

//       const responseData = await response.json();
//       setSubmittedData(responseData);
//       setNewPost(responseData);

//       console.log('Form submitted successfully');
//     } catch (error) {
//       console.error('Error submitting form:', error.message);
//     }
//   };

//   return (
//     <div className="post-form-container">
//       <div className="">
//         <form onSubmit={handleSubmit} className="post-form">
//           <div className='form-group'>
//             <label htmlFor="caption" className="form-label">
//               What's on your mind?
//             </label>
//             <input
//               type="text"
//               id="caption"
//               value={content}
//               onChange={handleCaptionChange}
//               placeholder="Write a thought..."
//               className="form-control"
//               rows="3"
//             />
//           </div>
//           <div className='form-group'>
//             <label htmlFor="image" className="form-label">
//               Add a Photo
//             </label>
//             <input
//               type="file"
//               id="image"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="form-control-file"
//             />
//             {imageURL && (
//               <img
//                 src={imageURL}
//                 alt="Selected"
//                 className="selected image"
//               />
//             )}
//           </div>
//           <div className='button-group'>
//             <button
//                 type="submit"
//                 className="btn btn-primary"
//             >
//                 Share
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

    const handleSubmit = async (event) => {
        // event.preventDefault();
        // event.user_id = 1

        fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
        })
                .then(r => {
                    if (r.ok) {
                        return r.json()
                    }
                    else {
                        alert("Something Wrong With Post")
                        return undefined
                    }
                })
                .then(data => {
                    if (data === undefined){
                        alert("Something went wrong. Please try again!")
                    }
                    else {
                        alert("Post Created!")
                    }
                })
    }
        let loginSchema = yup.object().shape({
            content: yup.string().required(),
            image_url: yup.string().notRequired(),
            language_used: yup.string().required()
        })

        return (
            <div>
                <Formik
                    initialValues={{
                        content: '',
                        image_url: '',
                        language_used: ''
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}>
    
                    {(props) => {
                        const { values: {content, image_url, language_used}, handleChange, handleSubmit, errors, touched} = props
                        return (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="content">Content</label>
                                    <input type="text" name="content" value={content} onChange={handleChange} />
                                    {errors.content && touched.content && <div>{errors.content}</div>}
                                </div>
                                <div>
                                    <label htmlFor="image_url">Image URL</label>
                                    <input type="text" name="image_url" value={image_url} onChange={handleChange} />
                                    {errors.image_url && touched.image_url && <div>{errors.image_url}</div>}
                                </div>
                                <div>
                                    <label htmlFor="language_used">Language Used</label>
                                    <input type="text" name="language_used" value={language_used} onChange={handleChange} />
                                    {errors.language_used && touched.language_used && <div>{errors.language_used}</div>}
                                </div>
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        )   
                    }}
                </Formik>
            </div>
        )
}
export default PostForm;
