import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './DetailCourses.css';
import axios from 'axios';

export default function DetailCourses() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        titre: '',
        content: '',
        resources: null,
    });

    // Fetch course details
    useEffect(() => {
        axios.get(`http://localhost:4000/cours/${id}`)
            .then(response => {
                setCourse(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching course details:', error);
                setError('Error fetching course details');
                setLoading(false);
            });
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    // Handle content changes from ReactQuill
    const handleContentChange = (content) => {
        setFormData(prevState => ({
            ...prevState,
            content
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('titre', formData.titre);
        data.append('content', formData.content);
        if (formData.resources) {
            data.append('resources', formData.resources);
        }

        // Log FormData keys and values for debugging
        for (let [key, value] of data.entries()) {
            console.log(key, value);
        }

        // Send data to backend
        axios.patch(`http://localhost:4000/cours/${id}/chapitres`, data)
            .then(response => {
                setCourse(response.data);
                setLoading(false);
                setFormData({
                    titre: '',
                    content: '',
                    resources: null,
                });
            })
            .catch(error => {
                console.error('Error adding new chapter to course:', error);
                setError('Error adding new chapter to course');
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!course) {
        return <div>No course data found</div>;
    }

    return (
        <div className="course-detail">
            <h1>Course `{course.titre}`</h1>
            <h3>Chapters :</h3>
            <ol>
                {course.chapitres && course.chapitres.length > 0 ? (
                    course.chapitres.map(chapitre => (
                    <li key={chapitre._id}>{chapitre.titre}</li>
                    ))
                ) : (
                    <p>No Chapters listed in this course.</p>
                )}
            </ol>
            <div className="Form-detail-course">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="titre"
                            value={formData.titre}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Content:</label>
                        <div className="quill-container">
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={handleContentChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Resources:</label>
                        <input
                            type="file"
                            name="resources"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Add the Chapter</button>
                </form>
            </div>
        </div>
    );
}
