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
            <span className="measure">
              {selectedUnit === "metric"
                ? `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitLong}`
                : `${ingredient.measures.us.amount} ${ingredient.measures.us.unitLong}`}
            </span>
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
  align-items: start;
  margin-bottom: 1rem;
`;

const StyledTitle = styled.h3`
  font-family: "Cambay", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: blue;
`;

const UnitToggle = styled.div`
  button {
    margin-left: 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: transparent;
    cursor: pointer;
    font-family: "Maven Pro", sans-serif;
    font-weight: 400;
    font-size: 0.85rem;

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
    margin-bottom: 0.5rem;
    font-family: "Maven Pro", sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: #333;
    text-transform: capitalize;

    .measure {
      font-size: 0.9rem;
      font-weight: 400;
      color: black;
    }
  }
`;
