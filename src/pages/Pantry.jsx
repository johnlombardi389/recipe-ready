import { useState, useEffect } from "react";
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
      .post("ingredients/", data) // Use axiosInstance and remove the base URL
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
      <PageTitle>
        <h1>Your Virtual Pantry</h1>
      </PageTitle>
      {isLoggedIn ? (
        <>
          <StyledTitleSection>
            <div className="title">
              <p>Today is {formattedDate}</p>
            </div>
            <div className="add-butt">
              <IngredientModal newIngredient={newIngredient} />
            </div>
          </StyledTitleSection>

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

const PageTitle = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
  p {
    font-size: 1.2rem;
  }
`;

const IngredientsGrid = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
`;
