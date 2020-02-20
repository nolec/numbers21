import {
  BOARD_FAIL,
  BOARD_LOAD,
  BOARD_DETAIL_LOAD,
  BOARD_WRITE_SUCCESS,
  BOARD_UPDATE_SUCCESS,
  BOARD_DELETE_SUCCESS,
  BOARD_FILE_UPLOAD,
  BOARD_DOWNLOAD_FILE,
  BOARD_HIT_REGIST
} from "../Actions/type";

const initialState = {
  board: [],
  files: [],
  detail: null,
  error: null,
  loading: true
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOARD_LOAD:
      return {
        ...state,
        board: payload.result,
        loading: false,
        ip: payload.ip
      };
    case BOARD_DETAIL_LOAD:
      return {
        ...state,
        detail: payload.result.shift(),
        loading: false,
        ip: payload.ip
      };
    case BOARD_WRITE_SUCCESS:
    case BOARD_UPDATE_SUCCESS:
    case BOARD_DELETE_SUCCESS:
      return {
        ...state,
        id: payload.last_insert_id,
        success: payload.success,
        loading: false
      };
    case BOARD_DOWNLOAD_FILE:
      return {
        ...state,
        files: payload,
        loading: false
      };
    case BOARD_FILE_UPLOAD:
      return {
        ...state,
        success: payload.success,
        files: payload,
        loading: false
      };
    case BOARD_HIT_REGIST:
      return { ...state, return: payload.shift()._return };
    case BOARD_FAIL:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
