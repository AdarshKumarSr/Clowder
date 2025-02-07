import React from 'react';
import { Link } from 'react-router-dom';  
import Logo from '../assets/CLOWDER.png';

function Nav() {
  return (
    <nav className="navbar">
      <div className="logo"><img src={Logo} alt="" /></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/compiler">Compiler</Link></li>
        <li><Link to="/courses">Course</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <div className="auth-links">
        <Link to="/login">Login</Link>
        
      </div>
    </nav>
  );
}

export default Nav;