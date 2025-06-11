import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/CLOWDER.png';

function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/compiler">Compiler</Link></li>
        <li><Link to="/courses">Course</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <div className="auth-links">
        <Link to="/create-course">Build Course</Link>

        {token ? (
          <button onClick={handleLogout} className="text-red-600 font-semibold ml-4">
            Logout
          </button>
        ) : (
          <Link to="/login" className="ml-4">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
