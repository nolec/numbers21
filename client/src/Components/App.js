import React from "react";
// import { hot } from "react-hot-loader";
import Router from "./Router";
import GlobalStyle from "./Styled/GlobalStyles";
import theme from "./Styled/css";
import { ThemeProvider } from "styled-components";
import LangProvider from "../LangProvider";
import store from "../store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <LangProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </LangProvider>
    </Provider>
  );
};

export default App;
