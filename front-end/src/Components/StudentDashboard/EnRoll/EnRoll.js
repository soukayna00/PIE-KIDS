import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../../context/AuthContext';
import './EnRoll.css';

const Enroll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const { user, loading } = authState;
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/cours/${id}`);
      setCourse(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
      setError('Error fetching course details');
    }
  };

  const handleEnroll = async () => {
    if (!authState.isAuthenticated) {
      navigate('/login');
    } else {
      try {
        console.log('User ID:', authState.id); 
        await axios.post(`http://localhost:4000/cours/enroller/${id}`, { userId: authState.id });
        navigate(`/courses/${id}/dashboard`);
      } catch (error) {
        console.error('Error enrolling in course:', error);
        setError('Error enrolling in course');
      }
    }
  };

  if (loading) {
    return <div><img id='goombella' src="/assets/goombella-walking" alt="Cute animal" /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-details-container">
      <div className='diff-dog'>
        <img 
          src={`http://localhost:4000/${course.Thumbnail}`} 
          alt="Course Thumbnail" 
          className="course-thumbnail" 
        />
        <div className='text-content'>
          <h2>{course.titre}</h2>
          <h3>Description</h3>
          <p>{course.description}</p>
        </div>
      </div>
      
      <div className="tranche-age">
        <h3>Age Range:</h3>
        <span>{course.trancheAge.ageMin} - {course.trancheAge.ageMax}</span>
      </div>
      
      <div className="chapters">
        <h3>Curriculum:</h3>
        <ul>
          {course.chapitres && course.chapitres.map(chapitre => (
            <li key={chapitre._id}>
              <details>
                <summary>{chapitre.titre}</summary>
                <div dangerouslySetInnerHTML={{ __html: chapitre.content }}></div>
                {chapitre.resources && chapitre.resources.length > 0 && (
                  <div className="resources">
                    <h4>Resources:</h4>
                    <ul>
                      {chapitre.resources.map(resource => (
                        <li key={resource._id}>
                          <a 
                            href={`http://localhost:4000/uploads/${resource.filename}`} 
                            download={resource.filename} 
                            className="resource-button"
                          >
                            <FontAwesomeIcon icon={faDownload} /> Download
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </details>
            </li>
          ))}
        </ul>
        <button onClick={handleEnroll} className='EN-roll'>Enroll</button>
      </div>
    </div>
  );
};

export default Enroll;
