import { useState, useEffect } from "react";
import axios from "axios";
// Style
import styled from "styled-components";
// Components
import Ingredient from "../components/Ingredient";
import IngredientModal from "../components/IngredientModal";

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
      <StyledTitleSection>
        <div className="title">
          <h2>Your Virtual Pantry</h2>
        </div>
        <div className="add-butt">
          <IngredientModal />
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
