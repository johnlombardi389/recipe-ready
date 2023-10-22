import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    overflow-y: scroll;
}

body {
    width: 100%;
    background-color: white;
}
`;

export default GlobalStyles;
