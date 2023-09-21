import { useState, useEffect } from "react";
import axios from "axios";

const Pantry = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios("http://localhost:8000/api/ingredients").then((response) => {
      setIngredients(response.data.ingredients);
    });
  }, []);

  return (
    <>
      <h1>This is the pantry page</h1>

      {ingredients ? (
        <ul>
          {ingredients.map((ingredient) => {
            return <p key={ingredient.id}>{ingredient.name}</p>;
          })}
        </ul>
      ) : (
        <p>There are no ingredients</p>
      )}
    </>
  );
};

export default Pantry;
