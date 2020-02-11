import { PRESS_LOAD_MAIN, PRESS_FAIL_MAIN } from "../Actions/type";

const initialState = {
  press: [],
  error: null,
  loading: true
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRESS_LOAD_MAIN:
      return { ...state, press: payload, loading: false };
    case PRESS_FAIL_MAIN:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
