// Style
import styled from "styled-components";

const NoIngredients = () => {
  return (
    <StyledMessage>
      <p>No ingredients found.</p>
    </StyledMessage>
  );
};

export default NoIngredients;

const StyledMessage = styled.div`
  p {
    font-size: 2rem;
  }
`;
