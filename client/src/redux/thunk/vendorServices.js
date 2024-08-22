// authServices.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/Axios";
import { BASE_URL } from "../../utils/Urls";

export const createVendorServices = createAsyncThunk(
  "createVendorServices",
  async (payload) => {
    try {
      let url = `${BASE_URL}inv/createcategory`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const updateVendorServices = createAsyncThunk(
  "updateVendorServices",
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

export const getVendorListServices = createAsyncThunk(
  "getVendorListServices",
  async (payload) => {
    try {
      let url = `${BASE_URL}inv/getcategory`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const getSearchVendorListServices = createAsyncThunk(
  "getSearchVendorListServices",
  async (payload) => {
    try {
      let url = `${BASE_URL}inv/getcategory`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const getAllVendorsServices = createAsyncThunk(
  "getAllVendorsServices",
  async () => {
    try {
      let url = `${BASE_URL}inv/vendors`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);
