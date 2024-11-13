import { createSlice } from "@reduxjs/toolkit";
import {
  getMemberService,
  memberCheckInService,
  memberCheckOutService,
  guestCheckInService,
  guestCheckOutService,
} from "../thunk/memberServices";

const initialState = {
  memberDetails: null,
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMemberService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMemberService.fulfilled, (state, action) => {
        state.loading = false;
        state.memberDetails = action.payload;
      })
      .addCase(getMemberService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Handle Check-In and Check-Out similarly
  },
});

export default memberSlice.reducer;
