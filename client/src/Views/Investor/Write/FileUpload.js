import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { uploadFile, writeBoard, deleteFile } from "../../../Actions/board";
import { useDispatch, useSelector } from "react-redux";

const FileBox = styled.div`
  margin-top: 1rem;
  position: relative;
`;
const FileGroup = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;
const FileItem = styled.input`
  position: absolute;
  clip: rect(0px, 0px, 0px, 0px);
`;
const StyleFile = styled.div`
  align-items: stretch;
  width: 100%;
  display: flex;
`;
const TextInput = styled.input`
  display: block;
  width: 100%;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  background-color: #e9ecef;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-clip: padding-box;
  border: 1px solid #ced4da;
`;
const Btn = styled.span``;
const Label = styled.label`
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  color: #fff;
  background-color: ${props => (props.red ? "#ff0000;" : "#007bff;")};
  border-color: ${props => (props.red ? "#ff0000;" : "#007bff;")};
  :hover {
    background-color: ${props => (props.red ? "#ff0000;" : "#007bff;")};
    border-color: ${props => (props.red ? "#ff0000;" : "#007bff;")};
  }
`;
export default ({
  write,
  file,
  update,
  setWrtieFile,
  writeFile,
  updateFile,
  setUpdateFile
}) => {
  const fileInput = useRef(null);
  const dispatch = useDispatch();

  const [names, setNames] = useState({
    fileUpload1: "",
    fileUpload2: "",
    fileUpload3: ""
  });
  const [idx, setIdx] = useState({
    fileUpload1: file[0] && file[0].idx,
    fileUpload2: file[1] && file[1].idx,
    fileUpload3: file[2] && file[2].idx
  });
  const fileOpen = e => {
    e.preventDefault();
    console.log(
      e.currentTarget.parentElement.parentElement.parentElement,
      e.currentTarget.htmlFor
    );
    if (
      e.currentTarget.parentElement.parentElement.firstChild.id ===
      e.currentTarget.htmlFor
    ) {
      e.currentTarget.parentElement.parentElement.parentElement.firstChild.click();
    }
  };
  const fileDelete = (e, idx) => {
    e.preventDefault();
    console.log(file, idx, e.currentTarget);
    const d = window.confirm("삭제하시겠습니까?");
    if (d) {
      if (
        e.currentTarget.parentElement.parentElement.firstChild.id ===
        e.currentTarget.htmlFor
      ) {
        if (write) {
          setWrtieFile({ ...writeFile, [e.currentTarget.htmlFor]: "" });
        } else if (update) {
          dispatch(deleteFile(idx));
          setUpdateFile({ ...updateFile, [e.currentTarget.htmlFor]: "" });
        }
        setNames({ ...names, [e.currentTarget.htmlFor]: "" });
      }
    } else {
      return false;
    }
  };
  const onChange = e => {
    let filename = e.target.value.split("\\")[
      e.target.value.split("\\").length - 1
    ];
    e.currentTarget.parentElement.children[1].firstChild.value = filename;
    setNames({ ...names, [e.currentTarget.id]: filename });
    if (filename !== "") {
      if (e.currentTarget.id === "fileUpload1") {
        if (write) {
          setWrtieFile({ ...writeFile, fileUpload1: e.currentTarget.files });
        } else if (update) {
          setUpdateFile({ ...updateFile, fileUpload1: e.currentTarget.files });
        }
      }
      if (e.currentTarget.id === "fileUpload2") {
        if (write) {
          setWrtieFile({ ...writeFile, fileUpload2: e.currentTarget.files });
        } else if (update) {
          setUpdateFile({ ...updateFile, fileUpload2: e.currentTarget.files });
        }
      }
      if (e.currentTarget.id === "fileUpload3") {
        if (write) {
          setWrtieFile({ ...writeFile, fileUpload3: e.currentTarget.files });
        } else if (update) {
          setUpdateFile({ ...updateFile, fileUpload3: e.currentTarget.files });
        }
      }
    }
  };
  useEffect(() => {
    if (write) {
      console.log("wirte : ", write, file);
    }
    if (update) {
      console.log("update : ", update, file);
    }
  }, []);

  useEffect(() => {
    if (file && file.length > 0) {
      if (write) {
        setWrtieFile({
          fileUpload1: file[0] && file[0] !== "" ? file[0].filename : "",
          fileUpload2: file[1] && file[1] !== "" ? file[1].filename : "",
          fileUpload3: file[2] && file[2] !== "" ? file[2].filename : ""
        });
      } else if (update) {
        setUpdateFile({
          fileUpload1: file[0] && file[0] !== "" ? file[0].filename : "",
          fileUpload2: file[1] && file[1] !== "" ? file[1].filename : "",
          fileUpload3: file[2] && file[2] !== "" ? file[2].filename : ""
        });
        setNames({
          fileUpload1:
            file[0] && file[0] !== "" ? file[0].original_filename : "",
          fileUpload2:
            file[1] && file[1] !== "" ? file[1].original_filename : "",
          fileUpload3:
            file[2] && file[2] !== "" ? file[2].original_filename : ""
        });
      }
    }
  }, []);
  console.log(names, writeFile, updateFile, "fileupload-----------");
  return (
    <FileBox ref={fileInput}>
      <FileGroup>
        <FileItem type="file" id="fileUpload1" onChange={onChange} />
        <StyleFile>
          <TextInput
            type="text"
            id="fileUpload1"
            disabled={true}
            value={names.fileUpload1}
          />
          <Btn>
            {names.fileUpload1 === "" ? (
              <Label htmlFor="fileUpload1" red={false} onClick={fileOpen}>
                <span>파일첨부</span>
              </Label>
            ) : (
              <Label
                htmlFor="fileUpload1"
                red={true}
                onClick={e => fileDelete(e, idx && idx.fileUpload1)}
              >
                <span>삭제하기</span>
              </Label>
            )}
          </Btn>
        </StyleFile>
      </FileGroup>
      <FileGroup>
        <FileItem type="file" id="fileUpload2" onChange={onChange} />
        <StyleFile>
          <TextInput
            type="text"
            id="fileUpload2"
            disabled={true}
            value={names.fileUpload2}
          />
          <Btn>
            {names.fileUpload2 === "" ? (
              <Label htmlFor="fileUpload2" red={false} onClick={fileOpen}>
                <span>파일첨부</span>
              </Label>
            ) : (
              <Label
                htmlFor="fileUpload2"
                red={true}
                onClick={e => fileDelete(e, idx && idx.fileUpload2)}
              >
                <span>삭제하기</span>
              </Label>
            )}
          </Btn>
        </StyleFile>
      </FileGroup>
      <FileGroup>
        <FileItem type="file" id="fileUpload3" onChange={onChange} />
        <StyleFile>
          <TextInput
            type="text"
            id="fileUpload3"
            disabled={true}
            value={names.fileUpload3}
          />
          <Btn>
            {names.fileUpload3 === "" ? (
              <Label htmlFor="fileUpload3" red={false} onClick={fileOpen}>
                <span>파일첨부</span>
              </Label>
            ) : (
              <Label
                htmlFor="fileUpload3"
                red={true}
                onClick={e => fileDelete(e, idx && idx.fileUpload3)}
              >
                <span>삭제하기</span>
              </Label>
            )}
          </Btn>
        </StyleFile>
      </FileGroup>
    </FileBox>
  );
};
