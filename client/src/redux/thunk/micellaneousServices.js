// authServices.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/Axios";
import { BASE_URL, BASE_URL_FACILITY, BASE_URL_SUPER_ADMIN, URL } from "../../utils/Urls";
import { handleError } from "../../utils/ErrorHandler";
import { getStorageValue } from "../../services/LocalStorageServices";

export const getAllMenuServices = createAsyncThunk(
  "getAllMenuServices",
  async () => {
    try {
      let url = `${BASE_URL_SUPER_ADMIN}getallmenu`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const getMenuByRoleServices = createAsyncThunk(
  "getMenuByRoleServices",
  async (payload) => {
    try {
      let userDetails = getStorageValue("userDetails");
      let url = `${
        userDetails?.role_id == 1 ? BASE_URL_SUPER_ADMIN : BASE_URL
      }getmenubyrole`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const roleCreationServices = createAsyncThunk(
  "roleCreationServices",
  async (payload) => {
    try {
      let url = `${BASE_URL_SUPER_ADMIN}createrole`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
        console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const getAllRoleServices = createAsyncThunk(
  "getAllRoleServices",
  async () => {
    console.log("rooooooo");
    try {
      let url = `${BASE_URL_SUPER_ADMIN}getrole`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
        console.log(error);
      // handleError(error);
      throw error;
    }
  }
);


export const getSingleFacilityService = createAsyncThunk(
  "facility/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL_FACILITY}facility/${id}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch facility");
    }
  }
);
export const getAllFacilitiesService = createAsyncThunk(
  "facility/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL_FACILITY}getallfacility`);
      

      if (!res.data.success || !Array.isArray(res.data.data)) {
        throw new Error("Invalid facility data received");
      }

      return res.data.data; // Extracting `data` array correctly
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch facilities");
    }
  }
);

// ✅ Add New Facility
export const addFacilityCategoryService = createAsyncThunk(
  "facility/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL_FACILITY}addfacility`, payload);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add facility");
    }
  }
);

// ✅ Update Facility
export const updateFacilityCategoryService = createAsyncThunk(
  "facility/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL_FACILITY}facility/${id}`, data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update facility");
    }
  }
);




export const createRestaurantServices = createAsyncThunk(
  "createRestaurantServices",
  async (payload) => {
    console.log("facilitiesRestaurantServices", payload);
    try {
      let url = `${URL}facilities/restaurant`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
        console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const getAllRestaurantServices = createAsyncThunk(
  "getAllRestaurantServices",
  async () => {
    try {
     
      let url = `${URL}facilities/restaurants`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.log("getAllRestaurantServices2");

      //   console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const updateRestaurantServices = createAsyncThunk(
  "updateRestaurantServices",
  async (payload) => {
    // console.log("facilitiesRestaurantServices", payload);
    try {
      let url = `${URL}facilities/restaurant/${payload?.restaurant_id}`;
      const res = await axios.put(url, payload);
      return res.data;
    } catch (error) {
        console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const createRestaurantMenuServices = createAsyncThunk(
  "createRestaurantMenuServices",
  async (payload) => {
    console.log("facilitiesRestaurantServices", payload);
    try {
      let url = `${URL}facilities/menu`;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
        console.log(error);
      // handleError(error);
      throw error;
    }
  }
);

export const getRestaurantMenuServices =createAsyncThunk(
  "getRestaurantMenuServices",
  async (payload) => {
    try {
      let url = `${URL}facilities/restaurant/${payload?.restaurant_id}/menu`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
        console.log(error);
      // handleError(error);
      throw error;
    }
  }
); 

export const addRecipeToMenuService = createAsyncThunk(
  "menu/addRecipe",
  async ({ payload }, { rejectWithValue }) => {
    console.log(payload,"kya recipe hai", payload)
    try {
      const response = await axios.post(`${BASE_URL_FACILITY}menu/${payload?.menuId}/recipe`,  payload );
      console.log("Added Recipe:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding recipe:", error);
      return rejectWithValue(error.response?.data || "Failed to add recipe");
    }
  }
);

export const getRecipeForMenuService = createAsyncThunk(
  "getRecipeForMenuService",
  async (menuId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_FACILITY}menu/${menuId}/recipe`);
      return response.data; // ✅ Return the recipe data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch recipe");
    }
  }
);
// ✅ Fetch a Single Restaurant by ID
export const getSingleRestaurantService = createAsyncThunk(
  "getSingleRestaurantService",
  async (restaurantId, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/facilities/restaurant/${restaurantId}`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch restaurant details");
    }
  }
);

// ✅ Toggle Active/Inactive Restaurant Status
export const toggleRestaurantStatusService = createAsyncThunk(
  "toggleRestaurantStatusService",
  async ({ restaurantId, isOpen }, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}facilities/restaurant/${restaurantId}`;
      const res = await axios.put(url, { isOpen });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update restaurant status");
    }
  }
);

// ✅ Update Restaurant Menu
export const updateRestaurantMenuServices = createAsyncThunk(
  "updateRestaurantMenuServices",
  async ({ menuPayload }, { rejectWithValue }) => {
    
    try {
      let url = `${BASE_URL_FACILITY}/menu/${menuPayload?.menuId}`;
      const res = await axios.put(url, menuPayload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update restaurant menu");
    }
  }
);

// ✅ Fetch All Tables in a Restaurant
export const getAllRestaurantTablesServices = createAsyncThunk(
  "getAllRestaurantTablesServices",
  async (restaurantId, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/facilities/restaurant/${restaurantId}/tables`;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch restaurant tables");
    }
  }
);

// ✅ Create a Table for a Restaurant
export const createRestaurantTableServices = createAsyncThunk(
  "createRestaurantTableServices",
  async ({ restaurantId, tableData }, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/facilities/restaurant/${restaurantId}/tables`;
      const res = await axios.post(url, tableData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create table");
    }
  }
);

// ✅ Update a Table (Seating Capacity, Status, etc.)
export const updateRestaurantTableServices = createAsyncThunk(
  "updateRestaurantTableServices",
  async ({ restaurantId, tableId, updatedData }, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/facilities/restaurant/${restaurantId}/tables/${tableId}`;
      const res = await axios.put(url, updatedData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update table");
    }
  }
);

// ✅ Delete a Table from a Restaurant
export const deleteRestaurantTableServices = createAsyncThunk(
  "deleteRestaurantTableServices",
  async ({ restaurantId, tableId }, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/facilities/restaurant/${restaurantId}/tables/${tableId}`;
      await axios.delete(url);
      return tableId; // Return the ID of the deleted table
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete table");
    }
  }
);