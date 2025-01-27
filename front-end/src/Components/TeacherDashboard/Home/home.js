import React from 'react';
import Sidebar from '../Sidebar/sidebar';
import Header from '../Header/header';
import Stats from '../Stats/stats';
// import Earnings from '../Earnings/earning';
import TopCourses from '../TopCourses/topCourses';
import StudentLocations from '../StudentLocation/studentLocations';
import './home.css';

const Home = () => {
  return (
    <div className="containerrs">
      <Sidebar />
      <main className="content">
        <Header />
        <Stats />
        <div className="details">
          {/* <Earnings /> */}
          <TopCourses />
          <StudentLocations />
        </div>
      </main>
    </div>
  );
};

export default Home;
