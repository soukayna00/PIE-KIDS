import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import './EditCourse.css';
import axios from 'axios';

export default function EditCourse() {
    const { CourseId } = useParams(); // Destructure to get the courseId directly
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("CourseId:", CourseId); // Log the CourseId to verify extraction
        const fetchData = async () => {
            try {
                console.log(`Fetching course data for course id: ${CourseId}`);
                const courseResponse = await axios.get(`http://localhost:4000/cours/${CourseId}`);
                const ageRangesResponse = await axios.get('http://localhost:4000/trancheAge');
                const skillsResponse = await axios.get('http://localhost:4000/competences/all');

                console.log("Course response data:", courseResponse.data);
                console.log("Age ranges response data:", ageRangesResponse.data);
                console.log("Skills response data:", skillsResponse.data);

                const courseData = courseResponse.data;
                const ageRangesData = ageRangesResponse.data;
                const skillsData = skillsResponse.data;

                setFormData({
                    titre: courseData.titre || '',
                    description: courseData.description || '',
                    trancheAge: courseData.trancheAge ? courseData.trancheAge._id : '',
                    Competences: Array.isArray(courseData.Competences) ? courseData.Competences.map(skill => skill._id) : [],
                });

                setAgeRanges(ageRangesData);
                setSkills(skillsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [CourseId]);

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

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach(item => data.append(`${key}[]`, item)); // Append array items correctly
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            console.log('Submitting form data:', formData);
            const response = await axios.put(`http://localhost:4000/cours/editCourse/${CourseId}`, data);
            console.log('Response from server:', response);
            if (response.status !== 200) {
                throw new Error(`Error updating course: ${response.statusText}`);
            }
            const result = response.data;
            console.log('Course updated successfully:', result);
            setSuccess('Course updated successfully!');
            setError(''); // Clear error on success
        } catch (error) {
            console.error('Error updating course:', error);
            setError(error.message);
            setSuccess(''); // Clear success message on error
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
                    <button type="submit">Update the course</button>
                </form>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
        </div>
    );
}
