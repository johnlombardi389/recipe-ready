import { useState } from "react";
// Style
import styled from "styled-components";

const IngredientsTab = ({ recipe }) => {
  const [selectedUnit, setSelectedUnit] = useState("metric");

  const toggleUnit = (unit) => {
    setSelectedUnit(unit);
  };

  return (
    <>
      <StyledIngs>
        <StyledTitle>Recipe Ingredients</StyledTitle>
        <UnitToggle>
          <button
            onClick={() => toggleUnit("metric")}
            className={selectedUnit === "metric" ? "active" : ""}
          >
            Metric
          </button>
          <button
            onClick={() => toggleUnit("us")}
            className={selectedUnit === "us" ? "active" : ""}
          >
            US
          </button>
        </UnitToggle>
      </StyledIngs>

      <StyledList>
        {recipe.details.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}:{" "}
            {selectedUnit === "metric"
              ? `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitLong}`
              : `${ingredient.measures.us.amount} ${ingredient.measures.us.unitLong}`}
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

const StyledIngs = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledTitle = styled.h3`
  font-size: 1.2rem;
`;

const UnitToggle = styled.div`
  button {
    margin-left: 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: transparent;
    cursor: pointer;

    &.active {
      background-color: #ccc;
    }
  }
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
