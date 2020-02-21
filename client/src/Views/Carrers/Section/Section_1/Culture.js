import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { LangContext } from "../../../../Context";
import Content from "../../../../Components/Content";
import { culutre } from "../../../../Components/Styled/css";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 40px 0;
  margin-bottom: 0px;
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
`;
const Title = styled.div`
  padding: 40px 0 40px;
  h3 {
    font-size: 1.75rem;
  }
`;

export default ({ location }) => {
  const { lang } = useContext(LangContext);
  const cul = useRef(null);
  useEffect(() => {
    if (location.hash === "#culture")
      window.scrollTo({
        top: cul.current.offsetTop,
        left: 0,
        behavior: "smooth"
      });
  }, []);
  return (
    <Section ref={cul}>
      <Container>
        <Title>
          <h3>{lang.culture01}</h3>
        </Title>
        <Content repeatItem={culutre} />
      </Container>
    </Section>
  );
};
