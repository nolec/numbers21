import React from "react";
import styled from "styled-components";
import { minDevice, device } from "../device";

const Articles = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${props => `margin-top : ${props.itemLength === 4 ? "0;" : "80px;"}`}
  ${device.PC1300`margin-top : 20px;`}
`;
const Item = styled.div`
  position: relative;
  margin-top: 40px;
  text-align: center;
  max-width : 100%;
  flex : 0 0 100%;
  padding-right: 15px;
  padding-left: 15px;
  ${device.PC575`max-width : none;`}
  ${minDevice.minPC576`flex : 0 0 50%; max-width : 50%;`}
  ${minDevice.minPC768`flex : 0 0 50%; max-width : 50%;`}
  ${minDevice.minPC992`flex: 0 0 33.3333%; max-width : 33.3333%;`}
  ${minDevice.minPC`flex: 0 0 25%;`}
  * {
    transition: 0.3s ease-in-out;
  }

  :hover figure > img {
    transform: scale(1.1);
    opacity: 0.8;
  }
  :hover p {
    text-decoration: underline;
  }
  a {
    color: #000;
    overflow: hidden;
    figure {
      width: 100%;
      height: auto;
      margin: 0;
      padding: 0;
      background: #000;
      overflow: hidden;
      border: 1px solid #000;
      img {
        height: 12vw;
        width: 100%;
        max-height: 160px;
        vertical-align: middle;
        ${device.PC1199`height : 16vw; max-height : none;`}
        ${device.PC991`height : 25vw;`}
        ${device.PC575`max-width : none;height : 50vw;`}
      }
    }
    p {
      text-align: left;
      margin: 0;
      padding: 20px 0 0;
      font-size: 20px;
      line-height: 1.5;
      display: -webkit-box;
      max-height: 260px;
      opacity: 0.9;
    }
  }
`;
const Logo = styled.div`
  position: absolute;
  left: 16px;
  top: 1px;
  margin: 0;
  padding: 2px 5px;
  background: #353434;
  width: 85px;
  height: 34px;
  opacity: 0.7;
  img {
    width: 75px !important;
    height: 30px !important;
  }
`;
const Sub = styled.div`
  text-align: left;
  margin: 0;
  padding: 14px 0 0;
  font-size: 15px;
  letter-spacing: 1px;
  vertical-align: text-bottom;
  span:first-child {
    font-weight: bold;
  }
  span:last-child {
    margin-left: 5px;
    opacity: 0.8;
    ::before {
      display: inline-block;
      content: "";
      width: 1px;
      height: 12px;
      margin-right: 11px;
      background: #000;
      opacity: 0.8;
    }
  }
`;

export default ({ press, item }) => {
  return (
    <Articles itemLength={item && item.length}>
      {item &&
        item.length > 0 &&
        item.map((result, i) => (
          <Item key={i}>
            <a
              href={result.media_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure alt="poster">
                <img
                  src={`/images/${press ? "press" : "media"}/${
                    result.poster_img_filename
                  }`}
                  alt="poster"
                />
                {press ? (
                  <Logo>
                    <img
                      src={`/images/${press ? "press" : "media"}/${
                        result.logo_img_filename
                      }`}
                      alt="logo"
                    />
                  </Logo>
                ) : null}
              </figure>
              <Sub>
                <span>{result.media_name}</span>
                <span>{result.reg_date}</span>
              </Sub>
              <p>{result.title}</p>
            </a>
          </Item>
        ))}
    </Articles>
  );
};
