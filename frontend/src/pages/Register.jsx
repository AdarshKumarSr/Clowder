// src/pages/Register.jsx
import React, { useState } from 'react';
import API from '../api/api';  // Import your API file
import '../assets/css/Registration.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/register', formData);  // Correct API endpoint
      alert(response.data.message);  // Success message from backend
      
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Registration failed.');  // Error message
    }
  };

  return (
    <div id="form-container">

      <h2 id='h2-text'>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button id='btn-register' type="submit">Register</button>
        <p>if you have an account, then what are doing brokie <a href="/Login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;