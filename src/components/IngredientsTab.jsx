import React from "react";

const IngredientsTab = ({ recipe }) => {
  return (
    <>
      <h3>Missing Ingredients:</h3>
      <ul>
        {recipe.missedIngredients ? (
          recipe.missedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))
        ) : (
          <li>No missing Ingredients</li>
        )}
      </ul>
    </>
  );
};

export default IngredientsTab;
