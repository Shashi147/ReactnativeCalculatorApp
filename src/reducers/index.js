import calculationReducer from "./calculationReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  calculations: calculationReducer
});
export default rootReducer;
