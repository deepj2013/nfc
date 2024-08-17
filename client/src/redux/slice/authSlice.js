import { createSlice } from '@reduxjs/toolkit';
import { userLoginServices, userRegestraionServices, userVerifyOtpServices } from '../thunk/authServices';

const initialState = {
  data: null,
  loading: false,
  error: null,
  planList: [],
  success: false,
};

const authSlice = createSlice({
  name: 'PLAN_SLICE',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userRegestraionServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(userRegestraionServices.fulfilled, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(userRegestraionServices.rejected, (state, action) => {
      return { ...state, loading: false, error: 'Something went wrong' };
    });


    builder.addCase(userVerifyOtpServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(userVerifyOtpServices.fulfilled, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(userVerifyOtpServices.rejected, (state, action) => {
      return { ...state, loading: false, error: 'Something went wrong' };
    });


    builder.addCase(userLoginServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(userLoginServices.fulfilled, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(userLoginServices.rejected, (state, action) => {
      return { ...state, loading: false, error: 'Something went wrong' };
    });





  },
});

export default authSlice.reducer;
