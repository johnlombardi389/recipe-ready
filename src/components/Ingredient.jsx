// Components
import EditIngredientModal from "./EditIngredientMOdal";
// Style
import styled from "styled-components";

const Ingredient = ({
  id,
  name,
  purchase_date,
  deleteIngredients,
  fetchIngredients,
}) => {
  const handleDelete = () => {
    deleteIngredients(id);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formattedPurchaseDate = formatDate(purchase_date);

  return (
    <>
      <StyledIngredient>
        <p className="ing-name">{name}</p>

        <div className="ing-details">
          <p>{formattedPurchaseDate}</p>
          <EditIngredientModal
            id={id}
            ingName={name}
            purchase_date={purchase_date}
            deleteIngredients={deleteIngredients}
            fetchIngredients={fetchIngredients}
          />
        </div>
      </StyledIngredient>
    </>
  );
};

export default Ingredient;

const StyledIngredient = styled.div`
  background-color: white;
  /* padding: 10px; */
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  .ing-name {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem 0 1rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-family: "Cambay", sans-serif;
    font-weight: 700;
    color: black;
  }

  .ing-details {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem 0.5rem 1rem;
    p {
      font-size: 0.85rem;
      color: grey;
      font-family: "Mukta Vaani", sans-serif;
      font-weight: 400;
    }
  }
`;
