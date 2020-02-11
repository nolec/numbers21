import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { LangContext } from "../../../../Context";
import PressMedia from "../../PressMedia";
import { useSelector, useDispatch } from "react-redux";
import { mainPress } from "../../../../Actions/press";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 100px 0 0;
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
`;
export default () => {
  const { lang } = useContext(LangContext);
  const dispatch = useDispatch();
  const { press } = useSelector(state => ({
    press: state.press.press
  }));
  useEffect(() => {
    dispatch(mainPress());
  }, []);
  return (
    <Section>
      <Container>
        <Title>
          <h2>{lang.press01}</h2>
        </Title>
        <PressMedia press={true} item={press} />
      </Container>
    </Section>
  );
};
