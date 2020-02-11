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
import Media from "../Views/Media";
import Careers from "../Views/Carrers";
import Contact from "../Views/Contact";
import Investor from "../Views/Investor";
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
          <Route path="/media" component={Media} />
          <Route path="/careers" component={Careers} />
          <Route path="/contact" component={Contact} />
          <Route path="/investor" component={Investor} />
          <Redirect from="/*" to="/" />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};
