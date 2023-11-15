import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// Style
import styled from "styled-components";
import groceryone from "../assets/grocery1.jpg";

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
      .post("http://john389.pythonanywhere.com/api/register/", formData)
      .then((response) => {
        // Handle successful registration
        const { access, refresh } = response.data;

        // Save access token to local storage
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        console.log("Registration successful", response.data);
        navigate("/recipe-ready");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
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
      <RegisterContainer>
        <SidesContainer>
          <div className="left-side">
            <ImageWrapper>
              <img src={groceryone} alt="vegetables" />
            </ImageWrapper>
          </div>
          <div className="right-side">
            <StyledForm onSubmit={handleSubmit}>
              <FormWrapper>
                <div className="input-div">
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
                <div className="input-div">
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
                <div className="input-div">
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
                <button type="submit">Sign Up</button>
                <Link className="register" to="/">
                  Already have an account? Log in
                </Link>
              </FormWrapper>
            </StyledForm>
          </div>
        </SidesContainer>
      </RegisterContainer>
    </>
  );
};

export default Register;

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

const RegisterContainer = styled.div`
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
    height: 70vh;
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
  .input-div {
    width: 100%;
  }
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
