import {
  MEDIA_LOAD_MAIN,
  MEDIA_FAIL_MAIN,
  MEDIA_LOAD_MEDIA
} from "../Actions/type";

const initialState = {
  media: [],
  error: null,
  loading: true
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MEDIA_LOAD_MAIN:
    case MEDIA_LOAD_MEDIA:
      return { ...state, media: payload, loading: false };
    case MEDIA_FAIL_MAIN:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
