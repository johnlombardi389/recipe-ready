import React from "react";

const DirectionsTab = ({ recipe }) => {
  return (
    <>
      <div>
        <ul>
          {recipe.details.analyzedInstructions[0].steps.map((instruction) => (
            <li key={instruction.number}>{instruction.step}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DirectionsTab;
