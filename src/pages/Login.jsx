import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";
// Style
import styled from "styled-components";
import dinner from "../assets/dinner.jpg";
import recipebook2 from "../assets/recipebook2.jpg";

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
      .post("http://localhost:8000/api/login/", credentials)
      .then((response) => {
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

            navigate("/recipe-ready/pantry");
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
    navigate("/recipe-ready");
  };

  return (
    <>
      <Brand>
        <h1>Recipe Ready</h1>
        <p>
          Effortlessly organize your kitchen, get instant recipes tailored to
          your ingredients, and cut food waste while elevating your culinary
          journey
        </p>
      </Brand>
      <LoginContainer>
        {!isLoggedIn ? (
          <>
            <SidesContainer>
              <div className="left-side">
                <ImageWrapper>
                  <img src={recipebook2} alt="Recipe book and ingredients" />
                </ImageWrapper>
              </div>
              <div className="right-side">
                <StyledForm onSubmit={handleSubmit}>
                  <FormWrapper>
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
                    <button type="submit">Log In</button>
                    <Link className="register" to="/register">
                      Don't have an account? Sign up
                    </Link>
                  </FormWrapper>
                </StyledForm>
              </div>
            </SidesContainer>
          </>
        ) : (
          <LogoutWrapper>
            <h2>Enjoy your meal</h2>

            <button onClick={handleLogout}>Log Out</button>

            <img src={dinner} alt="Family Dinner" />
          </LogoutWrapper>
        )}
      </LoginContainer>
    </>
  );
};

export default Login;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 1.5rem;
    color: #212429;
    font-family: "Cambay", sans-serif;
    font-weight: 700;
  }
  p {
    font-size: 1rem;
    font-family: "Mukta Vaani", sans-serif;
    font-weight: 400;
    text-align: center;
    padding: 1rem;
    color: #495057;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem auto;
  max-width: 1000px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
  overflow: hidden;

  @media (max-width: 700px) {
    max-width: 350px;
    height: 50vh;
  }
`;

const SidesContainer = styled.div`
  display: flex;
  .left-side {
    flex: 1;
  }
  .right-side {
    flex: 1;
    background-color: #fff;
    border-radius: 0 0.5rem 0.5rem 0;
  }
  @media (max-width: 700px) {
    .left-side {
      display: none;
    }
  }
`;

const ImageWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  label {
    font-family: "Mukta Vaani", sans-serif;
    font-size: 0.95rem;
    font-weight: 200;
  }

  input {
    width: 100%;
    border: 1.25px solid #ccc;
    border-radius: 0.5rem;
    margin: 0.25rem 0 1.5rem 0;
    padding: 0.75rem;
    font-family: "Maven Pro", sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }

  button {
    background-color: #2368a2;
    color: white;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 1rem 0;
    width: 100%;
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s;
    &:hover {
      background-color: #194870;
    }
  }

  .register {
    text-align: center;
    color: grey;
    font-family: "Maven Pro", sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    &:hover {
      color: black;
    }
  }
`;

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 2rem;
    color: #212429;
    font-family: "Cambay", sans-serif;
    font-weight: 700;
    padding: 2rem;
  }
  @media (max-width: 1000px) {
    h1 {
      font-size: 1.5rem;
    }
  }

  button {
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.3s;
    background-color: #589fdb;
    color: white;
    border: none;
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
    &:hover {
      background-color: #2979bc;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
    margin-top: 2rem;
  }
`;
