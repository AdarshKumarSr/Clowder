import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../api/api';
import '../assets/css/Login.css';


function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      if (response.status === 200) {
        // Successful response
        console.log(response.data); // Log the entire response to check token and user data

        const { message, token, user } = response.data;
        alert(message); // Alert the success message

        // If you get the token and user data, you can store the token
        localStorage.setItem("token", token); // Store token in localStorage
        localStorage.setItem("user", JSON.stringify(user)); // Optionally store user in localStorage

        
        navigate("/"); // Redirect to home after login
      }
    } catch (err) {
      console.error("Login error: ", err);
      if (err.response && err.response.data) {
        alert(err.response.data.message); // Alert error message from backend
      } else {
        alert("Login failed!"); // Default error message
      }
    }
  };

  return (
    
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
        <p>if you dont have an account, then what are doing brokie <a href="/register">Register</a></p>
      </form>
    </div>
  );
}

export default Login;