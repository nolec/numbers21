import React, { useEffect, useState } from "react";
import Write from "../Write";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import ReactSummernote from "../../../Utils/summernote";
import { updateBoard } from "../../../Actions/board";

export default ({ match, history }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector(state => ({
    detail: state.board.detail
  }));
  const {
    params: { type, list }
  } = match;

  const [updateData, setUpdateData] = useState({
    type: type,
    list: list,
    title: detail && detail.title
  });
  const [content, setContent] = useState({ contents: "" });
  const updateHandle = () => {
    const u = window.confirm("수정하시겠습니까?");
    if (u) {
      Object.assign(updateData, content);
      console.log(updateData);

      dispatch(updateBoard(updateData, history));
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (detail) {
      ReactSummernote.pasteHTML(detail && detail.content);
    }
  }, [detail]);
  if (detail === null || !detail) {
    return <Redirect to="/investor" />;
  }
  return (
    <>
      <Write
        update={true}
        updateHandle={updateHandle}
        updateData={updateData}
        setUpdateData={setUpdateData}
        setContent={setContent}
      />
    </>
  );
};
