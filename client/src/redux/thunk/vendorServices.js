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

export const createVendersServices = createAsyncThunk(
  "createVendersServices",
  async (payload) => {
    try {
      console.log("formtest", payload);
      let url = `${BASE_URL}inv/vendors`;
      const res = await axios.post(url, payload);
      console.log("res", res);
      return res.data;
    } catch (error) {
      console.log("res", error);

      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const updateVendorsServices = createAsyncThunk(
  "updateVendorsServices",
  async (payload) => {
    try {
      console.log("formtest", payload);
      let url = `${BASE_URL}inv/vendors`;
      const res = await axios.post(url, payload);
      console.log("res", res);
      return res.data;
    } catch (error) {
      console.log("res", error);

      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const createMemberServices = createAsyncThunk(
  "createMemberServices",
  async (payload) => {
    try {
      console.log("formtest", payload);
      let url = `${BASE_URL}membercategory`;
      const res = await axios.post(url, payload);
      console.log("res", res);
      return res.data;
    } catch (error) {
      console.log("res", error);

      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const UpdateMemberServices = createAsyncThunk(
  "UpdateMemberServices",
  async (id, payload) => {
    try {
      debugger;
      console.log("formtest", id, payload);
      let url = `${BASE_URL}membercategory/${id}`;
      const res = await axios.put(url, payload);
      console.log("res", res);
      return res.data;
    } catch (error) {
      console.log("res", error);

      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const getMemberCategoryServices = createAsyncThunk(
  "getMemberCategoryServices",
  async () => {
    try {
      let url = `${BASE_URL}membercategory`;

      const res = await axios.get(url);
      console.log("lkjhbghjk");

      return res.data;
    } catch (error) {
      console.log("lkjhbghjk", error);

      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);
