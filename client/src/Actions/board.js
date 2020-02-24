import {
  BOARD_LOAD,
  BOARD_FAIL,
  BOARD_DETAIL_LOAD,
  BOARD_WRITE_SUCCESS,
  BOARD_UPDATE_SUCCESS,
  BOARD_DELETE_SUCCESS,
  BOARD_FILE_UPLOAD,
  BOARD_DOWNLOAD_FILE,
  BOARD_FILE_DELETE,
  BOARD_HIT_REGIST
} from "./type";
import axios from "axios";

export const getBoard = formData => async dispatch => {
  const { type, page } = formData;
  console.log(type, page);
  try {
    const res = await axios.get(`/api/board/${type}/${page}`);
    dispatch({ type: BOARD_LOAD, payload: res.data });
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};

export const detailBoard = formData => async dispatch => {
  const { type, list } = formData;
  try {
    const res = await axios.get(`/api/board/detail/${type}/${list}`);
    dispatch({ type: BOARD_DETAIL_LOAD, payload: res.data });
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
export const writeBoard = (formData, history, writeFile) => async dispatch => {
  console.log(formData, "actions", writeFile);
  try {
    const res = await axios.post("/api/board/write", formData);
    console.log(res.date, "actions");
    if (res.data.success) {
      alert("등록 완료");
      await dispatch(uploadFile(writeFile, res.data.last_insert_id));
      await dispatch({ type: BOARD_WRITE_SUCCESS, payload: res.data });
      return history.push(`/investor/${formData.type}`);
    } else {
      alert("등록 실패");
      return Error("Error");
    }
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
export const updateBoard = (
  formData,
  history,
  updateFile
) => async dispatch => {
  try {
    const res = await axios.post("/api/board/update", formData);
    if (res.data.success) {
      alert("수정 완료");
      await dispatch(uploadFile(updateFile, formData.list));
      await dispatch({ type: BOARD_UPDATE_SUCCESS, payload: res.data });
      return history.push(`/investor/${formData.type}`);
    } else {
      alert("수정 실패");
      return Error("Error");
    }
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
export const deletBoard = (type, list, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/board/delete/${type}/${list}`);
    if (res.data.success) {
      alert("삭제 완료");
      dispatch({ type: BOARD_DELETE_SUCCESS, payload: res.data });
      return history.push(`/investor/${type}`);
    } else {
      alert("삭제 실패");
      return Error("Error");
    }
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
export const uploadFile = (files, list) => async dispatch => {
  const { fileUpload1, fileUpload2, fileUpload3 } = files;
  const uploadFile = new FormData();
  const config = {
    header: {
      "content-type": "multipart/form-data"
    }
  };
  console.log(typeof fileUpload3[0]);
  if (fileUpload1 !== "" && typeof fileUpload1 === "object")
    uploadFile.append("file", fileUpload1[0]);
  if (fileUpload2 !== "" && typeof fileUpload2 === "object")
    uploadFile.append("file", fileUpload2[0]);
  if (fileUpload3 !== "" && typeof fileUpload3 === "object")
    uploadFile.append("file", fileUpload3[0]);
  console.log(fileUpload1, uploadFile);
  try {
    const res = await axios.post(`/api/board/upload`, uploadFile, config);
    console.log(res.data);
    if (res.data.success) {
      if (res.data.files && res.data.files[0])
        await axios.post(`/api/board/sql/upload/${list}`, res.data.files[0]);
      if (res.data.files && res.data.files[1])
        await axios.post(`/api/board/sql/upload/${list}`, res.data.files[1]);
      if (res.data.files && res.data.files[2])
        await axios.post(`/api/board/sql/upload/${list}`, res.data.files[2]);
    } else {
      throw Error;
    }
    dispatch({ type: BOARD_FILE_UPLOAD, payload: res.data });
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
export const deleteFile = idx => async dispatch => {
  const parseIdx = parseInt(idx);
  try {
    const res = await axios.delete(`/api/board/delete/update/file/${parseIdx}`);
    if (res.data._return === 1) {
      alert("삭제되었습니다.");
      dispatch({ type: BOARD_FILE_DELETE, payload: res.data });
    } else {
      throw Error;
    }
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
export const downloadFile = list => async dispatch => {
  try {
    const res = await axios({
      url: `http://localhost:5000/server/uploads/20200217153446494.png`,
      method: "GET",
      responseType: "blob"
    });
    let fileReader = new FileReader();
    fileReader.readAsDataURL(res.data);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const res2 = await axios.get(`/api/board/download/file/${list}`);
    console.log(fileReader, res.data, res2.data);
    dispatch({ type: BOARD_DOWNLOAD_FILE, payload: res2.data });
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
export const registHit = formData => async dispatch => {
  try {
    const res = await axios.post(`/api/board/hit/regist`, formData);
    dispatch({ type: BOARD_HIT_REGIST, payload: res.data });
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
