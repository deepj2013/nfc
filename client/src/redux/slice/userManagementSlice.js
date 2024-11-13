import { createSlice } from "@reduxjs/toolkit";
import {
  employeeListServices,
  getMemberManagementListServices,
  roleListServices,
  bulkUploadMemberServices,
} from "../thunk/useMangementServices";

const initialState = {
  loading: false,
  employees: [],
  roleList: [],
  membersList: [],
  bulkUploadStatus: "idle",
  bulkUploadResult: null,
  bulkUploadError: null,
  error: null,
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Employee List
      .addCase(employeeListServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeListServices.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.result;
        state.error = null;
      })
      .addCase(employeeListServices.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong while fetching employees.";
      })

      // Role List
      .addCase(roleListServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(roleListServices.fulfilled, (state, action) => {
        state.loading = false;
        state.roleList = action.payload.result;
        state.error = null;
      })
      .addCase(roleListServices.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong while fetching roles.";
      })

      // Member Management List
      .addCase(getMemberManagementListServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMemberManagementListServices.fulfilled, (state, action) => {
        state.loading = false;
        state.membersList = action.payload.result;
        state.error = null;
      })
      .addCase(getMemberManagementListServices.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong while fetching members.";
      })

      // Bulk Upload Members
      .addCase(bulkUploadMemberServices.pending, (state) => {
        state.bulkUploadStatus = "loading";
        state.bulkUploadError = null;
      })
      .addCase(bulkUploadMemberServices.fulfilled, (state, action) => {
        state.bulkUploadStatus = "succeeded";
        state.bulkUploadResult = action.payload;
        state.bulkUploadError = null;
      })
      .addCase(bulkUploadMemberServices.rejected, (state, action) => {
        state.bulkUploadStatus = "failed";
        state.bulkUploadError = action.error.message;
      });
  },
});

export default userManagementSlice.reducer;
