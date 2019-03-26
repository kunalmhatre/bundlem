import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-size: 18px;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }
`;

export default GlobalStyle;
