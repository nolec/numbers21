import React from "react";
import styled from "styled-components";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  margin-top: 150px;
  height: 660px;
  position: relative;
  overflow: hidden;
`;
const BG = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  max-height: 450px;
  ${props => `background-color : ${props.theme.file.bg};`}
  background-position: right bottom;
  background-size: contain;
  z-index: -99;
`;

export default () => {
  return (
    <Section>
      <BG></BG>
    </Section>
  );
};
