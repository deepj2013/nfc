// authServices.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/Axios";
import { BASE_URL, MEMBER_URL } from "../../utils/Urls";
import { handleError } from '../../services/ErrorHandlerServices';

export const userRegestraionServices = createAsyncThunk(
  "userRegestraionServices",
  async (payload) => {
    try {
      let url = `${BASE_URL}send-user-registration-otp`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {

      throw error;
    }
  }
);

export const userVerifyOtpServices = createAsyncThunk(
  "userVerifyOtpServices",
  async (payload) => {
    try {
      let url = `${BASE_URL}verify-user-registration-otp`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      handleError(error);
      throw error;
    }
  }
);

export const userLoginServices = createAsyncThunk(
  "userLoginServices",
  async (payload) => {
    try {
      let url = `${BASE_URL}login-user`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      handleError(error);
      throw error;
    }
  }
);

export const memberLoginServices = createAsyncThunk(
  "memberLoginServices",
  async (payload) => {
    try {
      let url = `${MEMBER_URL}login`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      handleError(error);
      throw error;
    }
  }
);

// Other services can also be exported here
// export const myClassListServices = ...

// Forgot Password - Send OTP
export const sendOtpService = createAsyncThunk(
  "sendOtpService",
  async (payload) => {
    try {
      const url = `${MEMBER_URL}generate-otp`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);


// Forgot Password - Verify OTP
export const verifyOtpService = createAsyncThunk(
  "verifyOtpService",
  async (payload) => {
    try {
      const url = `${MEMBER_URL}verify-otp`;

      const res = await axios.post(url, payload);
      console.log(res)
      return res.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

// Forgot Password - Reset Password
export const resetPasswordService = createAsyncThunk(
  "resetPasswordService",
  async (payload) => {
    try {
      const url = `${MEMBER_URL}reset-password`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);