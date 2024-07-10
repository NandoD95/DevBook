import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import "./Style/postForm.css"

const PostForm = ({ setNewPost, userId }) => {
  // handles form submission 
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: values.content,
          image_url: values.image_url,
          language_used: values.language_used,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      const responseData = await response.json();
      setNewPost(responseData); // Update User component with new post data
      alert("Post Created!");
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Something went wrong. Please try again!");
    } finally {
      setSubmitting(false);
    }
  };

  // Yuyp schemaa for form validation
  let loginSchema = yup.object().shape({
    content: yup.string().required(),
    image_url: yup.string().notRequired(),
    language_used: yup.string().required(),
  });

  return (
    <div className="post-form-container">
      <Formik
        initialValues={{
          content: "",
          image_url: "",
          language_used: "",
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
                    touched.content && errors.content ? "is-invalid" : ""
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
                    touched.image_url && errors.image_url ? "is-invalid" : ""
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
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {touched.language_used && errors.language_used && (
                  <div className="invalid-feedback">
                    {errors.language_used}
                  </div>
                )}
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PostForm;

