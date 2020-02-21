import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { LangContext } from "../../../../Context";

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
const ContentBox = styled.div`
  padding: 0 15px;
`;
const Content = styled.div`
  h4 {
    padding: 20px 0 10px;
    font-size: 1.5rem;
  }
`;
export default ({ location }) => {
  const { lang } = useContext(LangContext);
  const job = useRef(null);
  useEffect(() => {
    if (location.hash === "#job")
      window.scrollTo({
        top: job.current.offsetTop,
        left: 0,
        behavior: "smooth"
      });
  }, []);
  return (
    <Section ref={job}>
      <Container>
        <Title>
          <h3>{lang.culture24}</h3>
        </Title>
        <ContentBox>
          {lang.job &&
            lang.job.map((text, i) => (
              <Content key={i}>
                <h4>{text.h4}</h4>
                <p>{text.p}</p>
              </Content>
            ))}
        </ContentBox>
      </Container>
    </Section>
  );
};
