import React from "react";
// import { hot } from "react-hot-loader";
import Router from "./Router";
import GlobalStyle from "./Styled/GlobalStyles";
import theme from "./Styled/css";
import { ThemeProvider } from "styled-components";
import LangProvider from "../LangProvider";

const App = () => {
  return (
    <LangProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </LangProvider>
  );
};

export default App;
