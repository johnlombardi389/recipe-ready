// Style
import styled from "styled-components";

const IngredientsTab = ({ recipe }) => {
  return (
    <>
      <StyledTitle>Recipe Ingredients</StyledTitle>
      <StyledList>
        {recipe.details.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}: {ingredient.measures.metric.amount}
            {ingredient.measures.metric.unitLong}
          </li>
        ))}
      </StyledList>

      <StyledTitle>You Need to Get</StyledTitle>
      <StyledList>
        {recipe.missedIngredients ? (
          recipe.missedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))
        ) : (
          <li>No missing Ingredients</li>
        )}
      </StyledList>
    </>
  );
};

export default IngredientsTab;

const StyledTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const StyledList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 2rem;

  li {
    margin-bottom: 0.25rem;
    font-size: 1rem;
    color: #333;
    text-transform: capitalize;
  }
`;
