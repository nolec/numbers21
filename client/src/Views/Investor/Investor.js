import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LangContext } from "../../Context";
import Table from "./Table";
import Detail from "./Detail";
import Write from "./Write";
import Update from "./Update/Update";
import { device } from "../../device";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 0 0 120px;
  margin-top: 100px;
  position: relative;
  ${device.PC767`    padding: 0 0 60px 0;
    margin-top: 60px;`}
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
  position: relative;
`;
const HBox = styled.div`
  position: relative;
  margin: 0 auto;
  padding-top: 45px;
  font-size: 40px;
  color: #000;
  transition: all 0.1s, color 0.1s 0.1s;
  border-bottom: 1px #cacaca dotted;
  padding-bottom: 20px;
  margin-bottom: 80px;
  ${device.PC768`margin-bottom: 20px;font-size : 28px;`}
`;
const SubMenu = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  ${device.PC990`display : none;`}
`;
const Ul = styled.ul`
  display: flex;
  margin: 0;
`;
const Li = styled.li`
  margin: 0;
`;
const SubLink = styled.span`
  display: block;
  font-size: 18px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  :hover {
    color: #a5a5a5;
  }
`;
const PageName = styled.div`
  width: 100%;
  text-align: center;
  font-size: 35px;
  padding: 40px 0;
  margin: 0 auto 50px;
  border: 1px solid #d3d3d3;
  ${device.PC767`padding : 20px 0; margin : 0 auto 30px; font-size : 26px;`}
`;

export default ({ location, match, history }) => {
  const { lang } = useContext(LangContext);
  const [type, setType] = useState(1);
  const typeHandle = num => {
    if (num !== 1) {
      return alert("준비중입니다.");
    }
    setType(num);
  };
  const component = () => {
    if (location.pathname.includes("detail")) {
      return <Detail match={match} history={history} />;
    } else if (location.pathname.includes("write")) {
      return <Write type={type} history={history} />;
    } else if (location.pathname.includes("update")) {
      return <Update match={match} history={history} />;
    } else {
      return <Table type={type} />;
    }
  };
  return (
    <Section>
      <Container>
        <HBox>
          <h2>Investor Relations</h2>
        </HBox>
        {location.pathname.includes("detail") ||
        location.pathname.includes("write") ||
        location.pathname.includes("update") ? null : (
          <SubMenu>
            <Ul>
              <Li onClick={() => typeHandle(1)}>
                <SubLink>{lang.investor01}</SubLink>
              </Li>
              <Li onClick={() => typeHandle(2)}>
                <SubLink>{lang.investor02}</SubLink>
              </Li>
              <Li onClick={() => typeHandle(3)}>
                <SubLink>{lang.investor03}</SubLink>
              </Li>
              <Li onClick={() => typeHandle(4)}>
                <SubLink>{lang.investor04}</SubLink>
              </Li>
            </Ul>
          </SubMenu>
        )}
        <PageName>{lang.investor01}</PageName>
        {component()}
      </Container>
    </Section>
  );
};
