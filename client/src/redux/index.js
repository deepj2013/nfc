// Package Imports
import { combineReducers } from "redux";
import authState from "./slice/authSlice";
import userState from "./slice/userSlice";
import categoryState from "./slice/CategorySlice";
import inventaryState from "./slice/inventarySlice";
import adminState from "./slice/adminSlice";
import userStateMangementState from "./slice/userManagementSlice";
import organisationMangementState from "./slice/organisationMangementSlice";
export default combineReducers({
  authState,
  userState,
  categoryState,
  inventaryState,
  adminState,
  userStateMangementState,
  organisationMangementState
});
