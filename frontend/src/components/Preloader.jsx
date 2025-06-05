// src/components/Preloader.jsx
import React, { useEffect, useState } from 'react';
import Logo from "../assets/Logo.svg";
import "../assets/css/Preloader.css"; // Import the CSS file

const Preloader = () => {
 
    const [fadeOut, setFadeOut] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 2000); // display for 2s
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
        <img src={Logo} alt="Clowder Logo" className="logo-animation" />
      </div>
    );
  };
  
  export default Preloader;