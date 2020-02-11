import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./Reducers";

const state = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  state,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
