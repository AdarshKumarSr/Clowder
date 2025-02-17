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
        console.log(response.data); // Log the response for debugging

        const { message, token, user } = response.data;
        alert(message); // Show success message

        // Store token and user data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/"); // Redirect to home
      }
    } catch (err) {
      console.error("Login error: ", err);
      if (err.response && err.response.data) {
        alert(err.response.data.message); // Show backend error message
      } else {
        alert("Login failed!"); // Default error message
      }
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
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
          <p>
            If you don't have an account, then what are you doing brokie? 
            <a href="/register"> Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
