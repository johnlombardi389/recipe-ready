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
        <div className="ing-titles">
          <p className="ing-name">{name}</p>
        </div>
        <div className="ing-butts">
          {/* <button className="del-btn" onClick={handleDelete}>
            Delete
          </button> */}
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
    .del-btn {
      background: none;
      border: none;
      color: #f4b183;
      text-decoration: underline;
      font-size: 0.75rem;
      cursor: pointer;
    }
  }
`;
