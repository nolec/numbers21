import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { LangContext } from "../../Context";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 0 0 120px;
  margin-top: 100px;
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
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
`;
const SeeMore = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 90px;
`;
const SLink = styled(Link)`
  padding: 10px 30px;
  background: #393939;
  color: #fff;
  font-size: 22px;
`;
export default () => {
  return (
    <Section>
      <Container>
        <HBox>
          <h2>Media</h2>
        </HBox>
        <SeeMore>
          {/* {press.cnt && press.chainPress.length === press.cnt ? null : (
            <SLink to="#none" onClick={handleClick}>
              {lang.seeMore}
            </SLink>
          )} */}
        </SeeMore>
      </Container>
    </Section>
  );
};
