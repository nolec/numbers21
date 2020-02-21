import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { LangContext } from "../../../../Context";
import { Link } from "react-router-dom";
import { device } from "../../../../device";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 145px 0;
  background: #000;
  ${device.PC`padding: 110px 0;`}
  ${device.PC767`padding : 65px 0;`}
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
  ${device.PC767`padding: 0 25px;margin: 0 auto;`}
`;
const ContentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const Desc = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
  font-size: 24px;
  color: #fff;
  h2 {
    margin-bottom: 15px;
    color: #fff;
    font-size: 40px;
    margin-top: 0;
    ${device.PC767`font-size: 32px;margin-top: 15px;`}
  }
  p {
    margin-bottom: 30px;
  }
  ${device.PC`flex-basis : 50%;`}
  ${device.PC767`order: 2;margin-top: 40px;`}
`;
const PageMoveBox = styled.div``;
const PageMove = styled(Link)`
  display: inline-block;
  background: #ffffff;
  color: #000;
  font-size: 18px;
  padding: 10px 40px;
  :hover {
    background-color: #656565;
    color: #fff;
  }
`;
const PhotoBox = styled.div`
  flex-shrink: 1;
  margin-left: 6%;
  img {
    width: 100%;
  }
  ${device.PC`margin-left: 0; flex-basis : 50%;`}
  ${device.PC767`flex-basis : 100%;order: 1;margin-left: 0;`}
`;
const Photo = styled.img.attrs(props => ({ src: props.theme.file.photo }))``;
export default ({ location }) => {
  const { lang } = useContext(LangContext);
  const what = useRef(null);
  useEffect(() => {
    if (location.hash === "#what") {
      what.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <Section ref={what}>
      <Container>
        <ContentBox>
          <Desc>
            <h2>{lang.what01}</h2>
            <p>{lang.what02}</p>
            <PageMoveBox>
              <PageMove to="/timeline">{lang.what03}</PageMove>
            </PageMoveBox>
          </Desc>
          <PhotoBox>
            <Photo />
          </PhotoBox>
        </ContentBox>
      </Container>
    </Section>
  );
};
