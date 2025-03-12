import { createSlice } from "@reduxjs/toolkit";
import {
  getRestaurantMenuServices,
  createRestaurantMenuServices,
  updateRestaurantMenuServices,
  addRecipeToMenuService
} from "../thunk/micellaneousServices";

const menuSlice = createSlice({
  name: "restauarantmenu",
  initialState: {
    menus: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantMenuServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRestaurantMenuServices.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload.data.menuItems || []; // ✅ Extract menuItems
      })
      .addCase(getRestaurantMenuServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRestaurantMenuServices.fulfilled, (state, action) => {
        state.menus.push(action.payload); // ✅ Add new menu to Redux state
      })
      .addCase(updateRestaurantMenuServices.fulfilled, (state, action) => {
        const index = state.menus.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.menus[index] = action.payload; // ✅ Update existing menu
        }
      })
      .addCase(addRecipeToMenuService.fulfilled, (state, action) => {
        const index = state.menus.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.menus[index].recipe = action.payload.recipe; // ✅ Add recipe to menu
        }
      });
  }
});

export default menuSlice.reducer;