import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LangContext } from "../../Context";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { pressPress } from "../../Actions/press";
import PressMedia from "../../Components/PressMedia";
import { device } from "../../device";

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
const MainArticle = styled.div`
  width: 100%;
  margin-top: 60px;
  padding: 0 20px;
  display: flex;
  color: #fff;
  ${device.PC991`display : none;`}
`;
const Poster = styled.div`
  position: relative;
  max-height: 470px;
  width: 60%;
  border: 1px solid #fff;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Logo = styled.div`
  position: absolute;
  left: 1px;
  top: 1px;
  margin: 0;
  padding: 2px 5px;
  background: #353434;
  width: 130px;
  height: 56px;
  opacity: 0.7;
`;
const MainContent = styled.div`
  padding-left: 20px;
  width: 40%;
  position: relative;
`;
const ContentMeta = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  color: #000;
  span:nth-child(1) {
    position: relative;
    height: 52px;
    width: 70%;
    text-align: left;
    font-size: 33px;
    font-weight: 800;
  }
  span:nth-child(2) {
    position: relative;
    opacity: 0.9;
    width: 30%;
    padding: 17px 15px 0;
    height: 52px;
    text-align: right;
  }
`;
const ContentTitle = styled.div`
  p {
    padding-top: 20px;
    font-size: 23px;
    font-weight: 700;
    letter-spacing: 2px;
    line-height: 1.5;
  }
`;
const ContentDesc = styled.div`
  p {
    padding-top: 10px;
    font-size: 19px;
  }
`;
const SeeMore = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 90px;
`;
const SLink = styled(Link)`
  display: inline-block;
  padding: 10px 30px;
  background: #393939;
  color: #fff;
  font-size: 22px;
`;
export default () => {
  const { lang } = useContext(LangContext);
  const dispatch = useDispatch();
  const { press, cnt } = useSelector(state => ({
    press: state.press.press[0],
    cnt:
      state.press.press[1] &&
      state.press.press[1].length > 0 &&
      state.press.press[1][0].total_row_count
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };
  console.log(press, cnt);
  useEffect(() => {
    dispatch(pressPress(currentPage));
  }, [currentPage, dispatch]);
  return (
    <Section>
      <Container>
        <HBox>
          <h2>Press</h2>
        </HBox>
        <MainArticle>
          <Poster>
            <img
              src={
                press && press.length > 0
                  ? `/images/press/${encodeURIComponent(
                      press[0].poster_img_filename
                    )}`
                  : "null"
              }
            />
            <Logo>
              <img
                style={{ width: "120px", height: "52px" }}
                src={
                  press && press.length > 0
                    ? `/images/press/${encodeURIComponent(
                        press[0].logo_img_filename
                      )}`
                    : null
                }
                alt="logo"
              />
            </Logo>
          </Poster>
          <MainContent>
            <ContentMeta>
              <span>{press && press.length > 0 && press[0].media_name}</span>
              <span>{press && press.length > 0 && press[0].reg_date}</span>
            </ContentMeta>
            <ContentTitle>
              <a
                href={press && press.length > 0 ? press[0].media_link : "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>{press && press.length > 0 && press[0].title}</p>
              </a>
            </ContentTitle>
            <ContentDesc>
              <a
                href={press && press.length > 0 ? press[0].media_link : "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>{press && press.length > 0 && press[0].content}</p>
              </a>
            </ContentDesc>
          </MainContent>
        </MainArticle>
        <PressMedia press={true} item={press} />
        <SeeMore>
          {press && press.length === cnt ? null : (
            <SLink to="#" onClick={handleClick}>
              {lang.seeMore}
            </SLink>
          )}
        </SeeMore>
      </Container>
    </Section>
  );
};
