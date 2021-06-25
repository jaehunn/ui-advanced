import { combineReducers } from "redux";
import { items } from "./items";

// combineReducers() 로 reducer 들을 묶어 다시 export 한다.
export default combineReducers({
  items,
});
