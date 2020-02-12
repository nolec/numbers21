import { BOARD_LOAD, BOARD_FAIL, BOARD_DETAIL_LOAD } from "./type";
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
  console.log(type, list);
  try {
    const res = await axios.get(`/api/board/detail/${type}/${list}`);
    dispatch({ type: BOARD_DETAIL_LOAD, payload: res.data });
  } catch (error) {
    dispatch({ type: BOARD_FAIL, payload: error });
  }
};
