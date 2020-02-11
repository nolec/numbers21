import { combineReducers } from "redux";
import press from "./press";
import media from "./media";

const rootReducer = combineReducers({ press, media });

export default rootReducer;
