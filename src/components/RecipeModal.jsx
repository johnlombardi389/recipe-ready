import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
// Components
import NutritionTab from "./NutritionTab";
import IngredientsTab from "./IngredientsTab";
import SummaryTab from "./SummaryTab";
// Style
import styled from "styled-components";
import {
  MdOutlineAccessTimeFilled,
  MdPeopleAlt,
  MdOutlineFoodBank,
} from "react-icons/md";

const RecipeModal = ({ recipe, closeModal }) => {
  const [activeTab, setActiveTab] = useState("Ingredients");
  const [missingIngredients, setMissingIngredients] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    setMissingIngredients(recipe.missedIngredients);
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const missingIngredientCount = recipe.missedIngredients.length;

  const addShoppingItems = (newItems) => {
    const userId = localStorage.getItem("user_id");

    // Iterate over the array of new items
    newItems.forEach((newItem) => {
      const data = { item: newItem.name, user: userId };

      // Send a POST request to add the shopping item
      axiosInstance
        .post("shopping-list/", data)
        .then((response) => {
          console.log(`Added item: ${newItem}`);
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    });

    setButtonClicked(true);
  };

  const updateShoppingList = () => {
    addShoppingItems(missingIngredients);
  };

  return (
    <StyledModal>
      <div className="modal-content">
        <img src={recipe.details.image} alt={recipe.title} />

        <div className="stats">
          <div className="stat">
            <MdOutlineFoodBank className="icons" />
            <p>Need: {missingIngredientCount} Ingredients</p>
          </div>
          <div className="stat">
            <MdOutlineAccessTimeFilled className="icons" />
            <p>{recipe.details.readyInMinutes} minutes</p>
          </div>
          <div className="stat">
            <MdPeopleAlt className="icons" />
            <p>Serves {recipe.details.servings}</p>
          </div>
        </div>

        <div className="info">
          <div className="names">
            <h2>{recipe.details.title} </h2>
            <span className="author">
              by{" "}
              <a href={recipe.details.sourceUrl} target="_blank">
                {recipe.details.sourceName}
              </a>
            </span>
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
            Recipe Summary
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
      <div className="btns">
        <button onClick={closeModal}>Close</button>
        <button
          onClick={() => updateShoppingList(recipe.details.missedIngredients)}
          disabled={buttonClicked}
        >
          {buttonClicked ? "Added to List" : "Add to Shopping List"}
        </button>
      </div>
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

  .modal-content {
    background-color: #fff;
    width: 50vw;
    max-height: 90%;
    overflow-y: auto;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: relative;
    @media (max-width: 1000px) {
      padding: 1rem;
    }

    img {
      width: 100%;
      height: auto;
      margin-bottom: 1rem;
    }

    .names {
      margin-bottom: 1.75rem;

      h2 {
        font-family: "Cambay", sans-serif;
        font-size: 1.75rem;
        font-weight: 700;
      }

      .author {
        font-family: "Mukta Vaani", sans-serif;
        font-size: 0.9rem;
        font-weight: 200;
        color: grey;
        a {
          color: grey;
          text-decoration: underline;
          &:hover {
            color: blue;
          }
        }
      }

      @media (max-width: 1000px) {
        h2 {
          font-size: 1.2rem;
        }
        .author {
          font-size: 0.85rem;
        }
      }
      @media (max-width: 400px) {
        h2 {
          font-size: 1.1rem;
        }
        .author {
          font-size: 0.75rem;
        }
      }
    }

    .stats {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      background-color: green;
      padding: 0.5rem 0;

      .icons {
        width: 1.5rem;
        height: 1.5rem;
        color: grey;
      }

      .stat {
        display: flex;
        align-items: center;

        p {
          font-family: "Maven Pro", sans-serif;
          font-size: 0.9rem;
          margin-left: 0.25rem;
        }
      }
    }

    @media (max-width: 1000px) {
      .stats {
        padding: 0.25rem 0.25rem;
        .icons {
          width: 1rem;
          height: 1rem;
        }
        .stat {
          p {
            font-size: 0.85rem;
          }
        }
      }
    }
    @media (max-width: 400px) {
      .stats {
        .icons {
          width: 0.9rem;
          height: 0.9rem;
        }
        .stat {
          p {
            font-size: 0.75rem;
          }
        }
      }
    }

    .tab-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .tab-button {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border: none;
      background-color: transparent;
      font-family: "Mukta Vaani", sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: #555;
      transition: color 0.3s;
    }

    @media (max-width: 600px) {
      .tab-buttons {
        justify-content: space-evenly;
        align-items: center;
      }
      .tab-button {
        font-size: 1rem;
        margin-right: 0.5rem;
        padding: 0.25rem 0.75rem;
      }
    }

    .tab-button:hover {
      color: green;
    }

    /* CSS for the active tab's underline */
    .active-tab {
      position: relative;
    }

    .active-tab::after {
      content: "";
      position: absolute;
      bottom: 3px; /* Adjust the position of the underline */
      left: 0;
      width: 100%;
      height: 3px; /* Adjust the thickness of the underline */
      background-color: blue; /* Color of the underline for the active tab */
      transition: width 0.3s ease-in-out;
    }
  }

  @media (max-width: 925px) {
    .modal-content {
      width: 80vw;
    }
  }

  .btns {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    button {
      padding: 0.75rem 1.2rem;
      margin: 0 1rem 1rem 1rem;
      &:disabled {
        background-color: green;
        color: black;
        cursor: not-allowed;
      }
    }
  }
`;
