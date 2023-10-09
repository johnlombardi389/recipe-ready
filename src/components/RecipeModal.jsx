const RecipeModal = ({ recipe, closeModal }) => {
  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
        <h2>{recipe.details.title}</h2>
        <img src={recipe.details.image} alt={recipe.title} />
        <p>Likes: {recipe.details.likes}</p>
        <p>Time: {recipe.details.readyInMinutes}</p>
        <p>Servings: {recipe.details.servings}</p>
        <p>Credits: {recipe.details.creditsText}</p>
        <p>Summary: {stripHtmlTags(recipe.details.summary)}</p>
        <p>Instructions: {recipe.details.instructions}</p>
        <h3>Missing Ingredients:</h3>
        <ul>
          {recipe.missedIngredients ? (
            recipe.missedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))
          ) : (
            <li>No missing Ingredients</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecipeModal;
