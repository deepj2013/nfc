import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    BASE_URL,
    BASE_URL_FILEUPLOAD,
    BASE_URL_SUPER_ADMIN,
  } from "../../utils/Urls";


  export const getMemberService = createAsyncThunk(
    "getMemberService",
    async (memberId, { rejectWithValue }) => {
      try {
        const url = `${BASE_URL}member/${memberId}`; // URL to fetch member data
    
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

 

export const memberCheckInOutHistory = createAsyncThunk(
"member/checkInouthistory",
async (payload, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${BASE_URL}membercheck/history/${payload}`, payload);
    // console.log(response)
      return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);
export const memberCheckInService = createAsyncThunk(
  "member/checkIn",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}members/checkin`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const memberCheckOutService = createAsyncThunk(
  "member/checkOut",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}members/checkout`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const guestCheckInService = createAsyncThunk(
  "guest/checkIn",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}guest/checkin`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const guestCheckOutService = createAsyncThunk(
    "guest/checkIn",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${BASE_URL}guest/checkout`, payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const bookEventService = createAsyncThunk(
    "events/bookEvent",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axios.post(`/events/book`, payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  