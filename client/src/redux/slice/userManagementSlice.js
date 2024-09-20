import { createSlice } from "@reduxjs/toolkit";
import { getMeasurementUnitsServices } from "../thunk/unitServices";
import {
  getAllVendorsServices,
  getMemberCategoryServices,
} from "../thunk/vendorServices";
import { getAllProductListServices } from "../thunk/productServices";
import { employeeListServices, roleListServices } from "../thunk/useMangementServices";

const initialState = {
    loading: false,
    employees: [],
    roleList:[]
};

const inventarySlice = createSlice({
  name: "INVENTARY_SLICE",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(employeeListServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(employeeListServices.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        employees: action?.payload?.result,
      };
    });
    builder.addCase(employeeListServices.rejected, (state, action) => {
      console.log("ppp");
      return { ...state, loading: false, error: "Something went wrong" };
    });


    builder.addCase(roleListServices.pending, (state) => {
        return { ...state, loading: true };
      });
      builder.addCase(roleListServices.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          roleList: action?.payload?.result,
        };
      });
      builder.addCase(roleListServices.rejected, (state, action) => {
        console.log("ppp");
        return { ...state, loading: false, error: "Something went wrong" };
      });

    
  },
});

export default inventarySlice.reducer;
