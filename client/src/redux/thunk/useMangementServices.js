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


export const getMemberService = createAsyncThunk(
  "getMemberService",
  async (memberId, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}member/${memberId}`; // URL to fetch member data
      console.log(url,"URLS")
      const res = await axios.get(url);
      
      if (res.status === 200) {
        return res.data; // Return member data if found
      } else {
        throw new Error("Member not found");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Member not found");
    }
  }
);

export const createMemberPasswordService = createAsyncThunk(
  "createMemberPasswordservice",
  async (payload, {rejectWithValue}) => {
    try {
      const url = `${BASE_URL}createmember-password`; // URL to fetch member data
      const res = await axios.post(url,payload);
      console.log(res,"in services")
      if (res.status === 201) {
        return res.data; // Return member data if found
      } else {
        throw new Error("Member not found");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Member not found");
    }
  }
);

export const bulkUploadMemberServices = createAsyncThunk(
  "bulkUploadMemberServices",
  async (payload, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}bulk-uploadMember`;

      // Log the payload to verify its content
      console.log("Payload for bulk upload:", payload);

      const res = await axios.post(url, payload, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure form-data for file upload
        },
      });

      // Log the backend response for debugging
      console.log("Backend response:", res.data);

      return res.data;
    } catch (error) {
      // Log the full error response for debugging
      console.error("Error response from backend:", error.response);

      handleError(error);

      // Log the error message for further inspection
      console.error("Error message:", error.message);

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const getMemberManagementListServices = createAsyncThunk(
  "getMemberManagementListServices",
  async () => {
    try {
      let url = `${BASE_URL}members`;
      const res = await axios.get(url);
      
      return res.data;
    } catch (error) {
      
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
      
      return res.data;
    } catch (error) {
      
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
      console.log("dsds", parmas?.payload)
      const res = await axios.post(url,parmas?.payload);
     
      return res.data;
    } catch (error) {
      
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

export const getTransactionHistoryService = createAsyncThunk(
  "transactions/getTransactionHistory",
  async (memberId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}member/${memberId}/transactions`);
      return response.data; // Assumes response contains a `transactions` array
    } catch (error) {
      handleError(error); // Log or handle error
      return rejectWithValue(error.response?.data || "Failed to fetch transaction history.");
    }
  }
);

export const updateChequeStatusService = createAsyncThunk(
  "transactions/updateChequeStatus",
  async ({ chequeNumber, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}user/member/wallet/updatechequestatus`, {
        status: status, // Assuming backend accepts chequeStatus as the key
      });
      return response.data; // Assumes backend returns updated transaction details
    } catch (error) {
      handleError(error); // Log or handle error
      return rejectWithValue(error.response?.data || "Failed to update cheque status.");
    }
  }
);
