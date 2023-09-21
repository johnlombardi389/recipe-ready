import { useState, useEffect } from "react";
import axios from "axios";

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
        <ul>
          {ingredients.map((ingredient) => {
            return (
              <div key={ingredient.id}>
                <p>{ingredient.name}</p>
                <p>{ingredient.purchase_date}</p>
                <button onClick={() => deleteIngredients(ingredient.id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      ) : (
        <p>There are no ingredients</p>
      )}
    </>
  );
};

export default Pantry;
