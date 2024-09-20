import { createSlice } from "@reduxjs/toolkit";
import { userRegestraionServices } from "../thunk/authServices";

const initialState = {
  data: null,
  loading: false,
  error: null,
  userData: null,
  success: false,
  
};

const userSlice = createSlice({
  name: "PLAN_SLICE",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userRegestraionServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(userRegestraionServices.fulfilled, (state, action) => {
      return { ...state, loading: false, userData: action.payload.result };
    });
    builder.addCase(userRegestraionServices.rejected, (state, action) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
  },
});

export default userSlice.reducer;
