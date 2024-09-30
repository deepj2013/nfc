import Restaurant from "../models/facility_restaurantModel.js";
import RestaurantTable from "../models/facility_restaurant_tables.js";
import MenuItem from "../models/facility_restaurant_menuModel.js";
import { getObjectId } from "../helpers/mongoose/mongooseHelpers.js";
import Recipe from "../models/facility_restaurant_menu_receipeModel.js"
import { get } from "mongoose";

// Helper function to validate restaurant data
const validateRestaurantData = (data) => {
  if (!data.name) {
    throw new Error("Restaurant name is required");
  }
  if (!["Own", "Partnership", "Third-Party"].includes(data.type)) {
    throw new Error("Invalid restaurant type");
  }
  if (
    data.type !== "Own" &&
    (data.commissionRate === undefined || data.commissionRate < 0)
  ) {
    throw new Error(
      "Commission rate must be a positive number for Partnership or Third-Party restaurants"
    );
  }
};

// Generate next restaurant_id by finding the maximum restaurant_id in the collection
const getNextRestaurantId = async () => {
  try {
    const latestRestaurant = await Restaurant.findOne().sort({
      restaurant_id: -1,
    });
    return latestRestaurant ? latestRestaurant.restaurant_id + 1 : 1; // Start with 1 if no restaurants exist
  } catch (error) {
    throw new Error("Failed to generate restaurant ID");
  }
};

// Generate the next table number by finding the maximum tableNumber in the collection
const getNextTableId = async () => {
  try {
    const latestTable = await RestaurantTable.findOne().sort({
      tableNumber: -1,
    });
    return latestTable ? latestTable.tableNumber + 1 : 1; // Start with table number 1 if no tables exist
  } catch (error) {
    throw new Error("Failed to generate table number");
  }
};

// Create a new restaurant with validation
export const createRestaurant = async (data) => {
  try {
    // Validate restaurant data
    validateRestaurantData(data);

    // Set commissionRate to 0 if the type is "Own"
    if (data.type === "Own") {
      data.commissionRate = 0;
    }

    // Generate next restaurant_id
    const restaurant_id = await getNextRestaurantId();

    // Create and save the restaurant
    const restaurant = new Restaurant({ ...data, restaurant_id });
    await restaurant.save();

    return restaurant;
  } catch (error) {
    throw new Error(error.message || "Failed to create restaurant");
  }
};

// Update an existing restaurant with validation
export const updateRestaurant = async (restaurantId, updateData) => {
  try {
    // Validate update data
    if (updateData.type) {
      validateRestaurantData(updateData);
    }

    // Set commissionRate to 0 if the type is "Own"
    if (updateData.type === "Own") {
      updateData.commissionRate = 0;
    }

    // Find and update the restaurant
    const restaurant = await Restaurant.findOneAndUpdate(
      { restaurant_id: restaurantId },
      updateData,
      { new: true }
    );

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    return restaurant;
  } catch (error) {
    throw new Error(error.message || "Failed to update restaurant");
  }
};

// Get all restaurants
export const getAllRestaurants = async () => {
  try {
    return await Restaurant.find({});
  } catch (error) {
    throw new Error("Failed to fetch restaurants");
  }
};

// Get a single restaurant by ID
export const getSingleRestaurant = async (restaurant_id) => {
  try {
    const restaurant = await Restaurant.findOne({ restaurant_id });
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return restaurant;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch restaurant");
  }
};

// Create a new table for a restaurant with validation
export const createTable = async (data) => {
  try {
    if (!data.restaurant_id || !data.capacity) {
      throw new Error("Restaurant ID and table capacity are required");
    }

    // Generate the next table number
    data.tableNumber = await getNextTableId();

    // Create and save the table
    const table = new RestaurantTable(data);
    await table.save();

    return table;
  } catch (error) {
    throw new Error(error.message || "Failed to create table");
  }
};

// Get all tables for a specific restaurant
export const getTablesByRestaurant = async (restaurant_id) => {
  try {
    return await RestaurantTable.find({ restaurant_id });
  } catch (error) {
    throw new Error("Failed to fetch tables for the restaurant");
  }
};

// Update a table's details (table number, capacity)
export const updateTable = async (tableId, updateData) => {
  try {
    if (!updateData.capacity) {
      throw new Error("Table capacity is required for update");
    }

    const updatedTable = await RestaurantTable.findOneAndUpdate(
      { tableNumber: tableId },
      updateData,
      { new: true }
    );

    if (!updatedTable) {
      throw new Error("Table not found");
    }

    return updatedTable;
  } catch (error) {
    throw new Error(error.message || "Failed to update table");
  }
};

// Change the status of a table (Available or Occupied)
export const changeTableStatus = async (tableId, status) => {
  try {
    if (!["Available", "Occupied"].includes(status)) {
      throw new Error('Invalid status. Must be "Available" or "Occupied".');
    }

    const updatedTable = await RestaurantTable.findOneAndUpdate(
      { tableNumber: tableId },
      { currentStatus: status },
      { new: true }
    );

    if (!updatedTable) {
      throw new Error("Table not found");
    }

    return updatedTable;
  } catch (error) {
    throw new Error(error.message || "Failed to change table status");
  }
};

// Helper function to validate menu item data
const validateMenuItemData = async (data) => {
  const { category, name, food_type, price_info, restaurantId } = data;

  if (!category || !name || !food_type || !restaurantId) {
    throw new Error(
      "Missing required fields: category, name, food_type, or restaurantId"
    );
  }
  const restaurant = await Restaurant.findOne({ restaurant_id: restaurantId }); // Find restaurant by restaurant_id

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
 

  // Validate food type
  const validFoodTypes = [
    "Veg",
    "Non-Veg",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Kosher",
    "Halal",
    "Other",
  ];
  if (!validFoodTypes.includes(food_type)) {
    throw new Error("Invalid food type");
  }

  // Validate price_info
  if (!price_info || !Array.isArray(price_info) || price_info.length === 0) {
    throw new Error("Price information is required and must be an array");
  }
  price_info.forEach((info) => {
    if (info.price <= 0) {
      throw new Error("Price must be greater than zero");
    }
    if (info.is_offer && info.offer_price >= info.price) {
      throw new Error("Offer price must be lower than the original price");
    }
  });
};

// Create a new menu item for a restaurant
export const createMenuItem = async (data) => {
  try {
    // Validate incoming menu item data (now async)
    await validateMenuItemData(data);

    // If validation passes, proceed to create the menu item
    const menuItem = new MenuItem(data);
    await menuItem.save();
    return menuItem;
  } catch (error) {
    // Throw the error back to the controller
    throw new Error(error.message || "Failed to create menu item");
  }
};

// Fetch all menu items for a specific restaurant and return the count
export const getMenuItemsByRestaurant = async (restaurantId) => {
  if (!restaurantId) {
    throw new Error("Restaurant ID is required");
  }

  const menuItems = await MenuItem.find({ restaurantId });
  const count = await MenuItem.countDocuments({ restaurantId });

  return { menuItems, count };
};

// Fetch all categories available in a restaurant along with the menu items in those categories
export const getCategoriesWithMenuItems = async (restaurantId) => {
  if (!restaurantId) {
    throw new Error("Restaurant ID is required");
  }

  // Aggregating menu items by category for a specific restaurant
  const categories = await MenuItem.aggregate([
    {
      $match: {
        restaurantId: Number(restaurantId),
      },
    },
    {
      $group: {
        _id: "$category",
        menuItems: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $project: {
        category: "$_id",

        menuItems: 1,

        _id: 0,
      },
    },
  ]);

  return categories;
};

// Fetch all menu items (regardless of restaurant)
export const getAllMenuItems = async () => {
  return await MenuItem.find({});
};

// Update a menu item
// Update a menu item
export const updateMenuItem = async (menuItemId, updateData) => {
  try {
    // Check if menuItemId is provided
    if (!menuItemId) {
      throw new Error("Menu item ID is required");
    }

    // Validate update data (assuming validateMenuItemData is asynchronous)
    if (
      updateData.category ||
      updateData.name ||
      updateData.food_type ||
      updateData.price_info
    ) {
      await validateMenuItemData(updateData); // Add await if it's an async function
    }

    // Find and update the menu item by ID
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      getObjectId(menuItemId), // Convert menuItemId to ObjectId if necessary
      updateData,
      { new: true } // Return the updated document
    );

    // If no menu item is found, throw an error
    if (!updatedMenuItem) {
      throw new Error("Menu item not found");
    }

    return updatedMenuItem;
  } catch (error) {
    // Catch and propagate the error
    throw new Error(error.message || "Failed to update menu item");
  }
};

// Validate recipe data
const validateRecipeData = (recipeData) => {
  const { ingredients, steps } = recipeData;

  if (!ingredients || ingredients.length === 0) {
    throw new Error("Recipe must have at least one ingredient");
  }

  if (!steps || steps.length === 0) {
    throw new Error("Recipe must have at least one step");
  }

  ingredients.forEach((ingredient) => {
    if (!ingredient.name || !ingredient.quantity) {
      throw new Error("Each ingredient must have a name and quantity");
    }
  });
};

// Create a recipe linked to a menu item
export const createRecipeForMenuItem = async (menuItemId, recipeData) => {
  if (!menuItemId) {
    throw new Error("Menu item ID is required");
  }

  // Validate recipe data
  validateRecipeData(recipeData);

  const recipe = new Recipe({
    ...recipeData,
    menuItemId,
  });
  await recipe.save();
  return recipe;
};

// Fetch recipe by menu item
export const getRecipeByMenuItem = async (menuItemId) => {
  if (!menuItemId) {
    throw new Error("Menu item ID is required");
  }

  return await Recipe.findOne({ menuItemId });
};
