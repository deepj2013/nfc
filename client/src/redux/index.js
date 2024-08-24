// Package Imports
import { combineReducers } from "redux";
import authState from "./slice/authSlice";
import userState from "./slice/userSlice";
import categoryState from "./slice/CategorySlice";
import inventaryState from "./slice/inventarySlice";
export default combineReducers({
  authState,
  userState,
  categoryState,
  inventaryState,
});
