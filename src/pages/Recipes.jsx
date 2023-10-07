import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
// Style
import styled from "styled-components";

const Recipes = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  const fetchIngredients = () => {
    axiosInstance
      .get("ingredients/")
      .then((response) => {
        const ingredientNames = response.data.ingredients
          .map((ingredient) => ingredient.name)
          .join(",");
        setIngredients(ingredientNames);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
        console.log(error.response.data);
      });
  };

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
            <StyledRecipe key={recipe.id}>
              <p>{recipe.title}</p>
              <ul>
                <li>Missing Ingredients:</li>
                {recipe.missedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))}
              </ul>
            </StyledRecipe>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Recipes;

const StyledRecipe = styled.div`
  margin-top: 2rem;
`;
