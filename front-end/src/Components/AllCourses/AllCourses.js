import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './Allcourses.css';
import { AuthContext } from '../../context/AuthContext'; 

export default function AllCourses() {
    const { authState } = useContext(AuthContext); 
    const navigate = useNavigate(); // Initialize useNavigate
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

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <div className="col-md-10">
                <div className="courses-container">
                    {courses.map(course => (
                        <div key={course._id} className="course-card">
                            <img 
                                src={`http://localhost:4000/${course.Thumbnail}`} 
                                alt="Course Thumbnail" 
                                className="course-thumbnails" 
                            />
                            <div className="course-info">
                                <h5 className="course-title">{course.titre}</h5>
                                <p className="course-description">{course.description}</p>
                                <div className="competences">
                                    {course.Competences.map(competence => (
                                        <span key={competence._id} className="competencer">{competence.Titre}</span>
                                    ))}
                                </div>
                                <div className="action-buttons">
                                    <Link to={`/enroll/${course._id}`} className="action-btn detail-btn">
                                        <FontAwesomeIcon icon={faInfoCircle} /> Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
