import React, { useContext } from "react";
import styled from "styled-components";
import { LangContext } from "../../../../Context";

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
  ${props => `background-image : url(${props.theme.file.bg});`}
  background-repeat : no-repeat;
  background-position: right bottom;
  background-size: contain;
  z-index: -99;
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
  flex-wrap: nowrap;
  flex-basis: auto;
  display: flex;
  align-items: center;
  height: 100%;
`;
const MainHeader = styled.div`
  p {
    font-size: 22px;
  }
`;
const MainTitle = styled.div``;

export default () => {
  const { lang } = useContext(LangContext);
  return (
    <Section>
      <BG></BG>
      <Container>
        <MainHeader>
          <MainTitle>
            <h1>{lang.about01}</h1>
          </MainTitle>
          <p>{lang.about02}</p>
        </MainHeader>
      </Container>
    </Section>
  );
};
