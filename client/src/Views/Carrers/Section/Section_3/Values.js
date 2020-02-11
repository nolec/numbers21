import React, { useContext } from "react";
import styled from "styled-components";
import { LangContext } from "../../../../Context";
import Content from "../../../../Components/Content";
import { values } from "../../../../Components/Styled/css";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  background: #000;
  padding: 50px 0 80px;
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
`;
const Title = styled.div`
  padding: 40px 0 40px;
  h3 {
    color: #fff;
    font-size: 1.75rem;
  }
`;

export default () => {
  const { lang } = useContext(LangContext);
  return (
    <Section>
      <Container>
        <Title>
          <h3>{lang.culture15}</h3>
        </Title>
        <Content repeatItem={values} />
      </Container>
    </Section>
  );
};
