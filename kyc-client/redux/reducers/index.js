import { combineReducers } from "redux";
import errorReducers from "./errorReducers";
import authReducers from "./authReducers";
import genericReducer from "./genericReducer";

export default combineReducers({
  errors: errorReducers,
  auth: authReducers,
  generic: genericReducer,
});
