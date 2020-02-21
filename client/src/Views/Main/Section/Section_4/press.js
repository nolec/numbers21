import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { LangContext } from "../../../../Context";
import PressMedia from "../../../../Components/PressMedia";
import { useSelector, useDispatch } from "react-redux";
import { mainPress } from "../../../../Actions/press";
import { Link } from "react-router-dom";
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
const SeeMore = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 80px;
`;
const SLink = styled(Link)`
  ${props => props.theme.styles.SlinkStyle};
`;
export default ({ location }) => {
  const { lang } = useContext(LangContext);
  const dispatch = useDispatch();
  const pre = useRef(null);
  const { press } = useSelector(state => ({
    press: state.press.press
  }));
  useEffect(() => {
    dispatch(mainPress());
  }, [dispatch]);
  useEffect(() => {
    if (location.hash === "#press") {
      pre.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <Section ref={pre}>
      <Container>
        <Title>
          <h2>{lang.press01}</h2>
        </Title>
        <PressMedia press={true} item={press} />
        <SeeMore>
          <SLink to="/press">{lang.seeMore}</SLink>
        </SeeMore>
      </Container>
    </Section>
  );
};
