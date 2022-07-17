import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalTheme = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    background-color: #eee;

    font-family: "Roboto", sans-serif;

    height: 100%;

    margin: 0;

    padding: 0;

    width: 100%;
  }
`;
