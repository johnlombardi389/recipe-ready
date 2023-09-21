import { useState, useEffect } from "react";
import axios from "axios";
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
        <>
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
        </>
      ) : (
        <p>There are no ingredients</p>
      )}
    </>
  );
};

export default Pantry;
