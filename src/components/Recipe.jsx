import { useState } from "react";
// Style
import styled from "styled-components";

const Recipe = ({ recipe, openRecipe }) => {
  const missingIngredientCount = recipe.missedIngredients.length;
  return (
    <>
      <StyledRecipe onClick={() => openRecipe(recipe)}>
        {recipe.image && <img src={recipe.image} alt={recipe.title} />}
        <h3>{recipe.title}</h3>
        <div className="details">
          <p>Ingredients Needed: {missingIngredientCount}</p>
          {/* <p>Have: {recipe.usedIngredientCount} Ingredients </p> */}
        </div>
      </StyledRecipe>
    </>
  );
};

export default Recipe;

const StyledRecipe = styled.div`
  background-color: #edf1f5;
  border: 1px solid #d3dce8;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  img {
    max-width: 100%;
    height: auto;
    flex-grow: 1;
    margin-bottom: 1rem;
  }

  h3 {
    font-family: "Cambay", sans-serif;
    font-size: 1rem;
    font-weight: 700;
    padding: 0 0.5rem;
    color: #11253e;
  }

  .details {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    font-family: "Mukta Vaani", sans-serif;
    font-size: 0.95rem;
    font-weight: 200;
    color: #617691;
  }
`;
