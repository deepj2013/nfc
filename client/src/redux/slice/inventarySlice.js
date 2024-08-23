import { createSlice } from "@reduxjs/toolkit";
import { getMeasurementUnitsServices } from "../thunk/unitServices";
import { getAllVendorsServices } from "../thunk/vendorServices";
import { getAllProductListServices } from "../thunk/productServices";

const initialState = {
  loading: false,
  unitList: [],
  allVenderList: [],
  allProductList: [],
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
    builder.addCase(getAllVendorsServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAllVendorsServices.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        allVenderList: action?.payload?.result,
      };
    });
    builder.addCase(getAllVendorsServices.rejected, (state, action) => {
      console.log("ppp");
      return { ...state, loading: false, error: "Something went wrong" };
    });
    builder.addCase(getAllProductListServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAllProductListServices.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        allProductList: action?.payload?.result,
      };
    });
    builder.addCase(getAllProductListServices.rejected, (state, action) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
  },
});

export default inventarySlice.reducer;
