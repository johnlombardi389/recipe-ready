import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { useAuth } from "../../AuthContext";
// Components
import Recipe from "../components/Recipe";
import RecipeModal from "../components/RecipeModal";
import FirstTime from "../components/FirstTime";
// Pages
import Login from "./Login";
// Style
import styled from "styled-components";

const Recipes = () => {
  const { isLoggedIn } = useAuth();
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterByMin, setFilterByMin] = useState(true);

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  useEffect(() => {
    if (isLoggedIn) {
      fetchIngredients();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log(ingredients);
    handleSearch();
  }, [ingredients, filterByMin]);

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
      const rankingParam = filterByMin ? "&ranking=2" : "";
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=35&ignorePantry=true${rankingParam}`
      );

      setRecipes(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = async (recipe) => {
    try {
      const apiUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
      const response = await axios.get(apiUrl);

      // Combine missing ingredients from the first API call with the details from the second API call
      const combinedRecipeData = {
        ...recipe,
        details: response.data,
      };

      setSelectedRecipe(combinedRecipeData);
      setModalOpen(true);
      console.log(combinedRecipeData);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {ingredients.length != 0 ? (
            <>
              <div>
                {loading && <LoadingMessage>Loading...</LoadingMessage>}

                <RecipesGrid>
                  {recipes.map((recipe) => (
                    <Recipe
                      key={recipe.id}
                      recipe={recipe}
                      openRecipe={handleRecipeClick}
                    />
                  ))}
                </RecipesGrid>

                {modalOpen && selectedRecipe && (
                  <RecipeModal
                    recipe={selectedRecipe}
                    closeModal={() => setModalOpen(false)}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <FirstTime />
            </>
          )}
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Recipes;

const RecipesGrid = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
`;

const LoadingMessage = styled.p`
  font-size: 2rem;
  text-align: center;
  margin-top: 3rem;
  font-family: "Cambay", sans-serif;
  font-weight: 700;
  color: #212429;
`;
