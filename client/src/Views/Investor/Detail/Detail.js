import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { LangContext } from "../../../Context";
import { useDispatch, useSelector } from "react-redux";
import {
  detailBoard,
  deletBoard,
  downloadFile,
  registHit
} from "../../../Actions/board";
import { Link } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import Download from "../Download";
import { device } from "../../../device";

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
  ${device.PC990`font-size : 14px;width : 100%;`}
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
  p {
    font-size: 18px;
  }
`;
const FileBox = styled.div`
  border-bottom: 1px solid #d3d3d3;
  width: 100%;
  padding: 10px 10px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  span {
    font-weight: bold;
  }
  a {
    color: #000;
    padding-left: 10px;
    font-size: 15px;
    display: flex;
    align-items: center;
  }
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
  const { detail, files, ip } = useSelector(state => ({
    detail: state.board.detail,
    files: state.board.files,
    ip: state.board.ip
  }));
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
      dispatch(deletBoard(type, list, history));
    }
    return false;
  };
  useEffect(() => {
    dispatch(detailBoard(formData));
    dispatch(registHit(formData));
  }, [dispatch]);
  useEffect(() => {
    dispatch(downloadFile(list));
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
      {files.length > 0 &&
        files.map((file, i) => (
          <FileBox key={i}>
            <span>첨부파일{i + 1}.</span>
            <Download
              list={formData.list}
              filename={file.filename}
              orgName={file.original_filename}
            />
          </FileBox>
        ))}
      <Footer>
        <BtnBox>
          {ip ? (
            <>
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
            </>
          ) : null}
        </BtnBox>
        <Back to={`/investor/${formData.type}`}>{lang.detail01}</Back>
      </Footer>
    </ContentBox>
  );
};
