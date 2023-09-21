import { Routes, Route } from "react-router-dom";
// Style
import GlobalStyles from "./components/GlobalStyle";
// Components
import Nav from "./components/Nav";
// Pages
import Recipes from "./pages/Recipes";
import Pantry from "./pages/Pantry";

function App() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/pantry" element={<Pantry />} />
      </Routes>
    </>
  );
}

export default App;
