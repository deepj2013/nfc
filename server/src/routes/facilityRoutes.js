import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  createRestaurantController,
  updateRestaurantController,
  getSingleRestaurantController,
  getAllRestaurantsController,
  createTableController,
  getTablesByRestaurantController,
  updateTableController,
  changeTableStatusController,
  createMenuItemController,
  getMenuItemsByRestaurantController,
  getAllMenuItemsController,
  updateMenuItemController,
  createRecipeForMenuItemController,
  getRecipeByMenuItemController,
  getCategoryInRestaurantController,
  addFacility,
  getAllFacilities,
  getSingleFacility,
  updateFacility,
  deleteFacility,

} from "../controllers/facilitiesController.js";

const router = express.Router();
//Routes for Facilities 

router.post("/addfacility", addFacility);
router.get("/getallfacility", getAllFacilities);
router.get("/facility/:id", getSingleFacility);
router.put("/facility/:id", updateFacility);
router.delete("/facility/:id", deleteFacility);

// Route to create a restaurant
router.post("/restaurant", [auth], createRestaurantController);
// Route to update a restaurant by restaurant_id
router.put("/restaurant/:restaurantId", [auth], updateRestaurantController);
//Route to get a single restaurant
router.get("/restaurant/:id", [auth], getSingleRestaurantController);
// Route to get all restaurants
router.get("/restaurants", [auth], getAllRestaurantsController);

// Route to create a new table for a restaurant
router.post("/restaurant/:restaurantId/table", createTableController);
// Route to get all tables for a restaurant
router.get("/restaurant/:restaurantId/tables", getTablesByRestaurantController);
// Route to update a table's details
router.put("/table/:tableId", updateTableController);
// Route to change a table's status (Available or Occupied)
router.put("/table/:tableId/status", changeTableStatusController);

// Route to create a menu item
router.post("/menu", createMenuItemController);

// Route to fetch all menu items for a restaurant
router.get(
  "/restaurant/:restaurantId/menu",
  getMenuItemsByRestaurantController
);

router.get("/restaurant/:restaurantId/category", getCategoryInRestaurantController);
// Route to fetch all menu items
router.get("/menu", getAllMenuItemsController);

// Route to update a menu item
router.put("/menu/:menuItemId", updateMenuItemController);

// Route to create a recipe for a menu item
router.post("/menu/:menuItemId/recipe", createRecipeForMenuItemController);

// Route to get a recipe by menu item
router.get("/menu/:menuItemId/recipe", getRecipeByMenuItemController);

export default router;
