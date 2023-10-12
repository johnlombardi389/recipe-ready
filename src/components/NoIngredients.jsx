// Style
import styled from "styled-components";

const NoIngredients = () => {
  return (
    <StyledContainer>
      <StyledMessage>
        <p>No ingredients found</p>
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
  height: 100%;
`;

const StyledMessage = styled.div`
  p {
    font-size: 2rem;
  }
`;
