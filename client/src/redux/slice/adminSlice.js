import { createSlice } from "@reduxjs/toolkit";

import { getAllMenuServices } from "../thunk/adminServices";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false,
  allMeanuList: [],
};

const adminSlice = createSlice({
  name: "ADMIN_SLICE",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllMenuServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAllMenuServices.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        allMeanuList: action?.payload?.result,
      };
    });
    builder.addCase(getAllMenuServices.rejected, (state, action) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
  },
});

export default adminSlice.reducer;
