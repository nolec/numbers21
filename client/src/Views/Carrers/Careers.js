import React, { useContext } from "react";
import styled from "styled-components";
import SectionOne from "./Section/Section_1";
import SectionTwo from "./Section/Section_2";
import SectionThree from "./Section/Section_3";
import SectionFour from "./Section/Section_4";

const Background = styled.div`
  ${props =>
    `background-image: url(${
      props.one ? props.theme.file.careersBg : props.theme.file.careersBg2
    });`}
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 28vw;
  min-height: 300px;
`;

export default () => {
  return (
    <>
      <Background one={true} />
      <SectionOne />
      <SectionTwo />
      <Background />
      <SectionThree />
      <SectionFour />
    </>
  );
};
