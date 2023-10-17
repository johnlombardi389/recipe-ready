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
    }
  }, [isLoggedIn]);

  const fetchShoppingList = () => {
    axiosInstance
      .get("shopping-list/")
      .then((response) => {
        setShoppingList(response.data.shopping_list_items);
        console.log(response.data.shopping_list_items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  return (
    <>
      <h1>Your Shopping List</h1>

      {shoppingList.map((item) => (
        <p key={item.id}>{item.item}</p>
      ))}
    </>
  );
};

export default Profile;