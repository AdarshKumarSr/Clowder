// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Course from './pages/Course';
import Compiler from './pages/Compiler'; // Importing Compiler page
import Nav from './components/Nav'; // Importing Nav component
import Footer from './components/Footer'; // Importing Footer component
import CP_Compiler from './pages/CP_Compiler';

const App = () => {
  return (
    <Router>
      <div>
        <Nav /> {/* Navigation bar */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/cp_compiler/:problem_no" element={<CP_Compiler />} />
        </Routes>

        <Footer /> {/* Footer */}
      </div>
    </Router>
  );
};

export default App;
