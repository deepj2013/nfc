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

export const memberCheckInService = createAsyncThunk(
  "member/checkIn",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}checkin`, payload);
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
      const response = await axios.post(`${BASE_URL}checkout`, payload);
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
  

  