import { combineReducers } from "redux";
import press from "./press";
import media from "./media";
import board from "./board";

const rootReducer = combineReducers({ press, media, board });

export default rootReducer;
