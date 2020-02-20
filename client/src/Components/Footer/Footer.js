import React from "react";
import styled from "styled-components";
import Top from "./Top";
import Bottom from "./Bottom";
import { device } from "../../device";

const Footer = styled.footer`
  background: #000;
  color: #fff;
  padding: 80px 0px;
  margin-top: 60px;
  ${device.PC1100`padding : 40px 0 40px;`}
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
`;
export default () => {
  return (
    <Footer>
      <Container>
        <Top />
        <Bottom />
      </Container>
    </Footer>
  );
};
