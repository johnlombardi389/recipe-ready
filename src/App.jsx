import { Routes, Route } from "react-router-dom";
// Style
import GlobalStyles from "./components/GlobalStyle";
// Components
import Nav from "./components/Nav";
// Pages

function App() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <div>
        <h1>Hello</h1>
      </div>
    </>
  );
}

export default App;
