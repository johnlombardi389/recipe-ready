import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { useAuth } from "../../AuthContext";
// Style
import styled from "styled-components";
// Pages
import Login from "./Login";

const Profile = () => {
  const [shoppingList, setShoppingList] = useState([]);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchShoppingList();
      console.log(shoppingList);
    }
  }, [isLoggedIn]);

  const fetchShoppingList = () => {
    axiosInstance
      .get("shopping-list/")
      .then((response) => {
        setShoppingList(response.data.shopping_list_items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  const deleteItem = (id) => {
    axiosInstance
      .delete(`shopping-list/${id}`)
      .then(() => {
        // After successful deletion, refresh
        fetchShoppingList();
      })
      .catch((error) => {
        console.error("Error deleting shopping list item:", error);
        console.log(error.response.data);
      });
  };

  const addIngredient = (newIngredient) => {
    const userId = localStorage.getItem("user_id");
    const data = { name: newIngredient, user: userId };

    axiosInstance
      .post("ingredients/", data)
      .then((response) => {
        console.log("Added item to pantry");
      })
      .catch((error) => {
        console.error("Error adding ingredient:", error);
        console.log(error.response.data);
      });
  };

  const addToPantry = (item) => {
    addIngredient(item.item);
    deleteItem(item.id);
  };

  return (
    <>
      <ListContainer>
        <h1>Your Shopping List</h1>
        <ShoppingList>
          {shoppingList.map((item) => (
            <>
              <ShoppingItem key={item.id}>
                <p>{item.item}</p>
                <Buttons>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <button onClick={() => addToPantry(item)} className="add-btn">
                    Purchased
                  </button>
                </Buttons>
                {/* <Button onClick={() => addToPantry(item)}>Purchased</Button>
                <CloseButton
                  className="close"
                  onClick={() => deleteItem(item.id)}
                >
                  &times;
                </CloseButton> */}
              </ShoppingItem>
            </>
          ))}
        </ShoppingList>
      </ListContainer>
    </>
  );
};

export default Profile;

const ListContainer = styled.div`
  h1 {
    margin: 1rem;
  }
`;

const ShoppingList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
`;

const ShoppingItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
  p {
    font-size: 1.2rem;
    flex-grow: 1;
  }
`;

const Buttons = styled.div`
  .add-btn {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px 16px;
    margin: 0 10px;
    cursor: pointer;
  }
  .delete-btn {
    background-color: grey;
    color: white;
    border: none;
    padding: 8px 16px;
    margin: 0 10px;
    cursor: pointer;
  }
`;
