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
                        user_id: userId, // Assuming userId is passed as a prop
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} className="project-form">
                            <div className="form-group">
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