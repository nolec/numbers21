import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Main from "../Views/Main";
import Contact from "../Views/Contact";
import Press from "../Views/Press";
import { LangContext } from "../Context";
import Nav from "./Nav";
import Footer from "./Footer";
export default () => {
  const { languageSetting, korean } = useContext(LangContext);
  useEffect(() => {
    languageSetting();
  }, [korean, languageSetting]);
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route to="/" exact component={Main} />
          <Route to="/press" component={Press} />
          <Route to="/contact" component={Contact} />
          <Redirect from="/*" to="/" />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};
