// Style
import styled from "styled-components";

const NoIngredients = () => {
  return (
    <StyledContainer>
      <StyledMessage>
        <h3>No ingredients found</h3>
        <p className="first-text">
          Get started by clicking the "Add Ingredient" button
        </p>
        <p className="second-text">
          We'll help you manage all of the ingredients in your kitchen here and
          then suggest recipes based on what you have
        </p>
      </StyledMessage>
    </StyledContainer>
  );
};

export default NoIngredients;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90vw;
  max-width: 1000px;
  height: 50vh;
  background-color: rgba(0, 0, 0, 0.15);
  margin: 2rem auto;
  border-radius: 2rem;
  padding: 5rem;
  @media (max-width: 1000px) {
    padding: 1rem;
  }
`;

const StyledMessage = styled.div`
  text-align: center;
  h3 {
    font-size: 2rem;
    color: black;
    font-family: "Cambay", sans-serif;
    font-weight: 700;
  }
  .first-text {
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.75);
  }
  .second-text {
    margin-top: 2rem;
    font-family: "Mukta Vaani", sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.5);
  }
  @media (max-width: 1000px) {
    h3 {
      font-size: 1.5rem;
    }
    .first-text {
      font-size: 0.95rem;
    }
    .second-text {
      font-size: 0.85rem;
    }
  }
`;
