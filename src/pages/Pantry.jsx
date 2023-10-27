import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { useAuth } from "../../AuthContext";
// Style
import styled from "styled-components";
// Pages
import Login from "./Login";
// Components
import Ingredient from "../components/Ingredient";
import IngredientModal from "../components/IngredientModal";
import NoIngredients from "../components/NoIngredients";

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
      .post("ingredients/", data)
      .then((response) => {
        fetchIngredients(); // Refresh the ingredient list
      })
      .catch((error) => {
        console.error("Error adding ingredient:", error);
        console.log(error.response.data);
      });
  };

  const todaysDate = new Date();
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = todaysDate.toLocaleDateString(undefined, dateOptions);

  return (
    <>
      {isLoggedIn ? (
        <>
          <StyledTitleSection>
            <div className="date">
              <p>Today is {formattedDate}</p>
            </div>
            <div className="btns">
              <Link to={"/recipes"} className="recipe-btn">
                Find Recipes
              </Link>

              <IngredientModal newIngredient={newIngredient} />
            </div>
          </StyledTitleSection>

          <PantryTitle>
            <h1>Your Pantry</h1>
          </PantryTitle>

          {ingredients.length != 0 ? (
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
            <NoIngredients />
          )}
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Pantry;

const StyledTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 1rem;
  p {
    font-size: 1.2rem;
  }
  .date {
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: #495057;
  }
  .btns {
    display: flex;
    align-items: center;

    .recipe-btn {
      padding: 0.5rem 1rem;
      text-decoration: none;
      margin-right: 1rem;
      background-color: #589fdb;
      color: white;
      padding: 0.25rem 1rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-family: "Mukta Vaani", sans-serif;
      font-size: 1rem;
      font-weight: 400;
      transition: all 0.3s;
      &:hover {
        background-color: #2979bc;
      }
    }
  }
`;

const PantryTitle = styled.div`
  text-align: center;
  h1 {
    font-size: 2rem;
    color: #212429;
    font-family: "Cambay", sans-serif;
    font-weight: 700;
  }
`;

const IngredientsGrid = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
  max-width: 1600px;
  margin: 0 auto;
`;
