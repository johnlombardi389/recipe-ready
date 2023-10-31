import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useAuth } from "../../AuthContext";
// Style
import styled from "styled-components";
// Pages
import Login from "./Login";

const Profile = () => {
  const { isLoggedIn } = useAuth();
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState("");

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
      {isLoggedIn ? (
        <ListContainer>
          <h1>Your Shopping List</h1>
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
                    <button
                      onClick={() => addToPantry(item)}
                      className="add-btn"
                    >
                      Purchased
                    </button>
                  </Buttons>
                </ShoppingItem>
              </>
            ))}
          </ShoppingList>
        </ListContainer>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Profile;

const ListContainer = styled.div`
  h1 {
    font-size: 2rem;
    color: #212429;
    font-family: "Cambay", sans-serif;
    font-weight: 700;
    text-align: center;
  }
`;

const NewShoppingItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem auto;
  max-width: 1200px;

  input {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    font-size: 1rem;
    border-radius: 0.5rem 0 0 0.5rem;
    height: 2rem;
    margin-left: 1rem;
    &:focus {
      outline: none;
      border: 1px solid #2368a2;
    }
  }

  button {
    background-color: #2368a2;
    color: white;
    border: none;
    padding: 0rem 1rem;
    cursor: pointer;
    border-radius: 0 0.5rem 0.5rem 0;
    height: 2rem;
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s;
    margin-right: 1rem;
    &:hover {
      background-color: #194870;
    }
  }
`;

const ShoppingList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  max-width: 1600px;
`;

const ShoppingItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #edf1f5;
  border: 1px solid #d3dce8;
  margin: 0.5rem 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
  p {
    font-size: 1.2rem;
    flex-grow: 1;
    text-transform: capitalize;
    font-family: "Mukta Vaani", sans-serif;
    font-weight: 400;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    p {
      font-size: 1.1rem;
    }
  }
`;

const Buttons = styled.div`
  button {
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.3s;
  }
  .add-btn {
    background-color: #589fdb;
    color: white;
    border: none;
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
    &:hover {
      background-color: #2979bc;
    }
  }
  .delete-btn {
    background: none;
    color: #8c6d1f;
    text-decoration: underline;
    border: none;
    margin-right: 2rem;
    &:hover {
      color: #5b4712;
    }
  }

  @media (max-width: 1000px) {
    button {
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
    .add-btn {
      padding: 0.15rem 0.75rem;
    }
  }
`;
