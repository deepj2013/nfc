import RestaurantTable from "../models/facility_restaurant_tables.js";
import Restaurant from "../models/facility_restaurantModel.js";
import { MemberData } from "../models/member_Model.js"; // adjust import path as needed

export const validateMember = async (memberId) => {
  const member = await MemberData.findOne({ memberId });
  if (!member) throw new Error("Invalid Member ID");
  return member;
};

export const validateRestaurantTable = async (table_id, restaurant_id) => {
  const table = await RestaurantTable.findOne({ table_id });
  if (!table) throw new Error("Invalid Table ID");

  if (table.restaurant_id !== restaurant_id) {
    throw new Error("Table does not belong to the specified restaurant");
  }

  return table;
};

export const validateRestaurant = async (restaurant_id) => {
  const restaurant = await Restaurant.findOne({ restaurant_id });
  if (!restaurant) throw new Error("Invalid Restaurant ID");
  return restaurant;
};