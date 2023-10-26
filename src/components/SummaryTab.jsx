// Style
import styled from "styled-components";

const SummaryTab = ({ recipe }) => {
  // const createMarkup = (html) => {
  //   return { __html: html };
  // };

  const instructions = recipe.details.instructions
    .split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  return (
    <>
      {/* <div
        dangerouslySetInnerHTML={createMarkup(recipe.details.instructions)}
      /> */}
      <StyledSummary>{instructions}</StyledSummary>
    </>
  );
};

export default SummaryTab;

const StyledSummary = styled.div`
  p {
    margin-top: 0.5rem;
  }
`;
