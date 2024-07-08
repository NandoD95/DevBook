import { Formik } from "formik"
import * as yup from "yup";
import "./Style/projectForm.css"

const ProjectForm = ({userId}) => {

    const handleSubmit = async (event) => {
        // event.preventDefault();
        
        fetch('/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: event.name,
                    description: event.description,
                    link: event.link,
                    user_id: event.user_id
                })
        })
                .then(r => {
                    if (r.ok) {
                        return r.json()
                    }
                    else {
                        alert("Something Wrong With Project")
                        return undefined
                    }
                })
                .then(data => {
                    if (data === undefined){
                        alert("Please try again!")
                    }
                    else {
                        alert("Project Uploaded!")
                    }
                })
    }

    let validationSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        description: yup.string().required("Description is required"),
        link: yup.string().required("Link is required"),
        user_id: yup.number().required("User ID is required")
        })
        return (
            <div className="project-form-container">
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        link: '',
                        user_id: userId,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} className="project-form">
                            <div className="form-group">
                                <h1 className="project-form-header">Project Form</h1>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                />
                                {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
    
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                             id="description"
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`}
                                />
                                {touched.description && errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>
    
                            <div className="form-group">
                                <label htmlFor="link">Link</label>
                                <input
                                    type="text"
                                    id="link"
                                    name="link"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.link}
                                    className={`form-control ${touched.link && errors.link ? 'is-invalid' : ''}`}
                                />
                                {touched.link && errors.link && <div className="invalid-feedback">{errors.link}</div>}
                            </div>
    
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        );
}

export default ProjectForm;

// import React, { useState } from "react";
// import { Formik } from "formik";
// import * as yup from "yup";
// import "./Style/projectForm.css"; // Update with your CSS file path

// const ProjectForm = ({ setNewProject, userId }) => {
//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       const response = await fetch("/projects", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: values.name,
//           description: values.description,
//           link: values.link,
//           user_id: userId
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit the form");
//       }

//       const responseData = await response.json();
//       setNewProject(responseData); // Update User component with new project data
//       alert("Project Created!");
//       resetForm(); // Reset the form after successful submission
//     } catch (error) {
//       console.error("Error submitting form:", error.message);
//       alert("Something went wrong. Please try again!");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   let projectSchema = yup.object().shape({
//     name: yup.string().required("Name is requried"),
//     description: yup.string().required("Description is required"),
//     link: yup.string().required("Link is Required"),
//     user_id: yup.number().required("User ID is required")
//   });

//   return (
//     <div className="project-form-container">
//       <Formik
//         initialValues={{
//           title: "",
//           description: "",
//         }}
//         validationSchema={projectSchema}
//         onSubmit={handleSubmit}
//       >
//         {(props) => {
//           const {
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleSubmit,
//             isSubmitting,
//           } = props;

//           return (
//             <form onSubmit={handleSubmit} className="project-form">
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Project Title"
//                   value={values.title}
//                   onChange={handleChange}
//                   className={`form-control ${
//                     touched.title && errors.title ? "is-invalid" : ""
//                   }`}
//                 />
//                 {touched.title && errors.title && (
//                   <div className="invalid-feedback">{errors.title}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <textarea
//                   name="description"
//                   placeholder="Project Description"
//                   value={values.description}
//                   onChange={handleChange}
//                   className={`form-control ${
//                     touched.description && errors.description
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                 />
//                 {touched.description && errors.description && (
//                   <div className="invalid-feedback">{errors.description}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export default ProjectForm;       