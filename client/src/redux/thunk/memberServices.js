import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    BASE_URL,
    BASE_URL_FILEUPLOAD,
    BASE_URL_SUPER_ADMIN,
  } from "../../utils/Urls";



export const getMemberService = createAsyncThunk(
  "member/getMember",
  async (memberNumber, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}members/${memberNumber}`);
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
  

  