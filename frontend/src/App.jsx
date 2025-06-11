// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Course from './pages/Course/Course';
// import Course01 from './pages/Course01';
// import IndexPage from './pages/Course02';
// import DynamicCourseBuilder from './pages/Course03';
import Compiler from './pages/Compiler';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CP_Compiler from './pages/CP_Compiler';
import DSA_Page from './pages/DSA';
import Preloader from './components/Preloader'; // 👈 import preloader
import CoursePage from './pages/CoursePage';
import Profile from './pages/Profile';
import "../src/assets/css/main.css"


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800); // 2.8s total
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <Router>
      <div className='main'>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/create-course" element={<Course01 />} /> */}
          {/* <Route path="/create-course02" element={<IndexPage />} /> */}
          {/* <Route path="/create-course03" element={<DynamicCourseBuilder />} /> */}
          <Route path="/courses" element={<Course />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/cp_compiler/:problem_no" element={<CP_Compiler />} />
          <Route path='/dsa' element={<DSA_Page />} />
          <Route path='/course/:courseId/page/:pageNumber' element={<CoursePage />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
