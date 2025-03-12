import { createSlice } from "@reduxjs/toolkit";
import {
  getAllFacilitiesService,
  getSingleFacilityService,
  addFacilityCategoryService,
  updateFacilityCategoryService,
} from "../thunk/micellaneousServices";

const facilitySlice = createSlice({
  name: "facility",
  initialState: {
    facilities: [],  // Stores all facilities
    facility: null,  // Stores single facility for editing
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Facilities
      .addCase(getAllFacilitiesService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFacilitiesService.fulfilled, (state, action) => {
        
        state.loading = false;
        state.facilities = action.payload; // Update facilities list
      })
      .addCase(getAllFacilitiesService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single Facility (for Edit)
      .addCase(getSingleFacilityService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleFacilityService.fulfilled, (state, action) => {
        
        state.loading = false;
        state.facility = action.payload; // Update single facility state
      })
      .addCase(getSingleFacilityService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add New Facility
      .addCase(addFacilityCategoryService.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFacilityCategoryService.fulfilled, (state, action) => {
        console.log("Facility Added:", action.payload);
        state.loading = false;
        state.facilities.push(action.payload); // Append new facility to list
      })
      .addCase(addFacilityCategoryService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Facility
      .addCase(updateFacilityCategoryService.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFacilityCategoryService.fulfilled, (state, action) => {
        console.log("Facility Updated:", action.payload);
        state.loading = false;
        state.facilities = state.facilities.map(facility =>
          facility._id === action.payload._id ? action.payload : facility
        ); // Update facility in list
      })
      .addCase(updateFacilityCategoryService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default facilitySlice.reducer;