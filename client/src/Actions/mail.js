import { MAIL_FAIL, MAIL_SUCCESS } from "./type";
import axios from "axios";

export const mailPost = formData => async dispatch => {
  try {
    const res = await axios.post(`/api/mail/send`, formData);
    if (res.data.success) {
      alert("메일이 성공적으로 보내졌습니다.");
    } else {
      alert("메일 전송이 실패하였습니다.");
    }
    dispatch({ type: MAIL_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: MAIL_FAIL, payload: error });
  }
};
