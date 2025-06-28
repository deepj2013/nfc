import { createSlice } from '@reduxjs/toolkit';
import { resetPasswordService, sendOtpService, userLoginServices, userRegestraionServices, userVerifyOtpServices, verifyOtpService } from '../thunk/authServices';

const initialState = {
  data: null,
  loading: false,
  error: null,
  planList: [],
  success: false,
  otpVerified: false,
  otpVerifyResult: null,
  passwordReset: false,
  resetResult: null,
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
    
    builder
      .addCase(sendOtpService.pending, (state) => {
          state.loading = true;
      })
      .addCase(sendOtpService.fulfilled, (state, action) => {
          state.loading = false;
          state.otpResult = action.payload;
        })
        .addCase(sendOtpService.rejected, (state) => {
          state.loading = false;
        });
    
        builder
        // 🔐 OTP Verification
        .addCase(verifyOtpService.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(verifyOtpService.fulfilled, (state, action) => {
          state.loading = false;
          state.otpVerified = true;
          state.otpVerifyResult = action.payload;
        })
        .addCase(verifyOtpService.rejected, (state) => {
          state.loading = false;
          state.otpVerified = false;
          state.error = "OTP verification failed";
        })
      
        // 🔑 Password Reset
        .addCase(resetPasswordService.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(resetPasswordService.fulfilled, (state, action) => {
          state.loading = false;
          state.passwordReset = true;
          state.resetResult = action.payload;
        })
        .addCase(resetPasswordService.rejected, (state) => {
          state.loading = false;
          state.passwordReset = false;
          state.error = "Password reset failed";
        });



  },
});

export default authSlice.reducer;
