import React from "react";
import { hot } from "react-hot-loader";
import Route from "./Route";
import GlobalStyle from "./Styled/GlobalStyles";
import theme from "./Styled/css";
import { ThemeProvider } from "styled-components";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Route />
      </ThemeProvider>
    </>
  );
};

export default hot(module)(App);
