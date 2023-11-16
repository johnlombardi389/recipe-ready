import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../AuthContext";
// Style
import GlobalStyles from "./components/GlobalStyle";
// Components
import Nav from "./components/Nav";
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
          <Route path="/recipe-ready" element={<Login />} />
          <Route path="/recipe-ready/pantry" element={<Pantry />} />
          <Route path="/recipe-ready/recipes" element={<Recipes />} />
          <Route path="/recipe-ready/register" element={<Register />} />
          <Route path="/recipe-ready/shopping-list" element={<Profile />} />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
