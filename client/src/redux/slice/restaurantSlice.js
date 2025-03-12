import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect"; // ✅ Add this import


import {
  createRestaurantServices,
  getAllRestaurantServices,
  getSingleRestaurantService,
  updateRestaurantServices,
  toggleRestaurantStatusService,
  createRestaurantMenuServices,
  updateRestaurantMenuServices,
  getRestaurantMenuServices,
  getAllRestaurantTablesServices,
  createRestaurantTableServices,
  updateRestaurantTableServices,
  deleteRestaurantTableServices,
} from "../thunk/micellaneousServices";

const initialState = {
  restaurants: [], // ✅ Ensure default value is an empty array
  restaurant: null,
  menu: [],
  tables: [],
  loading: false,
  error: null,
};
// ✅ Move selector OUTSIDE component to prevent re-creation
const selectRestaurantState = (state) => state.restaurant || {};

const selectRestaurantsData = createSelector(
  [selectRestaurantState],
  (restaurantState) => ({
    restaurants: restaurantState.restaurants || [], // ✅ Ensure `restaurants` is always an array
    loading: restaurantState.loading,
    error: restaurantState.error,
  })
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Get All Restaurants
      .addCase(getAllRestaurantServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRestaurantServices.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload?.data || [];
        
      })
      
      .addCase(getAllRestaurantServices.rejected, (state, action) => { // ✅ No extra dot here
        state.loading = false;
        state.error = action.payload;
      })

      
    // ✅ Get Single Restaurant
    .addCase(getSingleRestaurantService.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSingleRestaurantService.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurant = action.payload?.data || null;
    })
    .addCase(getSingleRestaurantService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

      // ✅ Create New Restaurant
      .addCase(createRestaurantServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRestaurantServices.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants.push(action.payload?.data);
      })
      .addCase(createRestaurantServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Restaurant
      .addCase(updateRestaurantServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRestaurantServices.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = state.restaurants.map((restaurant) =>
          restaurant._id === action.payload.data._id ? action.payload.data : restaurant
        );
      })
      .addCase(updateRestaurantServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Toggle Restaurant Status (Active/Inactive)
      .addCase(toggleRestaurantStatusService.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleRestaurantStatusService.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = state.restaurants.map((restaurant) =>
          restaurant._id === action.payload.data._id ? action.payload.data : restaurant
        );
      })
      .addCase(toggleRestaurantStatusService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get Restaurant Menu
      .addCase(getRestaurantMenuServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRestaurantMenuServices.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload?.data || [];
      })
      .addCase(getRestaurantMenuServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Create Restaurant Menu
      .addCase(createRestaurantMenuServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRestaurantMenuServices.fulfilled, (state, action) => {
        state.loading = false;
        state.menu.push(action.payload?.data);
      })
      .addCase(createRestaurantMenuServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Restaurant Menu
      .addCase(updateRestaurantMenuServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRestaurantMenuServices.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = state.menu.map((menuItem) =>
          menuItem._id === action.payload.data._id ? action.payload.data : menuItem
        );
      })
      .addCase(updateRestaurantMenuServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get All Restaurant Tables
      .addCase(getAllRestaurantTablesServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRestaurantTablesServices.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload?.data || [];
      })
      .addCase(getAllRestaurantTablesServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Create Restaurant Table
      .addCase(createRestaurantTableServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRestaurantTableServices.fulfilled, (state, action) => {
        state.loading = false;
        state.tables.push(action.payload?.data);
      })
      .addCase(createRestaurantTableServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Restaurant Table
      .addCase(updateRestaurantTableServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRestaurantTableServices.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = state.tables.map((table) =>
          table._id === action.payload.data._id ? action.payload.data : table
        );
      })
      .addCase(updateRestaurantTableServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete Restaurant Table
      .addCase(deleteRestaurantTableServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRestaurantTableServices.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = state.tables.filter((table) => table._id !== action.payload);
      })
      .addCase(deleteRestaurantTableServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;