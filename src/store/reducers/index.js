import { combineReducers } from "redux";
import news from "./newsReducer";
import products from "./productReducer";
const reducers = combineReducers({
  news,
  products,
});

export default reducers;
