import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTachometerAlt, faBook, faPlusCircle, faUserGraduate, faQuestionCircle, faVial } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css'



const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="brand">
        <h2>Teacher Dashboard</h2>
      </div>
      <ul>
        <li><a href="/home"><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</a></li>
        <li><a href="/cours"><FontAwesomeIcon icon={faBook} /> My Courses</a></li>
        <li><a href="/cours/Add_course"><FontAwesomeIcon icon={faPlusCircle} /> Add Course</a></li>
        {/* <li><a href="/etudiants"><FontAwesomeIcon icon={faUserGraduate} /> My Students</a></li> */}
        <li><a href="/quiz"><FontAwesomeIcon icon={faQuestionCircle} /> Quizes</a></li>
      </ul>
      <div className="upgrade">
        {/* <button>Get Pro Now</button> */}
      </div>
    </nav>
  );
};

export default Sidebar;
