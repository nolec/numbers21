import React from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { repeatItem } from "../Styled/css";
import { device } from "../../device";

const Warpper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const LogoBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 25%;
  max-width: 25%;
  ${device.PC1100`flex: 0 0 100%;max-width: 100%;`}
`;
const ImgLogo = styled.img.attrs(props => ({
  src: props.theme.file.footerLogo
}))`
  width: 250px;
  height: 107px;
  width: auto;
  height: auto;
  ${device.PC1100`width : 100px; height : 43px;`}
`;
const SubBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 75%;
  max-width: 75%;
  ${device.PC1100`flex : 0 0 100%; max-width : 100%; margin-top : 40px;`}
`;
const SubItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ItemNav = styled.div`
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 20%;
  max-width: 20%;
  h4 {
    color: #fff;
    font-size: 22px;
  }
  ${device.PC1100`text-align: center;`}
  ${device.PC600`padding-top : 20px; padding-bottom : 20px; flex : 0 0 50%; max-width : 50%;`}
`;
const Ul = styled.ul`
  margin: 0;
`;
const Li = styled.li`
  margin: 0;
  a {
    color: #fff;
    opacity: 0.8;
    font-size: 18px;
  }
`;
const Alink = styled(Link)``;
export default ({ pathname }) => {
  return (
    <>
      {pathname === "/sitemap" ? null : (
        <Warpper>
          <LogoBox>
            <ImgLogo />
          </LogoBox>
          <SubBox>
            <SubItemBox>
              {repeatItem.map((item, index) => (
                <ItemNav key={index}>
                  <h4>{item.h4}</h4>
                  <Ul>
                    {item.sub.map((list, i) => (
                      <Li key={i}>
                        {list[2] === "" ? (
                          <Alink to={list[0]} target={list[2]}>
                            {list[1]}
                          </Alink>
                        ) : (
                          <a href={list[0]} target={list[2]}>
                            {list[1]}
                          </a>
                        )}
                      </Li>
                    ))}
                  </Ul>
                </ItemNav>
              ))}
            </SubItemBox>
          </SubBox>
        </Warpper>
      )}
    </>
  );
};
