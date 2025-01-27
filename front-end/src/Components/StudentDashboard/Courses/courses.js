import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/sidebar';
import './courses.css';
import { Link } from 'react-router-dom';
import { faEdit, faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        fetch('http://localhost:4000/cours')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                return response.json();
            })
            .then(data => {
                setCourses(data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                setError('Error fetching courses');
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/cours/deleteCourse/${id}`)
            .then(() => {
                console.log('Course deleted successfully:', id);
                setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
            })
            .catch(error => {
                console.error('Error deleting course:', error);
                setError('Error deleting course');
            });
    };
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="courses-container">
                        {courses.map(course => (
                            <div key={course._id} className="course-card">
                                <img 
                                    src={`http://localhost:4000/${course.Thumbnail}`} 
                                    alt="Course Thumbnail" 
                                    className="course-thumbnail" 
                                />
                                <div className="course-info">
                                    <h5 className="course-title">{course.titre}</h5>
                                    <p className="course-description">{course.description}</p>
                                    <div className="competences">
                                        {course.Competences.map(competence => (
                                            <span key={competence._id} className="competence">{competence.Titre}</span>
                                        ))}
                                    </div>
                                    <div className="action-buttons">
                                        <Link to={`/cours/detailCourse/${course._id}`} className="action-btn detail-btn">
                                            <FontAwesomeIcon icon={faInfoCircle} /> Course detail
                                        </Link>
                                        <Link to={`/cours/editCourse/${course._id}`} className="action-btn edit-btn">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                        <button onClick={() => handleDelete(course._id)} className='btn delete-btn' >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
