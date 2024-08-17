// Package Imports
import { combineReducers } from 'redux';
import authState from './slice/authSlice';
import userState from './slice/userSlice';
export default combineReducers({
    authState,
    userState
 });
