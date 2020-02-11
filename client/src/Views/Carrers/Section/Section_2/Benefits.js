import React, { useContext } from "react";
import styled from "styled-components";
import { LangContext } from "../../../../Context";
import Content from "../../../../Components/Content";
import { benefits } from "../../../../Components/Styled/css";

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

export default () => {
  const { lang } = useContext(LangContext);
  return (
    <Section>
      <Container>
        <Title>
          <h3>{lang.culture08}</h3>
        </Title>
        <Content repeatItem={benefits} />
      </Container>
    </Section>
  );
};
