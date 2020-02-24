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
import SiteMap from "../Views/SiteMap/SiteMap";

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
          <Route path="/timeline" exact component={Timeline} />
          <Redirect from="/timeline*" to="/timeline" />
          <Route path="/press" exact component={Press} />
          <Redirect from="/press*" to="/press" />
          <Route path="/media" exact component={Media} />
          <Redirect from="/media*" to="/media" />
          <Route path="/careers" exact component={Careers} />
          <Redirect from="/careers*" to="/careers" />
          <Route path="/contact/:id" exact component={Contact} />
          <Redirect from="/contact*" to="/contact" />
          <Route path="/sitemap" component={SiteMap} />
          <Redirect from="/sitemap*" to="/sitemap" />
          <Route path="/investor/:type" exact component={Investor} />
          <Route
            path="/investor/detail/:type/:list"
            exact
            component={Investor}
          />
          <Route path="/investor/write/:type" exact component={Investor} />
          <Route
            path="/investor/update/:type/:list"
            exact
            component={Investor}
          />
          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};
