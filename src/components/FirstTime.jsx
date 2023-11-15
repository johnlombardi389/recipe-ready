import { Link } from "react-router-dom";
// Style
import styled from "styled-components";
import recipebook from "../assets/recipebook.jpg";

const FirstTime = () => {
  return (
    <>
      <StyledContainer>
        <h3>Tell us what you have</h3>

        <p>
          We can't recommend recipes until we know what is in your kitchen, add
          some ingredients and then we'll help you see what you can make right
          now!
        </p>

        <Link to="/recipe-ready/pantry" className="pantry-btn">
          Update Your Pantry
        </Link>

        <img src={recipebook} alt="Recipe book" />
      </StyledContainer>
    </>
  );
};

export default FirstTime;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 1rem;

  h3 {
    font-size: 1.5rem;
    color: #212429;
    font-family: "Cambay", sans-serif;
    font-weight: 700;
  }

  p {
    text-align: center;
    margin: 1rem;
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: #495057;
  }

  .pantry-btn {
    padding: 0.5rem 1rem;
    text-decoration: none;
    margin-right: 1rem;
    margin-top: 2rem;
    background-color: #589fdb;
    color: white;
    padding: 0.25rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    transition: all 0.3s;
    &:hover {
      background-color: #2979bc;
    }
  }

  img {
    max-width: 1000px;
    width: 100%;
    height: auto;
    margin-top: 2rem;
  }
`;
