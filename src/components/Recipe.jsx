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
          <p>You Need: {missingIngredientCount} Ingredients</p>
          <p>Likes: {recipe.likes}</p>
        </div>
      </StyledRecipe>
    </>
  );
};

export default Recipe;

const StyledRecipe = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    max-width: 100%;
    height: auto;
    flex-grow: 1;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .details {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
  }
`;
