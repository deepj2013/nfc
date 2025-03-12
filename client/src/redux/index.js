// Package Imports
import { combineReducers } from "redux";
import authState from "./slice/authSlice";
import userState from "./slice/userSlice";
import categoryState from "./slice/CategorySlice";
import inventaryState from "./slice/inventarySlice";
import adminState from "./slice/adminSlice";
import userStateMangementState from "./slice/userManagementSlice";
import organisationMangementState from "./slice/organisationMangementSlice";
import facilityState from "./slice/facilitySlice";
import restaurantReducer from "./slice/restaurantSlice"; 
import restauarantmenu from "./slice/restaurantMenuSlice";




export default combineReducers({
  authState,
  userState,
  categoryState,
  inventaryState,
  adminState,
  userStateMangementState,
  organisationMangementState,
  facilityState,
  restaurant: restaurantReducer,
  menu: restauarantmenu,
});
