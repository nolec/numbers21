import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Main from "../Views/Main";
import Contact from "../Views/Contact";
import Press from "../Views/Press";
export default () => {
  return (
    <>
      <Router>
        <Switch>
          <Route to="/" exact component={Main} />
          <Route to="/press" component={Press} />
          <Route to="/contact" exact component={Contact} />
          <Redirect from="/*" to="/" />
        </Switch>
      </Router>
    </>
  );
};
