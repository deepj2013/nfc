import { createSlice } from "@reduxjs/toolkit";
import { getMeasurementUnitsServices } from "../thunk/unitServices";

const initialState = {
  loading: false,
  unitList: [],
};

const inventarySlice = createSlice({
  name: "INVENTARY_SLICE",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMeasurementUnitsServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getMeasurementUnitsServices.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        unitList: action?.payload?.result,
      };
    });
    builder.addCase(getMeasurementUnitsServices.rejected, (state, action) => {
      console.log("ppp");
      return { ...state, loading: false, error: "Something went wrong" };
    });
  },
});

export default inventarySlice.reducer;
