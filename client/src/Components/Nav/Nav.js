import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import NavBar from "./NavBar";

const Header = styled.header`
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
  padding: 5px 5px;
  display: flex;
  align-items: center;
`;
const LogoBox = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
`;
const ImgLogo = styled.img.attrs(props => ({
  src: props.theme.file.logo
}))`
  max-width: 97px;
  max-height: 42px;
  width: auto;
  height: auto;
`;
export default withRouter(({ history }) => {
  console.log(history);
  return (
    <Header>
      <Container>
        <LogoBox to="/">
          <ImgLogo />
        </LogoBox>
        <NavBar history={history} />
      </Container>
    </Header>
  );
});
