import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Style
import styled from "styled-components";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/register/", formData) // Registration endpoint
      .then((response) => {
        // Handle successful registration
        const { access, refresh } = response.data;

        // Save access token to local storage
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        // Redirect or perform any other action you need after registration
        console.log("Registration successful", response.data);
        // redirect
        navigate("/pantry");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
