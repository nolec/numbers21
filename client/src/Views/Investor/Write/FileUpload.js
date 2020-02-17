import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { uploadFile } from "../../../Actions/board";
import { useDispatch } from "react-redux";

const FileBox = styled.div`
  margin-top: 1rem;
  position: relative;
`;
const FileGroup = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;
const File = styled.input`
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
export default ({ send }) => {
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const [files, setFiles] = useState({
    fileUpload1: "",
    fileUpload2: "",
    fileUpload3: ""
  });
  const [names, setNames] = useState({
    fileUpload1: "",
    fileUpload2: "",
    fileUpload3: ""
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
  const fileDelete = e => {
    e.preventDefault();
    if (
      e.currentTarget.parentElement.parentElement.firstChild.id ===
      e.currentTarget.htmlFor
    ) {
      setFiles({ ...files, [e.currentTarget.htmlFor]: "" });
      setNames({ ...names, [e.currentTarget.htmlFor]: "" });
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
        setFiles({ ...files, fileUpload1: e.currentTarget.files });
      }
      if (e.currentTarget.id === "fileUpload2") {
        setFiles({ ...files, fileUpload2: e.currentTarget.files });
      }
      if (e.currentTarget.id === "fileUpload3") {
        setFiles({ ...files, fileUpload3: e.currentTarget.files });
      }
    }
  };
  useEffect(() => {
    if (send) {
      if (
        files.fileUpload1 !== "" ||
        files.fileUpload2 !== "" ||
        files.fileUpload3 !== ""
      ) {
        console.log("보내자!!");
        dispatch(uploadFile(files));
      }
    }
  }, [send]);
  return (
    <FileBox ref={fileInput}>
      <FileGroup>
        <File type="file" id="fileUpload1" onChange={onChange} />
        <StyleFile>
          <TextInput
            type="text"
            id="fileUpload1"
            disabled={true}
            value={names.fileUpload1}
          />
          <Btn>
            {files.fileUpload1 === "" ? (
              <Label htmlFor="fileUpload1" red={false} onClick={fileOpen}>
                <span>파일첨부</span>
              </Label>
            ) : (
              <Label htmlFor="fileUpload1" red={true} onClick={fileDelete}>
                <span>삭제하기</span>
              </Label>
            )}
          </Btn>
        </StyleFile>
      </FileGroup>
      <FileGroup>
        <File type="file" id="fileUpload2" onChange={onChange} />
        <StyleFile>
          <TextInput
            type="text"
            id="fileUpload2"
            disabled={true}
            value={names.fileUpload2}
          />
          <Btn>
            {files.fileUpload2 === "" ? (
              <Label htmlFor="fileUpload2" red={false} onClick={fileOpen}>
                <span>파일첨부</span>
              </Label>
            ) : (
              <Label htmlFor="fileUpload2" red={true} onClick={fileDelete}>
                <span>삭제하기</span>
              </Label>
            )}
          </Btn>
        </StyleFile>
      </FileGroup>
      <FileGroup>
        <File type="file" id="fileUpload3" onChange={onChange} />
        <StyleFile>
          <TextInput
            type="text"
            id="fileUpload3"
            disabled={true}
            value={names.fileUpload3}
          />
          <Btn>
            {files.fileUpload3 === "" ? (
              <Label htmlFor="fileUpload3" red={false} onClick={fileOpen}>
                <span>파일첨부</span>
              </Label>
            ) : (
              <Label htmlFor="fileUpload3" red={true} onClick={fileDelete}>
                <span>삭제하기</span>
              </Label>
            )}
          </Btn>
        </StyleFile>
      </FileGroup>
    </FileBox>
  );
};
