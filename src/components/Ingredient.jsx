const Ingredient = ({ id, name, purchase_date, deleteIngredients }) => {
  const handleDelete = () => {
    deleteIngredients(id);
  };
  return (
    <>
      <div>
        <p>{name}</p>
        <p>{purchase_date}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
};

export default Ingredient;
