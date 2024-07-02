import React, { useState } from 'react';
import "./Style/postForm.css"

const PostForm = ({ setNewPost }) => {
  // State variables
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Event handlers
  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
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
      formData.append('caption', caption);
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
      setCaption('');
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
              value={caption}
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

// import React, { useState } from 'react';

// const PostForm = ({ setNewPost }) => {
//   // State variables
//   const [caption, setCaption] = useState('');
//   const [image, setImage] = useState(null);
//   const [imageURL, setImageURL] = useState('');
//   const [submittedData, setSubmittedData] = useState(null);

//   // Event handlers
//   const handleCaptionChange = (event) => {
//     setCaption(event.target.value);
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
//       formData.append('caption', caption);
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
//       setCaption('');
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
//     <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="caption" className="block text-gray-700 text-sm font-bold mb-2">
//             {/* What's on your mind? */}
//           </label>
//           <textarea
//             id="caption"
//             value={caption}
//             onChange={handleCaptionChange}
//             placeholder="What is on your mind..."
//             className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             rows="3"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
//             Add a Photo
//           </label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {imageURL && (
//             <img
//               src={imageURL}
//               alt="Selected"
//               className="mt-2 max-w-xs rounded-lg"
//             />
//           )}
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Share
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PostForm;
