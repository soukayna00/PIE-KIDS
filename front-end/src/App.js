import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
import Register from './Components/Register/Register';

//homepage
import Hero from './Components/Hero/hero';
import Home from './Components/TeacherDashboard/Home/home';
import Courses from './Components/TeacherDashboard/Courses/courses';
import Footer from './Components/Footer/Footer';

import AddCourses from './Components/TeacherDashboard/Courses/AddCourses';
import DetailCourses from './Components/TeacherDashboard/Courses/DetailCourses';
import EditCourse from './Components/TeacherDashboard/Courses/EditCourse';
import QuizForm from './Components/TeacherDashboard/Quiz/quiz';
import Login from './Components/Login/login';
import Student from './Components/StudentDashboard/HomeStudent/student';
import AllCourses from './Components/AllCourses/AllCourses';
import Enroll from './Components/StudentDashboard/EnRoll/EnRoll';
import TeachWithUs from './Components/TeachWithUs/TeachWithUs';
import RegisterEnseignant from './Components/TeacherDashboard/RegisterEnseignant/RegisterEnseignant';
import CourseDashboard from './Components/CourseDahboard/courseDashboard';
import Quiz from './Components/StudentDashboard/Quiz/quiz'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* homepage */}
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         {/* Teacher dashboard */}
        <Route path="/home" element={<Home />} /> 
        <Route path="/cours" element={<Courses />} />
        <Route path="/cours/add_course" element={<AddCourses />} />
        <Route path="/cours/detailCourse/:id" element={<DetailCourses />} />
        <Route path="/quiz" element={<QuizForm />} />
        <Route path="/cours/editCourse/:courseId" element={<EditCourse />} />
        <Route path="/register-enseignant" element={<RegisterEnseignant />} />
        
        {/* Student dashboard */}
        <Route path="/student" element={<Student />} /> 
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/enroll/:id" element={<Enroll />} />
        <Route path="/TeachWithUs" element={<TeachWithUs />} />
        <Route path="/student/quiz" element={<Quiz />} />


        {/* <Route path="/test" element={<test />} /> */}

         <Route path="/courses/:id/dashboard" element={<CourseDashboard />} />



      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
