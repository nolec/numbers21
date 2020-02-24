import React, { useState, useEffect } from "react";
import ReactSummernote from "../../Utils/summernote";
import "summernote/dist/summernote.css";
// import "summer/dist/react-summernote.css"; // import styles
import "../../Utils/lang/summernote-ko-KR"; // you can import any other locale
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import FileUpload from "./Write/FileUpload";
import { Link } from "react-router-dom";
import { writeBoard, updateBoard } from "../../Actions/board";

const Title = styled.div`
  margin-bottom: 1rem;
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
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
export default ({ write, update }) => {
  const dispatch = useDispatch();
  const { detail, loading, files } = useSelector(state => ({
    detail: state.board.detail,
    loading: state.board.loading,
    files: state.board.files
  }));
  const [writeFile, setWrtieFile] = useState({
    fileUpload1: "",
    fileUpload2: "",
    fileUpload3: ""
  });
  const [updateFile, setUpdateFile] = useState({
    fileUpload1: "",
    fileUpload2: "",
    fileUpload3: ""
  });
  ///////////////////////////////////////////////////////////////////
  const [summerContent, setSummerContent] = useState({ contents: "" });
  const [formData, setFormData] = useState({
    type: write && write.type,
    title: ""
  });
  const [updateData, setUpdateData] = useState({
    type: update && update.type,
    list: update && update.list,
    title: detail && detail.title
  });
  ///////////////////////////////////////////////////////////////////
  const onImageUpload = (images, insertImage) => {
    console.log("onImageUpload", images);
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };
      reader.readAsDataURL(images[i]);
    }
  };
  ///////////////////////////////////////////////////////////////////
  const titleHandle = e => {
    if (detail && update) {
      setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  ///////////////////////////////////////////////////////////////////
  const onChange = contents => {
    console.log(contents);
    setSummerContent({ contents: contents.toString() });
  };
  ///////////////////////////////////////////////////////////////////
  const submitHandle = () => {
    const u = window.confirm("등록하시겠습니까?");
    if (u) {
      Object.assign(formData, summerContent);
      console.log(formData, "writeFile", writeFile);
      dispatch(writeBoard(formData, write.history, writeFile));
    } else {
      return false;
    }
  };
  ///////////////////////////////////////////////////////////////////
  const updateHandle = () => {
    const u = window.confirm("수정하시겠습니까?");
    if (u) {
      Object.assign(updateData, summerContent);
      console.log(updateData);

      dispatch(updateBoard(updateData, update.history, updateFile));
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (detail && update) {
      console.log(detail.content);
      ReactSummernote.pasteHTML(detail && detail.content);
    }
  }, [detail]);
  return (
    <>
      <Title>
        <label htmlFor="input">Title</label>
        <Input
          name="title"
          onChange={e => titleHandle(e)}
          value={update && update.update ? updateData.title : formData.title}
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
      <FileUpload
        write={write && write.write}
        writeFile={write && writeFile}
        setWrtieFile={write && setWrtieFile}
        updateFile={update && updateFile}
        setUpdateFile={update && setUpdateFile}
        update={update && update.update}
        file={files}
      />
      <BtnBox>
        <Back
          to={
            update && update.update
              ? `/investor/${updateData.type}`
              : `/investor/${formData.type}`
          }
        >
          목록보기
        </Back>
        {update && update.update ? (
          <Btn onClick={updateHandle}>수정하기</Btn>
        ) : (
          <Btn onClick={submitHandle}>등록하기</Btn>
        )}
      </BtnBox>
    </>
  );
};
