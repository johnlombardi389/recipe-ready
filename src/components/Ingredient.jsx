// Style
import styled from "styled-components";

const Ingredient = ({ id, name, purchase_date, deleteIngredients }) => {
  const handleDelete = () => {
    deleteIngredients(id);
  };
  return (
    <>
      <StyledIngredient>
        <p>{name}</p>
        <p>{purchase_date}</p>
        <button onClick={handleDelete}>Delete</button>
      </StyledIngredient>
    </>
  );
};

export default Ingredient;

const StyledIngredient = styled.div`
  background-color: pink;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
