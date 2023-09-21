// Style
import styled from "styled-components";

const Ingredient = ({ id, name, purchase_date, deleteIngredients }) => {
  const handleDelete = () => {
    deleteIngredients(id);
  };
  return (
    <>
      <StyledIngredient>
        <div className="ing-titles">
          <p className="ing-name">{name}</p>
          <p>{purchase_date}</p>
        </div>
        <div className="ing-butts">
          <button onClick={handleDelete}>Delete</button>
          <button>Edit</button>
        </div>
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

  .ing-titles {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ing-name {
      font-size: 1.25rem;
    }
  }

  .ing-butts {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
`;
