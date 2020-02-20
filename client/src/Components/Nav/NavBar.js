import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LangContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { device, minDevice } from "../../device";
import Collapse from "./Collapse";

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
  ${device.PC992`display : none;`}
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
const ButtonBox = styled.button`
  position: absolute;
  padding: 0.25rem 0.75rem;
  right: 0;
  top: 0;
  font-weight: 300;
  font-size: 32px;
  background-color: transparent;
  border: none;
  outline: none;
  display: none;
  ${device.PC992`display : inline-block; cursor : pointer;`}
`;

export default ({ history }) => {
  const { lang } = useContext(LangContext);
  const [show, setShow] = useState(false);
  const showHandle = () => {
    setShow(!show);
  };
  return (
    <>
      <NavBar>
        <Ul>
          {lang.nav &&
            lang.nav.length > 0 &&
            lang.nav.map((navbar, index) => (
              <Li key={index}>
                <Item to={`/${navbar.split(" ")[0]}`}>
                  <span>{navbar}</span>
                </Item>
              </Li>
            ))}
        </Ul>
        <ButtonBox onClick={showHandle} type="button">
          <FontAwesomeIcon icon={faBars} />
        </ButtonBox>
      </NavBar>
      <Collapse show={show} showHandle={showHandle} history={history} />
    </>
  );
};
