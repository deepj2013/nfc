import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/Axios";
import {
  BASE_URL,
  BASE_URL_FILEUPLOAD,
  BASE_URL_SUPER_ADMIN,
} from "../../utils/Urls";
import { handleError } from "../../utils/ErrorHandler";
import { getStorageValue } from "../../services/LocalStorageServices";

export const employeeListServices = createAsyncThunk(
  "employeeListServices",
  async (payload) => {
    try {
      let url = `${BASE_URL_SUPER_ADMIN}getusers`;
      const res = await axios.get(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      handleError(error);
      throw error;
    }
  }
);

export const roleListServices = createAsyncThunk(
  "roleListServices",
  async (payload) => {
    try {
      let url = `${BASE_URL_SUPER_ADMIN}getrole`;
      const res = await axios.get(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      handleError(error);
      throw error;
    }
  }
);

export const createusersServices = createAsyncThunk(
  "createusersServices",
  async (payload) => {
    try {
      let url = `${BASE_URL_SUPER_ADMIN}createusers`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      handleError(error);
      throw error;
    }
  }
);

export const createMemberServices = createAsyncThunk(
  "createMemberServices",
  async (payload) => {
    console.log("memberpayload", payload);

    try {
      let url = `${BASE_URL}member`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      handleError(error);
      throw error;
    }
  }
);

export const getMemberManagementListServices = createAsyncThunk(
  "getMemberManagementListServices",
  async () => {
    try {
      let url = `${BASE_URL}members`;
      const res = await axios.get(url);
      console.log("poiuytrewq");
      return res.data;
    } catch (error) {
      console.log("0987654321", error);
      handleError(error);
      throw error;
    }
  }
);


export const getDependentListServices = createAsyncThunk(
  "getDependentListServices",
  async (id) => {
    try {
      let url = `${BASE_URL}member/${id} `;
      const res = await axios.get(url);
      console.log("poiuytrewq");
      return res.data;
    } catch (error) {
      console.log("0987654321", error);
      handleError(error);
      throw error;
    }
  }
);


export const addDependentServices = createAsyncThunk(
  "addDependentServices",
  async (parmas) => {
    try {
      let url = `${BASE_URL}member/${parmas?.id}/dependent`;
      const res = await axios.post(url,parmas?.payload);
      console.log("poiuytrewq");
      return res.data;
    } catch (error) {
      console.log("0987654321", error);
      handleError(error);
      throw error;
    }
  }
);



export const updateMemberServices = createAsyncThunk(
  "updateMemberServices",
  async (payload) => {
    try {
      let url = `${BASE_URL}member/${payload?.memberId}`;
      const res = await axios.put(url, payload);
      return res.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const uploadFileServices = createAsyncThunk(
  "uploadFileServices",
  async (payload) => {
    const userDetails = await getStorageValue("userDetails");

    try {
      let url = `${BASE_URL_FILEUPLOAD}utility/upload/file`;
      const formData = new FormData();
      formData.append("file", payload);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          // "Content-Type": "multipart/form-data",
          "x-auth-token": `${userDetails?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const addDepositServices = createAsyncThunk(
  "addDepositServices",
  async (payload) => {
    console.log("memberpayload", payload);

    try {
      let url = `${BASE_URL}member/wallet/deposit`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      //   console.log(error);
      handleError(error);
      throw error;
    }
  }
);
