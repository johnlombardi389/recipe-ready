import { useState } from "react";
// Components
import DirectionsTab from "./DirectionsTab";
import IngredientsTab from "./IngredientsTab";
import SummaryTab from "./SummaryTab";
// Style
import styled from "styled-components";
import { IoTimer, IoPeople } from "react-icons/io5";
import { BiSolidFoodMenu } from "react-icons/bi";

const RecipeModal = ({ recipe, closeModal }) => {
  const [activeTab, setActiveTab] = useState("Summary");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>/g, "");
  };

  const missingIngredientCount = recipe.missedIngredients.length;
  return (
    <StyledModal>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <img src={recipe.details.image} alt={recipe.title} />

        <div className="info">
          <div className="names">
            <h2>{recipe.details.title}</h2>
            <p>
              by{" "}
              <a href={recipe.details.sourceUrl} target="_blank">
                {recipe.details.sourceName}
              </a>
            </p>
          </div>
          <div className="stats">
            <div className="stat">
              <BiSolidFoodMenu />
              <p>Need: {missingIngredientCount} Ingredients</p>
            </div>
            <div className="stat">
              <IoTimer />
              <p>{recipe.details.readyInMinutes} minutes</p>
            </div>
            <div className="stat">
              <IoPeople />
              <p>Serves {recipe.details.servings}</p>
            </div>
          </div>
        </div>

        <div className="tab-buttons">
          <button onClick={() => handleTabClick("Directions")}>
            Directions
          </button>
          <button onClick={() => handleTabClick("Ingredients")}>
            Ingredients
          </button>
          <button onClick={() => handleTabClick("Summary")}>Summary</button>
        </div>

        <div className="tab-content">
          {activeTab === "Directions" && <DirectionsTab recipe={recipe} />}
          {activeTab === "Ingredients" && <IngredientsTab recipe={recipe} />}
          {activeTab === "Summary" && <SummaryTab recipe={recipe} />}
        </div>

        {/* <p>Summary: {stripHtmlTags(recipe.details.summary)}</p> */}

        {/* <h3>Missing Ingredients:</h3>
        <ul>
          {recipe.missedIngredients ? (
            recipe.missedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))
          ) : (
            <li>No missing Ingredients</li>
          )}
        </ul> */}
      </div>
    </StyledModal>
  );
};

export default RecipeModal;

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;

  .modal-content {
    background-color: #fff;
    max-width: 60%;
    /* max-height: 80%; */
    height: 80vh;
    overflow-y: auto;
    padding: 2rem;
    /* border-radius: 5px; */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: relative;

    img {
      width: 100%;
      height: auto;
      flex-grow: 1;
      margin-bottom: 1rem;
    }

    .names {
      margin: 1rem 0 2rem 0;

      h2 {
        font-size: 1.3rem;
        margin-bottom: 0.25rem;
      }

      p {
        font-size: 0.9rem;
        color: grey;
        a {
          color: grey;
          text-decoration: underline;
          &:hover {
            color: blue;
          }
        }
      }
    }

    .stats {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 2rem;

      .stat {
        display: flex;
        align-items: center;
        p {
          margin-left: 0.25rem;
        }
      }
    }

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 24px;
      cursor: pointer;
    }
  }
`;
