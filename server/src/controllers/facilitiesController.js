import {
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
  createTable,
  getTablesByRestaurant,
  updateTable,
  changeTableStatus,
  createMenuItem, getMenuItemsByRestaurant, getAllMenuItems, updateMenuItem, createRecipeForMenuItem, getRecipeByMenuItem , getCategoriesWithMenuItems
} from "../services/facilitiesServices.js";

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
    res.status(200).json({ success: true, data: updatedRestaurant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllRestaurantsController = async (req, res) => {
  try {
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

    const table = await createTable(tableData);
    res.status(201).json({ success: true, data: table });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// Controller to fetch all tables for a specific restaurant
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
    const tableNumber = req.params.tableId;
    const updatedTable = await updateTable(tableNumber, req.body);
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

    // Validate status input
    if (!["Available", "Occupied"].includes(status)) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Invalid status. Must be "Available" or "Occupied".',
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