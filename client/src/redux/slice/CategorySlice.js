import { createSlice } from "@reduxjs/toolkit";
import { userRegestraionServices } from "../thunk/authServices";
import {
  createCategoryServices,
  getcategoryServices,
  updateCategoryServices,
} from "../thunk/categoryServices";

const initialState = {
  loading: false,
  categoryList: [],
};

const categorySlice = createSlice({
  name: "CATEGORY_SLICE",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getcategoryServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getcategoryServices.fulfilled, (state, action) => {
      console.log("actionc", action);

      return {
        ...state,
        loading: false,
        categoryList: action.payload.categories,
      };
    });
    builder.addCase(getcategoryServices.rejected, (state, action) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(createCategoryServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(createCategoryServices.fulfilled, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(createCategoryServices.rejected, (state, action) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(updateCategoryServices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(updateCategoryServices.fulfilled, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(updateCategoryServices.rejected, (state, action) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
  },
});

export default categorySlice.reducer;
