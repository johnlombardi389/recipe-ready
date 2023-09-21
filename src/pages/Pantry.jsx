import { useState, useEffect } from "react";
import axios from "axios";
// Style
import styled from "styled-components";
// Components
import Ingredient from "../components/Ingredient";

const Pantry = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = () => {
    axios("http://localhost:8000/api/ingredients/")
      .then((response) => {
        setIngredients(response.data.ingredients);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
      });
  };

  const deleteIngredients = (id) => {
    axios
      .delete(`http://localhost:8000/api/ingredients/${id}`)
      .then(() => {
        // After successful deletion, refresh the ingredients list
        fetchIngredients();
      })
      .catch((error) => {
        console.error("Error deleting ingredient:", error);
      });
  };

  return (
    <>
      <h1>This is the pantry page</h1>

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
              />
            );
          })}
        </IngredientsGrid>
      ) : (
        <p>There are no ingredients</p>
      )}
    </>
  );
};

export default Pantry;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
`;
