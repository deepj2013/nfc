import Restaurant from "../models/facility_restaurantModel.js";
import RestaurantTable from "../models/facility_restaurant_tables.js";
import MenuItem from "../models/facility_restaurant_menuModel.js";
import { getObjectId } from "../helpers/mongoose/mongooseHelpers.js";
import Recipe from "../models/facility_restaurant_menu_receipeModel.js"
import Facility from "../models/facilitModel.js";
import { v4 as uuidv4 } from "uuid"; // For generating unique numbers



//service to create Facilities
export const createFacilityService = async (facilityData) => {
  try {
    const { name, description, image, route } = facilityData;

    // **1️⃣ Validate Required Fields**
    if (!name || !description || !image || !route) {
      throw new Error("All fields (name, description, image, route) are required.");
    }

    // **2️⃣ Check if Facility Already Exists (Case-Insensitive)**
    const existingFacility = await Facility.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") }, // Case-Insensitive Match
    });

    if (existingFacility) {
      throw new Error("Facility with this name already exists.");
    }

    // **3️⃣ Create and Save New Facility**
    const newFacility = new Facility({
      name,
      description,
      image,
      route,
    });

    await newFacility.save();
    return { success: true, message: "Facility created successfully", facility: newFacility };

  } catch (error) {
    throw new Error(error.message || "Failed to create facility.");
  }
};

// ✅ Get All Facilities
export const getAllFacilitiesService = async () => {
  return await Facility.find({});
};

// ✅ Get Single Facility by ID
export const getSingleFacilityService = async (id) => {
  const facility = await Facility.findById(id);
  if (!facility) throw new Error("Facility not found.");
  return facility;
};

// ✅ Update Facility by ID
export const updateFacilityService = async (id, updateData) => {
  const facility = await Facility.findById(id);
  if (!facility) throw new Error("Facility not found.");

  Object.assign(facility, updateData); // Update fields dynamically
  await facility.save();

  return { success: true, message: "Facility updated successfully", facility };
};

// ✅ Delete Facility by ID
export const deleteFacilityService = async (id) => {
  const facility = await Facility.findByIdAndDelete(id);
  if (!facility) throw new Error("Facility not found.");

  return { success: true, message: "Facility deleted successfully" };
};

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
  console.log(updateData)
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



// Function to generate a unique table ID with restaurant name prefix
const generateUniqueTableId = async (restaurant_id) => {
  try {
    // Fetch restaurant data
    const restaurant = await Restaurant.findOne({restaurant_id:restaurant_id});
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Extract and format restaurant name
    let restaurantName = restaurant.name.replace(/\s+/g, "").toUpperCase(); // Remove spaces and convert to uppercase
    restaurantName = restaurantName.substring(0, 10); // Keep only the first 5 characters to avoid excessive length

    // Get the next table number for this restaurant
    const existingTables = await RestaurantTable.countDocuments({ restaurant_id });
    const tableNumber = existingTables + 1;

    // Generate unique table ID with restaurant name, table number, and short unique code
    return `${restaurantName}-T${tableNumber}`;
  } catch (error) {
    throw new Error(error.message || "Failed to generate table ID");
  }
};

// Create a new table
export const createTable = async (data) => {
  try {
    if (!data.restaurant_id || !data.seatType) {
      throw new Error("Restaurant ID, capacity, and seat type are required");
    }

    // Generate unique table ID using restaurant name
    data.table_id = await generateUniqueTableId(data.restaurant_id);

    // Determine table number based on restaurant's existing tables
    const existingTables = await RestaurantTable.countDocuments({ restaurant_id: data.restaurant_id });
    data.tableNumber = existingTables + 1;

    // Create and save the table
    const table = new RestaurantTable(data);
    await table.save();

    return table;
  } catch (error) {
    throw new Error(error.message || "Failed to create table");
  }
};

// Get all tables for a specific restaurant
// Get all tables for a specific restaurant
export const getTablesByRestaurant = async (restaurant_id) => {
  try {
    return await RestaurantTable.find({ restaurant_id });
  } catch (error) {
    throw new Error("Failed to fetch tables for the restaurant");
  }
};

// Update a table's details
export const updateTable = async (tableId, updateData) => {
  try {
    if (!updateData.capacity || !updateData.seatType) {
      throw new Error("Table capacity and seat type are required for update");
    }

    const updatedTable = await RestaurantTable.findOneAndUpdate(
      { table_id: tableId },
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

// Change the status of a table
export const changeTableStatus = async (tableId, status) => {
  try {
    if (!["Available", "Occupied", "NotAvailable"].includes(status)) {
      throw new Error('Invalid status. Must be "Available", "Occupied", or "NotAvailable".');
    }

    const updatedTable = await RestaurantTable.findOneAndUpdate(
      { table_id: tableId },
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

  // Find restaurant by restaurant_id
  const restaurant = await Restaurant.findOne({ restaurant_id: Number(restaurantId) });

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

  // Validate price_info and Convert Numeric Fields
  if (!price_info || !Array.isArray(price_info) || price_info.length === 0) {
    throw new Error("Price information is required and must be an array");
  }

  price_info.forEach((info, index) => {
    // Ensure all numerical values are converted from strings to numbers
    info.price = Number(info.price);
    info.offer_price = Number(info.offer_price);
    info.tax_percentage = Number(info.tax_percentage);
    info.discount_percentage = Number(info.discount_percentage);

    if (isNaN(info.price) || info.price <= 0) {
      throw new Error(`Price at index ${index} must be a valid number greater than zero`);
    }

    if (info.is_offer) {
      if (isNaN(info.offer_price) || info.offer_price <= 0) {
        throw new Error(`Offer price at index ${index} must be a valid number greater than zero`);
      }
      if (info.offer_price >= info.price) {
        throw new Error(`Offer price at index ${index} must be lower than the original price`);
      }
    }

    if (isNaN(info.tax_percentage) || info.tax_percentage < 0) {
      throw new Error(`Tax percentage at index ${index} must be a valid number`);
    }

    if (isNaN(info.discount_percentage) || info.discount_percentage < 0) {
      throw new Error(`Discount percentage at index ${index} must be a valid number`);
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

  const menuItems = await MenuItem.find({ restaurantId:restaurantId });
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
  console.log(recipe, "in backend")
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
