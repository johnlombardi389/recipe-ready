import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";
// Style
import styled from "styled-components";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/login/", credentials) // Updated endpoint
      .then((response) => {
        // save access token to local storage
        const { access, refresh } = response.data;
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        // update user auth state
        login();

        axios
          .get("http://localhost:8000/api/user/", {
            headers: {
              Authorization: `Bearer ${access}`, // Include the access token in the request headers
            },
          })
          .then((userResponse) => {
            const { id } = userResponse.data;
            localStorage.setItem("user_id", id); // Save the user's ID in local storage

            // redirect
            navigate("/");
          })
          .catch((error) => {
            console.error("Error getting user information:", error);
          });
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");

    // update user auth state
    logout();

    navigate("/");
  };

  return (
    <>
      {user.isAuthenticated ? <h1>Logout</h1> : <h2>Login</h2>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Login;
