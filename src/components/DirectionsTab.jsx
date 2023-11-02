// Style
import styled from "styled-components";

const DirectionsTab = ({ recipe }) => {
  return (
    <>
      <StyledDirections>
        <StyledList>
          {recipe.details.analyzedInstructions[0].steps.map((instruction) => (
            <li key={instruction.number}>{instruction.step}</li>
          ))}
        </StyledList>
      </StyledDirections>
    </>
  );
};

export default DirectionsTab;

const StyledDirections = styled.div`
  display: flex;
  align-items: start;
  margin-top: 3rem;
`;

const StyledList = styled.ol`
  padding-left: 1.5rem;
  margin-bottom: 2rem;

  li {
    margin-bottom: 1rem;
    font-family: "Maven Pro", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #333;
  }

  @media (max-width: 500px) {
    padding-left: 1rem;
    margin-bottom: 1.5rem;
    li {
      font-size: 0.9rem;
    }
  }
`;
