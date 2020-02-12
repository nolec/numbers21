import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { LangContext } from "../../../Context";
import { useDispatch, useSelector } from "react-redux";
import { detailBoard } from "../../../Actions/board";

const ContentBox = styled.div``;
const Header = styled.div`
  border-bottom: 1px solid #d3d3d3;
  display: flex;
`;
const Title = styled.div`
  text-align: left;
  padding: 10px 10px;
  font-size: 20px;
  font-weight: 500;
  width: 80%;
`;
const Date = styled.div`
  position: relative;
  text-align: right;
  padding: 5px 12px;
  font-size: 16px;
  vertical-align: text-bottom;
  color: #777;
  width: 20%;
  span {
    position: absolute;
    right: 15px;
    bottom: 10px;
  }
`;
const Body = styled.div`
  padding: 40px 15px;
  border-bottom: 1px solid #d3d3d3;
`;
const Desc = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;
export default ({ match }) => {
  const { lang } = useContext(LangContext);
  const dispatch = useDispatch();
  const { detail } = useSelector(state => ({ detail: state.board.detail }));
  console.log(detail);
  const {
    params: { type, list }
  } = match;
  const formData = {
    type,
    list
  };
  useEffect(() => {
    dispatch(detailBoard(formData));
    if (detail) {
      const desc = document.querySelector(".desc");
      desc.innerHTML = detail.content;
    }
  }, [dispatch]);
  return (
    <ContentBox>
      <Header>
        <Title>
          <span>{detail && detail.title}</span>
        </Title>
        <Date>
          <span>{detail && detail.regDate}</span>
        </Date>
      </Header>
      <Body>
        <Desc className="desc"></Desc>
      </Body>
    </ContentBox>
  );
};
