import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { LangContext } from "../../../Context";
import { useDispatch, useSelector } from "react-redux";
import { detailBoard } from "../../../Actions/board";
import { Link } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";

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
const Footer = styled.div`
  position: relative;
  margin-top: 20px;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
  > div {
  }
`;
const Back = styled(Link)`
  background-color: #000;
  color: #fff;
  padding: 8px 20px;
  font-size: 18px;
  :hover {
    background: #fff;
    color: #000;
    border: 1px solid #a6a6a6;
  }
`;
const BtnBox = styled.div`
  display: flex;
`;
const useStyles = makeStyles({
  root: {
    fontSize: "18px",
    padding: ".25rem .5rem",
    minWidth: "auto",
    fontWeight: 600
  }
});
export default ({ match, history }) => {
  const classes = useStyles();
  const { lang } = useContext(LangContext);
  const dispatch = useDispatch();
  const { detail } = useSelector(state => ({ detail: state.board.detail }));
  const {
    params: { type, list }
  } = match;
  const formData = {
    type,
    list
  };
  const innerHtml = text => {
    return { __html: text };
  };
  const updateHandle = () => {
    const u = window.confirm("수정하시겠습니까?");
    if (u) {
      history.push(`/investor/update/${type}/${list}`);
    } else {
      return false;
    }
  };
  const deleteHandle = () => {
    const d = window.confirm("삭제하시겠습니까?");
    if (d) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    dispatch(detailBoard(formData));
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
        <Desc
          className="desc"
          dangerouslySetInnerHTML={detail && innerHtml(detail.content)}
        ></Desc>
      </Body>
      <Footer>
        <BtnBox>
          <Button
            variant="contained"
            color="primary"
            className={classes.root}
            onClick={updateHandle}
          >
            수정
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.root}
            onClick={deleteHandle}
          >
            삭제
          </Button>
        </BtnBox>
        <Back to="/investor">{lang.detail01}</Back>
      </Footer>
    </ContentBox>
  );
};
