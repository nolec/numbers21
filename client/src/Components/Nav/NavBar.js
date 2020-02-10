import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LangContext } from "../../Context";

const NavBar = styled.div`
  width: 100%;
  margin-top: 0px;
  z-index: 101;
  display: flex;
`;
const Ul = styled.ul`
  padding: 0;
  border: 0;
  margin: 0 0 0 auto;
  display: flex;
`;
const Li = styled.li`
  position: relative;
  margin: 0;
`;
const Item = styled(Link)`
  padding: 0.6em 2.2em 0.6em 2.2em;
  font-size: 16px;
  :hover span {
    color: #a6a6a6;
  }
  span {
    text-transform: uppercase;
    transition: all 0.3s ease-out;
  }
`;
export default () => {
  const { lang } = useContext(LangContext);

  return (
    <NavBar>
      <Ul>
        {lang.nav &&
          lang.nav.length > 0 &&
          lang.nav.map((navbar, index) => (
            <Li key={index}>
              <Item to={navbar.split(" ")[0]}>
                <span>{navbar}</span>
              </Item>
            </Li>
          ))}
      </Ul>
    </NavBar>
  );
};
