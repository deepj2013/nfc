import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  createMeasurementUnitController,
  updateMeasurementUnitController,
  getAllMeasurementUnitsController,
  createProductController,
  updateProductController,
  getAllProductsController,
  searchProductsByNameOrSkuController,
  createVendorController,
  updateVendorController,
  getAllVendorsController,
  searchVendorByNameOrIdController,
  createInventoryTransactionController,
  getProductHistoryController,
  getReportController
} from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/createcategory", [auth], createCategoryController);
router.get("/getcategory", [auth], getAllCategoriesController);
router.post("/updatecategory", [auth], updateCategoryController);
router.post("/measurement-units",[auth], createMeasurementUnitController);
router.put("/measurement-units/:id",[auth], updateMeasurementUnitController);
router.get("/measurement-units",[auth], getAllMeasurementUnitsController);
// Route for creating a product
router.post('/products', [auth], createProductController);

// Route for updating a product
router.put('/products/:id',[auth], updateProductController);

// Route for getting all products
router.get('/products', [auth],getAllProductsController);

// Route for searching products by name or SKU
router.get('/products/search/:searchTerm', [auth], searchProductsByNameOrSkuController);
// Route for creating a vendor
router.post('/vendors',[auth],  createVendorController);

// Route for updating a vendor
router.put('/vendors/:id', [auth], updateVendorController);

// Route for getting all vendors
router.get('/vendors', [auth], getAllVendorsController);

// Route for searching vendors by name or vendor ID
router.get('/vendors/search/:searchTerm', [auth], searchVendorByNameOrIdController);

router.post('/inventory-transactions', createInventoryTransactionController);

// Route to get the history of a product
router.get('/inventory-transactions/history/:sku', getProductHistoryController);

// Route to get reports (weekly, monthly, etc.)
router.get('/inventory-transactions/reports', getReportController);


export default router;
