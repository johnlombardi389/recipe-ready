import { useState } from "react";
// Components
import NutritionTab from "./NutritionTab";
import IngredientsTab from "./IngredientsTab";
import SummaryTab from "./SummaryTab";
// Style
import styled from "styled-components";
import {
  MdNoFood,
  MdOutlineAccessTimeFilled,
  MdPeopleAlt,
} from "react-icons/md";

const RecipeModal = ({ recipe, closeModal }) => {
  const [activeTab, setActiveTab] = useState("Ingredients");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const missingIngredientCount = recipe.missedIngredients.length;
  return (
    <StyledModal>
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <div className="modal-content">
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
              <MdNoFood />
              <p>Need: {missingIngredientCount} Ingredients</p>
            </div>
            <div className="stat">
              <MdOutlineAccessTimeFilled />
              <p>{recipe.details.readyInMinutes} minutes</p>
            </div>
            <div className="stat">
              <MdPeopleAlt />
              <p>Serves {recipe.details.servings}</p>
            </div>
          </div>
        </div>

        <div className="tab-buttons">
          <button
            className={`tab-button ${
              activeTab === "Ingredients" ? "active-tab" : ""
            }`}
            onClick={() => handleTabClick("Ingredients")}
          >
            Ingredients
          </button>
          <button
            className={`tab-button ${
              activeTab === "Summary" ? "active-tab" : ""
            }`}
            onClick={() => handleTabClick("Summary")}
          >
            Summary
          </button>
          <button
            className={`tab-button ${
              activeTab === "Nutrition" ? "active-tab" : ""
            }`}
            onClick={() => handleTabClick("Nutrition")}
          >
            Nutrition
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "Nutrition" && <NutritionTab recipe={recipe} />}
          {activeTab === "Ingredients" && <IngredientsTab recipe={recipe} />}
          {activeTab === "Summary" && <SummaryTab recipe={recipe} />}
        </div>
      </div>
      {/* <div className="btns">
        <button>Save Recipe</button>
        <button>Add Ingredients to Shopping List</button>
      </div> */}
    </StyledModal>
  );
};

export default RecipeModal;

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  .close {
    z-index: 2000;
    color: red;
    top: 3rem;
    right: 3rem;
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    position: absolute;
    cursor: pointer;
    background-color: pink;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: #fff;
    width: 50vw;
    max-height: 85%;
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
      flex-wrap: wrap;

      .stat {
        display: flex;
        align-items: center;
        p {
          margin-left: 0.25rem;
        }
      }
    }

    @media (max-width: 550px) {
      .stats {
        justify-content: center;
        .stat {
          p {
            margin: 0.5rem;
          }
        }
      }
    }

    /* .close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 24px;
      cursor: pointer;
      color: red;
    } */

    .tab-buttons {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    @media (max-width: 475px) {
      .tab-buttons {
        justify-content: center;
      }
    }

    .tab-button {
      padding: 0.5rem 1rem;
      margin-right: 1rem;
      cursor: pointer;
      border: none;
      background-color: transparent;
      font-size: 1rem;
      font-weight: bold;
      color: #555;
      transition: color 0.3s;
    }

    @media (max-width: 550px) {
      .tab-button {
        font-size: 0.85rem;
        margin-right: 0.5rem;
        padding: 0.25rem 0.75rem;
      }
    }

    .tab-button:hover {
      color: green; /* Change color on hover */
    }

    /* CSS for the active tab's underline */
    .active-tab {
      position: relative;
    }

    .active-tab::after {
      content: "";
      position: absolute;
      bottom: -2px; /* Adjust the thickness of the underline */
      left: 0;
      width: 100%;
      height: 3px; /* Adjust the thickness of the underline */
      background-color: green; /* Color of the underline for the active tab */
      transition: width 0.3s ease-in-out;
    }
  }

  @media (max-width: 925px) {
    .modal-content {
      width: 80vw;
    }
  }

  .btns {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    button {
      padding: 1rem 1.5rem;
      margin: 0 1rem 1rem 1rem;
    }
  }
`;
