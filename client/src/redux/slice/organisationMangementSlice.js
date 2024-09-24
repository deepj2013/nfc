import { createSlice } from "@reduxjs/toolkit";
import { organisationListservices } from "../thunk/organizationMangementservices";

const initialState = {
    loading: false,
    organisation: [],
};

const organisationSlice = createSlice({
  name: "ORGANIZATION_SLICE",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(organisationListservices.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(organisationListservices.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        organisation: action?.payload?.result,
      };
    });
    builder.addCase(organisationListservices.rejected, (state, action) => {
      console.log("ppp");
      return { ...state, loading: false, error: "Something went wrong" };
    });

  },
});

export default organisationSlice.reducer;
