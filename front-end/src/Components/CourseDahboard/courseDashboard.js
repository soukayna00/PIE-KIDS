import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseDashboard.css';

const CourseDashboard = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedChapitre, setSelectedChapitre] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/cours/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleChapitreClick = (chapitre) => {
    setSelectedChapitre(chapitre);
  };

  return (
    <div className='Course-Dashboard-container custom-cursor'>
      <h1><img id='dashboard-mario' src="/assets/luigi.png" alt="Cute animal" />Course Dashboard</h1>
      <div className='the-big-class'>
        <div className="navbar-1">
          Chapitres
          {course && (
            <ul className="chapitre-list">
              {course.chapitres.map(chapitre => (
                <li key={chapitre._id} className={`chapitre ${selectedChapitre === chapitre ? 'active' : ''}`} onClick={() => handleChapitreClick(chapitre)}>
                  {chapitre.titre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="content-laser">
          {selectedChapitre && (
            <div className="chapitre-content">
              <h2>{selectedChapitre.titre}</h2>
              <div dangerouslySetInnerHTML={{ __html: selectedChapitre.content }}></div>
              {selectedChapitre.resources && selectedChapitre.resources.length > 0 && (
                <div className="resources">
                  <h3>Resources</h3>
                  <ul>
                    {selectedChapitre.resources.map(resource => (
                      <li key={resource._id}>
                        <a href={`http://localhost:4000/uploads/${resource.filename}`} download={resource.filename} className="download-button">
                          Download 
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
