import axios from "axios";
import { PRESS_LOAD_MAIN, PRESS_FAIL_MAIN } from "./type";

export const mainPress = () => async dispatch => {
  try {
    const res = await axios.get("api/press/main");
    dispatch({ type: PRESS_LOAD_MAIN, payload: res.data });
  } catch (error) {
    dispatch({ type: PRESS_FAIL_MAIN, payload: "---실패---" });
  }
};
