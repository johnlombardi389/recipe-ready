import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useAuth } from "../../AuthContext";
// Style
import styled from "styled-components";
// Pages
import Login from "./Login";

const Profile = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState("");

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchShoppingList();
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
    const data = { item: newIngredient, user: userId };

    axiosInstance
      .post("shopping-list/", data)
      .then((response) => {
        fetchShoppingList();
        setNewItem("");
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

  const handleNewInputChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleAddNewItem = () => {
    if (newItem.trim() !== "") {
      addIngredient(newItem);
    }
  };

  return (
    <>
      <ListContainer>
        <h1>Your Shopping List</h1>

        <h3>Add more items</h3>
        <NewShoppingItem>
          <input
            type="text"
            placeholder="Enter a new item"
            value={newItem}
            onChange={handleNewInputChange}
          />
          <button onClick={handleAddNewItem}>Add Item</button>
        </NewShoppingItem>

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
                    Remove
                  </button>
                  <button onClick={() => addToPantry(item)} className="add-btn">
                    Purchased
                  </button>
                </Buttons>
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

const NewShoppingItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;

  input {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    font-size: 1rem;
    border-radius: 0.5rem 0 0 0.5rem;
    height: 2rem;
    &:focus {
      outline: none;
      border: 1px solid #4caf50;
      /* box-shadow: 0 0 5px rgba(76, 175, 80, 0.7); */
    }
  }

  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 0 0.5rem 0.5rem 0;
    height: 2rem;
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
    text-transform: capitalize;
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
    border-radius: 0.5rem;
  }
  .delete-btn {
    background: none;
    color: black;
    text-decoration: underline;
    border: none;
    margin-right: 2rem;
    cursor: pointer;
  }
`;
