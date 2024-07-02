import React, { useState } from 'react';
import "./Style/postForm.css"

const PostForm = ({ setNewPost }) => {
  // State variables
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Event handlers
  const handleCaptionChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageURL(URL.createObjectURL(selectedImage)); // Create temporary URL
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create FormData object to send image file
      const formData = new FormData();
      formData.append('content', content);
      formData.append('image', image);
      formData.append('user_id', 1); // Replace with actual user ID

      const response = await fetch('/post', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      // Reset form after successful submission
      setContent('');
      setImage(null);
      setImageURL('');

      const responseData = await response.json();
      setSubmittedData(responseData);
      setNewPost(responseData);

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <div className="post-form-container">
      <div className="">
        <form onSubmit={handleSubmit} className="post-form">
          <div className='form-group'>
            <label htmlFor="caption" className="form-label">
              What's on your mind?
            </label>
            <input
              type="text"
              id="caption"
              value={content}
              onChange={handleCaptionChange}
              placeholder="Write a thought..."
              className="form-control"
              rows="3"
            />
          </div>
          <div className='form-group'>
            <label htmlFor="image" className="form-label">
              Add a Photo
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control-file"
            />
            {imageURL && (
              <img
                src={imageURL}
                alt="Selected"
                className="selected image"
              />
            )}
          </div>
          <div className='button-group'>
            <button
                type="submit"
                className="btn btn-primary"
            >
                Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
