import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/sidebar';
import axios from 'axios';
import './AddCourses.css'; // Import the CSS file

export default function AddCourses() {
    const [formData, setFormData] = useState({
        titre: '',
        Thumbnail: null,
        description: '',
        trancheAge: '',
        Competences: [],
    });

    const [ageRanges, setAgeRanges] = useState([]);
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch age ranges from backend
        axios.get('http://localhost:4000/trancheAge')
            .then(response => {
                setAgeRanges(response.data);
            })
            .catch(error => {
                console.error('Error fetching age ranges:', error);
                setError('Error fetching age ranges.');
            });

        axios.get('http://localhost:4000/competences/all')
            .then(response => {
                setSkills(response.data);
            })
            .catch(error => {
                console.error('Error fetching competences:', error);
                setError('Error fetching competences.');
            });
    }, []);

    const handleChange = e => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const handleCompetencesChange = e => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prevState => ({
            ...prevState,
            Competences: selectedOptions,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach(item => data.append(`${key}[]`, item)); // Append array items correctly
            } else {
                data.append(key, formData[key]);
            }
        }
        axios.post('http://localhost:4000/cours', data)
            .then(response => {
                console.log('Course added successfully:', response.data);
                setSuccess('Course added successfully!');
                setError(''); // Clear error on success
            })
            .catch(error => {
                console.error('Error adding course:', error);
                setError('Error adding course.');
                setSuccess(''); // Clear success message on error
            });
    };

    return (
        <div className="page-container">
            <Sidebar />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="titre" value={formData.titre} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Thumbnail:</label>
                        <input type="file" name="Thumbnail" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Tranche d'âge:</label>
                        <select name="trancheAge" value={formData.trancheAge} onChange={handleChange}>
                            <option value="">Select an age range</option>
                            {ageRanges.map(ageRange => (
                                <option key={ageRange._id} value={ageRange._id}>From {ageRange.ageMin} To {ageRange.ageMax}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Competences:</label>
                        <select name="Competences" value={formData.Competences} onChange={handleCompetencesChange} multiple>
                            {skills.map(skill => (
                                <option key={skill._id} value={skill._id}>{skill.Titre}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Add the course</button>
                </form>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
        </div>
    );
}
