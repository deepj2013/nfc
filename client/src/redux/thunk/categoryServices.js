// authServices.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/Axios";
import { BASE_URL } from "../../utils/Urls";

export const createCategoryServices = createAsyncThunk(
  "createCategoryServices",
  async (payload) => {
    console.log("pay", payload);
    try {
      let url = `${BASE_URL}inv/createcategory`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      console.log("thiserror", error);
      // handleError(error);
      throw error;
    }
  }
);

export const UpdateCategoryServices = createAsyncThunk(
  "UpdateCategoryServices",
  async (payload) => {
    console.log("pay", payload);
    try {
      let url = `${BASE_URL}inv/updatecategory`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      console.log("thiserror", error);
      // handleError(error);
      throw error;
    }
  }
);

export const updateCategoryServices = createAsyncThunk(
  "updateCategoryServices",
  async (payload) => {
    try {
      let url = `${BASE_URL}inv/updatecategory`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const getcategoryServices = createAsyncThunk(
  "getcategoryServices",
  async () => {
    try {
      let url = `${BASE_URL}inv/getcategory`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);
