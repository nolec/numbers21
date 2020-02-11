import React, { useContext } from "react";
import styled from "styled-components";
import { LangContext } from "../../../../Context";
import { Link } from "react-router-dom";

const Section = styled.section`
  ${props => props.theme.styles.SectionStyle};
  padding: 145px 0;
  background: #000;
`;
const Container = styled.div`
  ${props => props.theme.styles.ContainerStyle};
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
  }
  p {
    margin-bottom: 30px;
  }
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
`;
const Photo = styled.img.attrs(props => ({ src: props.theme.file.photo }))``;
export default () => {
  const { lang } = useContext(LangContext);
  return (
    <Section>
      <Container>
        <ContentBox>
          <Desc>
            <h2>{lang.what01}</h2>
            <p>{lang.what02}</p>
            <PageMoveBox>
              <PageMove>{lang.what03}</PageMove>
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
