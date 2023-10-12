// Style
import styled from "styled-components";

const NoIngredients = () => {
  return (
    <StyledContainer>
      <StyledMessage>
        <h3>No ingredients found</h3>
        <p>
          Get started by clicking the "+ Add Ingredient" button in the top right
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
  height: 50vh;
  background-color: grey;
  margin: 2rem auto;
  border-radius: 2rem;
`;

const StyledMessage = styled.div`
  text-align: center;
  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;
