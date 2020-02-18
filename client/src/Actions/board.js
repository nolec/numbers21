import {
  BOARD_LOAD,
  BOARD_FAIL,
  BOARD_DETAIL_LOAD,
  BOARD_WRITE_SUCCESS,
  BOARD_UPDATE_SUCCESS,
  BOARD_DELETE_SUCCESS,
  BOARD_FILE_UPLOAD,
  BOARD_DOWNLOAD_FILE
} from "./type";
import axios from "axios";

export const getBoard = formData => async dispatch => {
  const { type, page } = formData;
  try {
    const res = await axios.get(`api/board/${type}/${page}`);
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
export const writeBoard = (formData, history) => async dispatch => {
  console.log(formData, "actions");
  try {
    const res = await axios.post("/api/board/write", formData);
    console.log(res.data);
    if (res.data.success) {
      alert("등록 완료");
      dispatch({ type: BOARD_WRITE_SUCCESS, payload: res.data });
      return history.push("/investor");
    } else {
      alert("등록 실패");
      return Error("Error");
    }
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
export const updateBoard = (formData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/board/update", formData);
    if (res.data.success) {
      alert("수정 완료");
      dispatch({ type: BOARD_UPDATE_SUCCESS, payload: res.data });
      return history.push("/investor");
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
      return history.push("/investor");
    } else {
      alert("삭제 실패");
      return Error("Error");
    }
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
export const uploadFile = files => async dispatch => {
  const { fileUpload1, fileUpload2, fileUpload3 } = files;
  const uploadFile = new FormData();
  const config = {
    header: {
      "content-type": "multipart/form-data"
    }
  };
  if (fileUpload1 !== "") uploadFile.append("file", fileUpload1[0]);
  if (fileUpload2 !== "") uploadFile.append("file", fileUpload2[0]);
  if (fileUpload3 !== "") uploadFile.append("file", fileUpload3[0]);
  console.log(fileUpload1, uploadFile);
  try {
    const res = await axios.post(`/api/board/upload`, uploadFile, config);
    console.log(res.data);
    if (res.data.success) {
      await axios.post(`/api/board/sql/upload`, res.data.files[0]);
    } else {
      throw Error;
    }
    dispatch({ type: BOARD_FILE_UPLOAD, payload: res.data });
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
