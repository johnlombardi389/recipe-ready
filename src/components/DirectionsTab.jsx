// Style
import styled from "styled-components";

const DirectionsTab = ({ recipe }) => {
  // const createMarkup = (html) => {
  //   return { __html: html };
  // };
  return (
    <>
      {/* <div
        dangerouslySetInnerHTML={createMarkup(recipe.details.instructions)}
      /> */}

      <StyledDirections>
        <ul>
          {recipe.details.analyzedInstructions[0].steps.map((instruction) => (
            <li key={instruction.number}>{instruction.step}</li>
          ))}
        </ul>
      </StyledDirections>
    </>
  );
};

export default DirectionsTab;

const StyledDirections = styled.div`
  font-size: 1rem;
`;
