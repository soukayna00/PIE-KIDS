import React from 'react';
import Sidebar from '../Sidebar/sidebar';
import Header from '../Header/header';

import './student.css';

const Student = () => {
  return (
    <div className="container-st">
      <Sidebar />
      <main className="content">
        <Header />
      
         
      </main>
    </div>
  );
};

export default Student;
