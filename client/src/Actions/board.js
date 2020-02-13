import {
  BOARD_LOAD,
  BOARD_FAIL,
  BOARD_DETAIL_LOAD,
  BOARD_WRITE_SUCCESS
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
