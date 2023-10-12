import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { useAuth } from "../../AuthContext";
// Style
import styled from "styled-components";
// Components
import Ingredient from "../components/Ingredient";
import IngredientModal from "../components/IngredientModal";

const Pantry = () => {
  const { isLoggedIn } = useAuth();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchIngredients();
    }
  }, [isLoggedIn]);

  const fetchIngredients = () => {
    axiosInstance
      .get("ingredients/")
      .then((response) => {
        setIngredients(response.data.ingredients);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
        console.log(error.response.data);
      });
  };

  const deleteIngredients = (id) => {
    axiosInstance
      .delete(`ingredients/${id}`) // Use axiosInstance and remove the base URL
      .then(() => {
        // After successful deletion, refresh the ingredients list
        fetchIngredients();
      })
      .catch((error) => {
        console.error("Error deleting ingredient:", error);
        console.log(error.response.data);
      });
  };

  const newIngredient = (name) => {
    addIngredient(name);
  };

  const addIngredient = (newIngredient) => {
    const userId = localStorage.getItem("user_id");
    const data = { name: newIngredient, user: userId };

    axiosInstance
      .post("ingredients/", data) // Use axiosInstance and remove the base URL
      .then((response) => {
        fetchIngredients(); // Refresh the ingredient list
      })
      .catch((error) => {
        console.error("Error adding ingredient:", error);
        console.log(error.response.data);
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <StyledTitleSection>
            <div className="title">
              <h2>Your Virtual Pantry</h2>
            </div>
            <div className="add-butt">
              <IngredientModal newIngredient={newIngredient} />
            </div>
          </StyledTitleSection>

          {ingredients ? (
            <IngredientsGrid>
              {ingredients.map((ingredient) => (
                <Ingredient
                  key={ingredient.id}
                  id={ingredient.id}
                  name={ingredient.name}
                  purchase_date={ingredient.purchase_date}
                  deleteIngredients={deleteIngredients}
                  fetchIngredients={fetchIngredients}
                />
              ))}
            </IngredientsGrid>
          ) : (
            <p>There are no ingredients</p>
          )}
        </>
      ) : (
        <p>Please login</p>
      )}
    </>
  );
};

export default Pantry;

const StyledTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
`;

const IngredientsGrid = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
`;

{
  /* <StyledTitleSection>
        <div className="title">
          <h2>Your Virtual Pantry</h2>
        </div>
        <div className="add-butt">
          <IngredientModal newIngredient={newIngredient} />
        </div>
      </StyledTitleSection>

      {ingredients ? (
        <IngredientsGrid>
          {ingredients.map((ingredient) => {
            return (
              <Ingredient
                key={ingredient.id}
                id={ingredient.id}
                name={ingredient.name}
                purchase_date={ingredient.purchase_date}
                deleteIngredients={deleteIngredients}
                fetchIngredients={fetchIngredients}
              />
            );
          })}
        </IngredientsGrid>
      ) : (
        <p>There are no ingredients</p>
      )} */
}
