// import React, { useState } from 'react';
import "./Style/postForm.css"
import { Formik } from "formik"
import * as yup from "yup";

const PostForm = ({ setNewPost, user_id }) => {
  // State variables
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
//   const [imageURL, setImageURL] = useState('');
//   const [submittedData, setSubmittedData] = useState(null);

  // Event handlers
//   const handleContentChange = (event) => {
//     setContent(event.target.value);
//   };

//   const handleImageChange = (event) => {
//     const selectedImage = event.target.files[0];
//     setImage(selectedImage);
//     setImageURL(URL.createObjectURL(selectedImage)); // Create temporary URL
//   };

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

    const handleSubmit = async (event) => {
        // event.preventDefault();
        
        fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: event.content,
                    image_url: event.image_url,
                    user_id: user_id,
                    language_used: event.language_used
                })
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
            <div className="post-form-container">
              <Formik
                initialValues={{
                  content: '',
                  image_url: '',
                  language_used: '',
                }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {(props) => {
                  const {
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                  } = props;
        
                  return (
                    <form onSubmit={handleSubmit} className="post-form">
                      <div className="form-group">
                        <textarea
                          name="content"
                          placeholder="What's on your mind?"
                          value={values.content}
                          onChange={handleChange}
                          className={`form-control ${
                            touched.content && errors.content ? 'is-invalid' : ''
                          }`}
                        />
                        {touched.content && errors.content && (
                          <div className="invalid-feedback">{errors.content}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="image_url"
                          placeholder="Enter Image URL (optional)"
                          value={values.image_url}
                          onChange={handleChange}
                          className={`form-control ${
                            touched.image_url && errors.image_url ? 'is-invalid' : ''
                          }`}
                        />
                        {touched.image_url && errors.image_url && (
                          <div className="invalid-feedback">{errors.image_url}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="language_used"
                          placeholder="Language Used"
                          value={values.language_used}
                          onChange={handleChange}
                          className={`form-control ${
                            touched.language_used && errors.language_used
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        {touched.language_used && errors.language_used && (
                          <div className="invalid-feedback">{errors.language_used}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          );
}
export default PostForm;
