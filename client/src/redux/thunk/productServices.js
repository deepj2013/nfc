// authServices.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/Axios";
import { BASE_URL } from "../../utils/Urls";

export const createProductServices = createAsyncThunk(
  "createProductServices",
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

export const updateProductServices = createAsyncThunk(
  "updateProductServices",
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

export const getProductListServices = createAsyncThunk(
  "getProductListServices",
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

export const searchProductByNameServices = createAsyncThunk(
  "searchProductByNameServices",
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
export const getAllProductListServices = createAsyncThunk(
  "getAllProductListServices",
  async () => {
    try {
      let url = `${BASE_URL}inv/products`;
      const res = await axios.get(url);
      console.log("lklk", res);
      return res.data;
    } catch (error) {
      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const createProductsServices = createAsyncThunk(
  "createProductsServices",
  async (payload) => {
    try {
      console.log("formtest123", payload);
      let url = `${BASE_URL}inv/products`;
      const res = await axios.post(url, payload);
      console.log("res123", res);
      return res.data;
    } catch (error) {
      console.log("res", error);

      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const getHistoryServices = createAsyncThunk(
  "getHistoryServices",
  async () => {
    try {
      let url = `${BASE_URL}inv/inventory-transactions/history/NFC00001`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const stockInOrOutServices = createAsyncThunk(
  "stockInOrOutServices",
  async (payload) => {
    try {
      console.log("formtest123", payload);
      let url = `${BASE_URL}inv/inventory-transactions`;
      const res = await axios.post(url, payload);
      console.log("res123", res);
      return res.data;
    } catch (error) {
      console.log("res", error);

      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);
