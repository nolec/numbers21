import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactSummernote from "../../../Utils/summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import "../../../Utils/lang/summernote-ko-KR"; // you can import any other locale
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { writeBoard } from "../../../Actions/board";
import FileUpload from "./FileUpload";

const Write = styled.div``;
const Title = styled.div`
  margin-bottom: 1rem;
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
`;
const Content = styled.div`
  .fullscreen {
    background-color: #fff;
  }
  .panel-heading.note-toolbar .dropdown-menu {
    min-width: auto;
    a {
      white-space: nowrap;
    }
  }
  .note-btn-group + .btn-group,
  .note-btn-group .btn-group {
    button {
      border: 1px solid;
    }
  }
  .dropdown-toggle::after {
    content: none;
  }
`;
const Input = styled.input`
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;
const BtnBox = styled.div`
  display: flex;
  width: 100%;
  text-align: right;
  margin: 10px auto;
  padding-right: 15px;
  flex-direction: row;
  justify-content: flex-end;
`;
const Back = styled(Link)`
  display: inline-block;
  all: unset;
  cursor: pointer;
  background-color: #000;
  color: #fff;
  padding: 8px 20px;
  font-size: 18px;
  transition: 0.2s linear;
  border: 1px solid;
  :hover {
    background: #fff;
    color: #000;
  }
`;
const Btn = styled(Back.withComponent("button"))``;

export default ({
  type,
  history,
  update,
  updateHandle,
  updateData,
  setUpdateData,
  setContent
}) => {
  const dispatch = useDispatch();
  const { detail, loading, files } = useSelector(state => ({
    detail: state.board.detail,
    loading: state.board.loading,
    files: state.board.files
  }));
  //Update list 가져오기
  const [send, setSend] = useState(false);
  //Write Data-------------------------------------------------------------------
  const [formData, setFormData] = useState({
    type: type,
    title: ""
  });
  const [writeContent, setWrtieContent] = useState({ contents: "" });

  const titleHandle = e => {
    if (update && detail) {
      setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    } else {
      console.log(e.target.value);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  //Summernote Onchange--------------------------------------------------------------------
  const onChange = contents => {
    if (update && detail) {
      setContent({ contents: contents.toString() });
    } else {
      setWrtieContent({ contents: contents.toString() });
    }
  };
  const onImageUpload = (images, insertImage) => {
    console.log("onImageUpload", images);
    /* FileList does not support ordinary array methods */
    for (let i = 0; i < images.length; i++) {
      /* Stores as bas64enc string in the text.
       * Should potentially be stored separately and include just the url
       */
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };
      reader.readAsDataURL(images[i]);
    }
  };
  const submitHandle = () => {
    const u = window.confirm("등록하시겠습니까?");
    if (u) {
      Object.assign(formData, writeContent);
      console.log(formData);
      setSend(true);
      // dispatch(writeBoard(formData, history));
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (send) {
      setSend(false);
    }
  }, [send]);
  return (
    <Write>
      <Title>
        <label htmlFor="input">Title</label>
        <Input
          name="title"
          onChange={e => titleHandle(e)}
          value={update ? updateData.title : formData.title}
          type="text"
        />
      </Title>
      <Content>
        <label htmlFor="contents">Contents</label>
        <ReactSummernote
          value="Default"
          options={{
            lang: "ko-KR",
            height: 700,
            dialogsInBody: true,
            toolbar: [
              ["style", ["style"]],
              ["font", ["bold", "underline", "clear"]],
              ["fontname", ["fontname"]],
              ["para", ["ul", "ol", "paragraph"]],
              ["table", ["table"]],
              ["insert", ["link", "picture", "video"]],
              ["view", ["fullscreen", "codeview"]]
            ]
          }}
          onChange={e => onChange(e)}
          onImageUpload={onImageUpload}
        />
      </Content>
      <FileUpload send={send} file={files} />
      <BtnBox>
        <Back to="/investor">목록보기</Back>
        {update ? (
          <Btn onClick={updateHandle}>수정하기</Btn>
        ) : (
          <Btn onClick={submitHandle}>등록하기</Btn>
        )}
      </BtnBox>
    </Write>
  );
};
