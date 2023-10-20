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

  return (
    <>
      <div>
        <h1>Your Shopping List</h1>

        {shoppingList.map((item) => (
          <>
            <StyledShoppingItem key={item.id}>
              <p>{item.item}</p>
              <span className="close" onClick={() => deleteItem(item.id)}>
                &times;
              </span>
            </StyledShoppingItem>
          </>
        ))}
      </div>
    </>
  );
};

export default Profile;

const StyledShoppingItem = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-right: 1rem;
  }
  .close {
    cursor: pointer;
  }
`;
