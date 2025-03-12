import axios from "axios";
import { BASE_URL, BASE_URL_FACILITY } from "../utils/Urls";

export const getRestaurantMenuServices = async (restaurant_id) => {
    try {
      const res = await axios.get(`${BASE_URL_FACILITY}restaurant/${restaurant_id}/menu`);
      return res.data;
    } catch (error) {
        console.log(error);
      // handleError(error);
      throw error;
    }
  }


// Fetch tables for a restaurant
export const getTablesByRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(`${BASE_URL_FACILITY}restaurant/${restaurantId}/tables`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
};

// Add a new table
export const addTable = async (restaurantId, tableData) => {
  try {
    const response = await axios.post(`${BASE_URL_FACILITY}restaurant/${restaurantId}/table`, tableData);
    return response.data.data;
  } catch (error) {
    console.error("Error adding table:", error);
    throw error;
  }
};

// Update table details
export const updateTable = async (tableId, updateData) => {
  try {
    const response = await axios.put(`${BASE_URL}/table/${tableId}`, updateData);
    return response.data.data;
  } catch (error) {
    console.error("Error updating table:", error);
    throw error;
  }
};

// Change table status
export const changeTableStatus = async (tableId, status) => {
  try {
    const response = await axios.put(`${BASE_URL}/table/${tableId}/status`, { status });
    return response.data.data;
  } catch (error) {
    console.error("Error changing table status:", error);
    throw error;
  }
};

export const getRestaurantDetails = async (restaurantId) => {
  try {
    const response = await axios.get(`${BASE_URL_FACILITY}restaurant/${restaurantId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    throw error;
  }
};


export const getAllRestaurantDetail = async () => {
  try {
    const response = await axios.get(`${BASE_URL_FACILITY}restaurants`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all restaurant details:", error);
    throw error;
  }
};