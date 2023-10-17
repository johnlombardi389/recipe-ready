import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
// Style
import GlobalStyles from "./components/GlobalStyle";
// Components
import Nav from "./components/Nav";
import EditIngredientModal from "./components/EditIngredientMOdal";
// Pages
import Recipes from "./pages/Recipes";
import Pantry from "./pages/Pantry";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <>
        <GlobalStyles />
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
