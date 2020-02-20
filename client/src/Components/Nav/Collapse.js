import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LangContext } from "../../Context";

const Collapse = styled.div`
  width: 100%;
  flex-basis: 100%;
  flex-grow: 1;
  align-items: center;
  position: absolute;
  top: 52px;
  left: 0;
  ${props => (props.show ? "display : block;" : "display : none;")}
`;
const Ul = styled.ul`
  background-color: white;
  border-top: 1px solid #e0e0e0;
  padding: 2px 0;
`;
const Li = styled.li`
  margin: 0;
  position: relative;
  ul {
    width: 100%;
  }
  li {
    margin: 0;
    position: relative;
  }
  a:hover {
    background: #000;
    color: #fff;
  }
`;
const Item = styled(Link)`
  padding: 0.6em 2.2em 0.6em !important;
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
  text-transform: uppercase;
  color: #000;
`;
const SubItem = styled(Link)`
  padding: 0.6em 2.2em 0.6em !important;
  border-bottom: 1px solid #f1f1f1;
  position: relative;
  opacity: 0.8;
  font-size: 13px;
  color: #000;
  span {
    position: relative;
    left: 10px;
  }
`;
export default ({ show, showHandle, history }) => {
  const { lang } = useContext(LangContext);
  const typeHandle = type => {
    showHandle();
    if (type !== 1) {
      alert("준비중입니다.");
    } else {
      history.push("/investor");
    }
  };
  return (
    <Collapse show={show}>
      <Ul>
        {lang.nav &&
          lang.nav.length > 0 &&
          lang.nav.map((navbar, index) => (
            <Li key={index}>
              <Item to={`/${navbar.split(" ")[0]}`} onClick={showHandle}>
                <span>{navbar}</span>
              </Item>
              <ul>
                {navbar === "investor relations" &&
                  lang.subNav.length > 0 &&
                  lang.subNav.map((sub, i) => (
                    <li key={i} onClick={() => typeHandle(i + 1)}>
                      <SubItem to="/" onClick={e => e.preventDefault()}>
                        <span>· {sub}</span>
                      </SubItem>
                    </li>
                  ))}
              </ul>
            </Li>
          ))}
      </Ul>
    </Collapse>
  );
};
