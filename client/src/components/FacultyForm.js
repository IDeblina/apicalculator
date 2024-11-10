import React, { useState } from 'react';
import axios from 'axios';

const FacultyForm = ({ facultyToEdit, onFormSubmit }) => {
    const [faculty, setFaculty] = useState(facultyToEdit || { name: '', email: '' });

    const handleChange = (e) => {
        setFaculty({ ...faculty, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (faculty.id) {
            await axios.put(`/api/faculty/${faculty.id}`, faculty);
        } else {
            await axios.post('/api/faculty', faculty);
        }
        onFormSubmit();
    };

    return (
        <div className="container mt-4">
            <h2>{faculty.id ? 'Edit Faculty' : 'Add Faculty'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={faculty.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={faculty.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </div>
    );
};

export default FacultyForm;