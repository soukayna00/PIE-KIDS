import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBookOpen, faGift, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
// import './sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="brand">
        <h2>student Portal</h2> {/* Change the name here */}
      </div>
      <ul>
        <li><a href="/student"><FontAwesomeIcon icon={faChartLine} /> Dashboard</a></li>
        <li><a href="/courses"><FontAwesomeIcon icon={faBookOpen} /> My Courses</a></li>
        {/* <li><a href="/activities"><FontAwesomeIcon icon={faGift} /> Activities</a></li> */}
        <li><a href="/student/quiz"><FontAwesomeIcon icon={faQuestionCircle} /> Quizzes</a></li>
      </ul>
      <div className="upgrade">
        <button>Get Pro Now</button>
      </div>
    </nav>
  );
};

export default Sidebar;
