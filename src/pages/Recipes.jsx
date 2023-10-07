import { useState } from "react";
import axios from "axios";
// Style
import styled from "styled-components";

const Recipes = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}`
      );

      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Recipes</h1>

      <div>
        <h1>Recipe Search</h1>
        <div>
          <label htmlFor="ingredients">
            Enter Ingredients (comma-separated):
          </label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Recipes;
