import {
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
  createTable,
  getTablesByRestaurant,
  updateTable,
  changeTableStatus,
  createMenuItem, getMenuItemsByRestaurant, getAllMenuItems, updateMenuItem, createRecipeForMenuItem, getRecipeByMenuItem , getCategoriesWithMenuItems,
  processMenuExcel,
} from "../services/facilitiesServices.js";
import {
  createFacilityService,
  getAllFacilitiesService,
  getSingleFacilityService,
  updateFacilityService,
  deleteFacilityService,
} from "../services/facilitiesServices.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

// ✅ Create a New Facility
export const addFacility = async (req, res) => {
  try {
    const result = await createFacilityService(req.body);
    return res.status(201).json(successResponse(result.message, result.facility));
  } catch (error) {
    return res.status(400).json(errorResponse(error.message));
  }
};

// ✅ Get All Facilities
export const getAllFacilities = async (req, res) => {
  try {
    const facilities = await getAllFacilitiesService();
    return res.status(200).json(successResponse("Facilities retrieved successfully", facilities));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

// ✅ Get Single Facility
export const getSingleFacility = async (req, res) => {
  try {
    const facility = await getSingleFacilityService(req.params.id);
    return res.status(200).json(successResponse("Facility retrieved successfully", facility));
  } catch (error) {
    return res.status(404).json(errorResponse(error.message));
  }
};

// ✅ Update Facility
export const updateFacility = async (req, res) => {
  try {
    const result = await updateFacilityService(req.params.id, req.body);
    return res.status(200).json(successResponse(result.message, result.facility));
  } catch (error) {
    return res.status(400).json(errorResponse(error.message));
  }
};

// ✅ Delete Facility
export const deleteFacility = async (req, res) => {
  try {
    const result = await deleteFacilityService(req.params.id);
    return res.status(200).json(successResponse(result.message));
  } catch (error) {
    return res.status(404).json(errorResponse(error.message));
  }
};

export const createRestaurantController = async (req, res) => {
  try {
    const restaurant = await createRestaurant(req.body);
    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const updatedRestaurant = await updateRestaurant(restaurantId, req.body);
    console.log(restaurantId)
    res.status(200).json({ success: true, data: updatedRestaurant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllRestaurantsController = async (req, res) => {
  try {
    console.log("all restaurants")
    const restaurants = await getAllRestaurants();
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getSingleRestaurantController = async (req, res) => {
  try {
    const restaurant_id = req.params.id;
    const restaurant = await getSingleRestaurant(restaurant_id);

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



// Controller to create a new table
export const createTableController = async (req, res) => {
  try {
    let tableData = req.body;
    tableData.restaurant_id = req.params.restaurantId; // Extract restaurantId from req.params
    tableData.updateBy = 1
    tableData.createBy = 1
    const table = await createTable(tableData);
    res.status(201).json({ success: true, data: table });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to fetch all tables for a restaurant
export const getTablesByRestaurantController = async (req, res) => {
  try {
    const restaurant_id = req.params.restaurantId;
    const tables = await getTablesByRestaurant(restaurant_id);
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to update a table's details
export const updateTableController = async (req, res) => {
  try {
    const tableId = req.params.tableId;
    const updatedTable = await updateTable(tableId, req.body);
    res.status(200).json({ success: true, data: updatedTable });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to change the status of a table
export const changeTableStatusController = async (req, res) => {
  try {
    const tableId = req.params.tableId;
    const { status } = req.body;

    if (!["Available", "Occupied", "NotAvailable"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "Available", "Occupied", or "NotAvailable".',
      });
    }

    const updatedTable = await changeTableStatus(tableId, status);
    res.status(200).json({ success: true, data: updatedTable });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to create a new menu item
export const createMenuItemController = async (req, res) => {
    try {
      const menuItem = await createMenuItem(req.body);
      res.status(201).json({ success: true, data: menuItem });
    } catch (error) {
      // If validation fails or there's any error, return an error response
      res.status(400).json({ success: false, message: error.message });
    }
  };

// Controller to fetch all menu items by restaurant
export const getMenuItemsByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const menuItems = await getMenuItemsByRestaurant(restaurantId);
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to fetch all menu items
export const getAllMenuItemsController = async (req, res) => {
  try {
    const menuItems = await getAllMenuItems();
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to update a menu item
export const updateMenuItemController = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
   
    const updatedMenuItem = await updateMenuItem(menuItemId, req.body);
    res.status(200).json({ success: true, data: updatedMenuItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to create a recipe for a menu item
export const createRecipeForMenuItemController = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    console.log(menuItemId,"id", req.params)
    const recipe = await createRecipeForMenuItem(menuItemId, req.body);
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to get a recipe by menu item
export const getRecipeByMenuItemController = async (req, res) => {
  try {
    const menuItemId = req.params.menuItemId;
    const recipe = await getRecipeByMenuItem(menuItemId);
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const getCategoryInRestaurantController = async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const recipe = await getCategoriesWithMenuItems(restaurantId);
      res.status(200).json({ success: true, data: recipe });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  export const bulkUploadMenu = async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  
      const result = await processMenuExcel(req.file.path);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };