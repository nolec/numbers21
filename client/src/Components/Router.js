import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Nav from "./Nav";
import Main from "../Views/Main";
import Timeline from "../Views/Timeline";
import Press from "../Views/Press";
import Careers from "../Views/Carrers";
import Contact from "../Views/Contact";
import Footer from "./Footer";
import { LangContext } from "../Context";
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
          <Route path="/" exact component={Main} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/press" component={Press} />
          <Route path="/careers" component={Careers} />
          <Route path="/contact" component={Contact} />
          <Redirect from="/*" to="/" />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};
