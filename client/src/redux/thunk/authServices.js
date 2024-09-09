// authServices.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/Axios";
import { BASE_URL } from "../../utils/Urls";
// import { handleError } from '@/services/ErrorHandlerServices';

export const userRegestraionServices = createAsyncThunk(
  "userRegestraionServices",
  async (payload) => {
    try {
      let url = `${BASE_URL}send-user-registration-otp`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      // handleError(error);
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

// Other services can also be exported here
// export const myClassListServices = ...
