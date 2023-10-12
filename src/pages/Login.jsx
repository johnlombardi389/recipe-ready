import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";
// Style
import styled from "styled-components";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { isLoggedIn, login, logout } = useAuth();
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

        // Update the login function to include the access token
        login(access);

        localStorage.setItem("refresh_token", refresh);

        axios
          .get("http://localhost:8000/api/user/", {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          })
          .then((userResponse) => {
            const { id } = userResponse.data;
            localStorage.setItem("user_id", id);
            // redirect
            navigate("/pantry");
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

    logout();
    navigate("/");
  };

  return (
    <LoginContainer>
      {!isLoggedIn ? (
        <StyledForm onSubmit={handleSubmit}>
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
          <Link className="register" to="/register">
            Don't have an account? Sign up here
          </Link>
        </StyledForm>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  max-width: 300px;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0.5rem 0 1.5rem 0;
  }

  button {
    background-color: #0073e6;
    color: white;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 1rem 0;
  }

  .register {
    text-align: center;
    color: grey;
    &:hover {
      color: black;
    }
  }
`;
