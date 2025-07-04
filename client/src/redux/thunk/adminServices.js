// authServices.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/Axios";
import { BASE_URL, BASE_URL_SUPER_ADMIN } from "../../utils/Urls";
import { handleError } from "../../utils/ErrorHandler";
// import { handleError } from '@/services/ErrorHandlerServices';

export const adminLoginServices = createAsyncThunk(
  "adminLoginServices",
  async (payload) => {
    try {
      let url = `${BASE_URL}login`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      handleError(error);
      throw error;
    }
  }
);



export const superAdminLoginServices = createAsyncThunk(
  "superAdminLoginServices",
  async (payload) => {
    try {
      let url = `${BASE_URL_SUPER_ADMIN}signin`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      handleError(error);
      throw error;
    }
  }
);

export const menuCreationServices = createAsyncThunk(
  "menuCreationServices",
  async (payload) => {
    try {
      let url = `${BASE_URL_SUPER_ADMIN}createmenu`;
      const res = await axios.post(url, payload);
      console.log("payloassss", res);
      return res.data;
    } catch (error) {
      console.log("payloasssse", error);
      handleError(error);
      throw error;
    }
  }
);

export const getAllMenuServices = createAsyncThunk(
  "getAllMenuServices",
  async () => {
    try {
      let url = `${BASE_URL_SUPER_ADMIN}getallmenu`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);


export const updateRoleAccessControlServices = createAsyncThunk(
  "role/updateAccessControl",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL_SUPER_ADMIN}accesscontrol/update`, payload); // ⬅️ Update this URL if needed
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Server Error");
    }
  }
);