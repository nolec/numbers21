import React, { useContext } from "react";
import styled from "styled-components";
import { LangContext } from "../../../../Context";
import { Link } from "react-router-dom";
import { repeat } from "../../../../Components/Styled/css";
import { device } from "../../../../device";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 100px 0 0;
  ${device.PC1300`padding: 60px 0 0 ;`}
  ${device.PC768`padding-bottom: 40px;`}
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
`;
const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
  font-size: 40px;
  ${device.PC1300`margin-bottom: 20px;
    padding-left: 15px;
    font-size: 40px;`}
  ${device.PC767`font-size: 32px;`}
`;
const ContentBox = styled.div`
  width: 100%;
  margin-top: 40px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;
const Content = styled.div`
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  position: relative;
  height: 246px;
  padding: 0 5px 0 0;
  flex-grow: 1;
  ${device.PC767`    height: 230px;
    max-width: 500px;
    padding: 0 10px;
    margin: 0 auto 10px; flex : 0 0 100%;`}
`;
const ContentBg = styled.div`
  background-size: cover;
  background-position: right center;
  background-repeat: no-repeat;
  padding: 70px 0 0 25px;
  position: relative;
  height: 246px;
  h3 {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 700;
  }
  p {
    margin-bottom: 20px;
    font-size: 16px;
  }
  ${device.PC1300`padding : 55px 0 0 25px;`}
  ${device.PC767`    height: 230px;
    max-width: 500px;
    margin: 0 auto 10px;`}
`;
const More = styled(Link)`
  display: inline-block;
  background: #000;
  color: #fff;
  font-size: 14px;
  padding: 5px 20px;
  :hover {
    background-color: #fff;
    color: #000;
  }
`;
export default () => {
  const { lang } = useContext(LangContext);
  return (
    <Section>
      <Container>
        <Title>
          <h2>{lang.solution01}</h2>
        </Title>
        <ContentBox>
          {repeat.map((sol, index) => {
            return (
              <Content key={index}>
                <ContentBg style={{ backgroundImage: `url(${sol.solution})` }}>
                  <h3>{sol.h3}</h3>
                  <p>{sol.p}</p>
                  <More to="/press">{lang.solution08}</More>
                </ContentBg>
              </Content>
            );
          })}
        </ContentBox>
      </Container>
    </Section>
  );
};
