import { createGlobalStyle } from 'styled-components';

const getGlobalStyle = (theme) => {
  switch (theme) {
    case 'dark': return createGlobalStyle`
      html,
      body {
        height: 100%;
        width: 100%;
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        font-size: 18px;
        background: #000000;
      }
    
      #app {
        height: 100%;
        width: 100%;
      }
    `;

    default: return createGlobalStyle`
      html,
      body {
        height: 100%;
        width: 100%;
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        font-size: 18px;
        background: #004392;
      }
    
      #app {
        height: 100%;
        width: 100%;
      }
    `;
  }
};

export default getGlobalStyle;
