import React, { useContext } from "react";
import styled from "styled-components";
import { LangContext } from "../../Context";
import { Link } from "react-router-dom";
import { device } from "../../device";

const Warpper = styled.div`
  width: 100%;
  text-align: left;
  display: block;
  color: #a6a6a6;
  font-size: 16px;
  ${props =>
    props.pathname === "/sitemap"
      ? "padding : 0 0 10px;"
      : "padding : 70px 0 10px;"}
  p {
    padding: 0;
    font-size: 16px;
    :first-child {
      padding-bottom: 14px;
      ${device.PC980`margin : 0; padding : 0 0 4px 0;`}
    }
    :last-child {
      border-top: 1px solid #333;
      padding-top: 4px;
    }
    span:last-child {
      float: right;
      ${device.PC980`float : none;`}
    }
    span:first-child {
      float: left;
      ${device.PC980`float : none;`}
    }

    b {
      font-size: 16px;
      color: #fff;
      font-weight: 300;
      opacity: 0.8;
    }
  }
`;
const Site = styled(Link)`
  display: inline-block;
  color: #a6a6a6;
  :hover {
    color: #fff;
  }
`;
export default ({ pathname }) => {
  const { lang } = useContext(LangContext);
  console.log(pathname);
  return (
    <Warpper pathname={pathname}>
      <p>
        <span>
          <b>{lang.footer06}</b>
          {lang.footer07}
        </span>
        <span>{lang.footer08}</span>
      </p>
      <p>
        <span>
          <b>{lang.footer09}</b>
          {lang.footer10}
        </span>
        <span>{lang.footer11}</span>
      </p>
      <p>
        <span>
          {lang.footer12}
          <Site to="/sitemap">사이트 맵</Site>
        </span>
      </p>
    </Warpper>
  );
};
