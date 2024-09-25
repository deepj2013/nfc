import { createSlice } from "@reduxjs/toolkit";

import { getAllMenuServices } from "../thunk/adminServices";

const initialState = {
  data: "sjsjsj",
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
      console.log("jhghjkjhgfvghjk", action.payload);
      console.log({ ...state }, "work");
      return {
        ...state,
        loading: false,
        allMeanuList: action?.payload,
      };
    });
    builder.addCase(getAllMenuServices.rejected, (state, action) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
  },
});

export default adminSlice.reducer;
