import React, { useEffect, useState } from "react";
import SectionOne from "./Section/Section_1";
import SectionTwo from "./Section/Section_2";
import SectionThree from "./Section/Section_3";
import SectionFour from "./Section/Section_4";
import SectionFive from "./Section/Section_5";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading";
import { withRouter } from "react-router-dom";

export default withRouter(({ location }) => {
  const { loading } = useSelector(state => ({ loading: state.press.loading }));
  const [load, setLoad] = useState(null);
  useEffect(() => {
    if (!loading) {
      setLoad(false);
    } else {
      setLoad(true);
    }
    if (location.hash === "") window.scrollTo(0, 0);
  }, [loading]);
  if (load) {
    return <Loading />;
  }
  return (
    <>
      <SectionOne location={location} />
      <SectionTwo location={location} />
      <SectionThree location={location} />
      <SectionFour location={location} />
      <SectionFive location={location} />
    </>
  );
});
