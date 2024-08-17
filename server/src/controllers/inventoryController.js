import {
  createInvCategoryservice,
  updateInvCategoryservice,
  getAllCategoriesService,
  createMeasurementUnitService,
  updateMeasurementUnitService,
  getAllMeasurementUnitsService,
  createProductService,
  updateProductService,
  getAllProductsService,
  searchProductsByNameOrSkuService,
  createVendorService,
  updateVendorService,
  getAllVendorsService,
  searchVendorByNameOrIdService,
  createInventoryTransactionService
} from "../services/inventoryServices.js";


//create categories controller
export const createCategoryController = async (req, res) => {
  try {
    let data = req.body;
    const result = await createInvCategoryservice(data);

    return res.status(200).json({ msg: "success", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get all categories controller
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategoriesService();

    return res.status(200).json({ msg: "success", categories });
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const data = req.body;
    const result = await updateInvCategoryservice(data);

    return res
      .status(200)
      .json({ msg: "Category updated successfully", result });
  } catch (error) {
    res.status(error.httpCode || 500).json({ error: error.message });
  }
};

export const createMeasurementUnitController = async (req, res) => {
    try {
      const result = await createMeasurementUnitService(req.body);
      return res.status(201).json({ msg: "Measurement unit created successfully", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };
  
  export const updateMeasurementUnitController = async (req, res) => {
    try {
      const measurementUnitId = parseInt(req.params.id, 10); // Assuming the ID is passed as a URL parameter
      const result = await updateMeasurementUnitService(measurementUnitId, req.body);
      return res.status(200).json({ msg: "Measurement unit updated successfully", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };
  
  export const getAllMeasurementUnitsController = async (req, res) => {
    try {
      const result = await getAllMeasurementUnitsService();
      return res.status(200).json({ msg: "success", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };

  export const createProductController = async (req, res) => {
    try {
      const result = await createProductService(req.body);
      return res.status(201).json({ msg: "Product created successfully", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };
  
  export const updateProductController = async (req, res) => {
    try {
      const productId = req.params.id; // Assuming the product ID is passed as a URL parameter
      const result = await updateProductService(productId, req.body);
      return res.status(200).json({ msg: "Product updated successfully", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };
  
  export const getAllProductsController = async (req, res) => {
    try {
      const result = await getAllProductsService();
      return res.status(200).json({ msg: "success", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };
  
  export const searchProductsByNameOrSkuController = async (req, res) => {
    try {
      const searchTerm = req.params.searchTerm; // Assuming the search term is passed as a URL parameter
      const result = await searchProductsByNameOrSkuService(searchTerm);
      return res.status(200).json({ msg: "success", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };

  export const createVendorController = async (req, res) => {
    try {
      const result = await createVendorService(req.body);
      return res.status(201).json({ msg: "Vendor created successfully", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };
  
  export const updateVendorController = async (req, res) => {
    try {
      const vendorId = req.params.id; // Assuming the vendor ID is passed as a URL parameter
      const result = await updateVendorService(vendorId, req.body);
      return res.status(200).json({ msg: "Vendor updated successfully", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };
  
  export const getAllVendorsController = async (req, res) => {
    try {
      const result = await getAllVendorsService();
      return res.status(200).json({ msg: "success", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };
  
  export const searchVendorByNameOrIdController = async (req, res) => {
    try {
      const searchTerm = req.params.searchTerm; // Assuming the search term is passed as a URL parameter
      const result = await searchVendorByNameOrIdService(searchTerm);
      return res.status(200).json({ msg: "success", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };

  export const createInventoryTransactionController = async (req, res) => {
    try {
      const result = await createInventoryTransactionService(req.body);
      return res.status(201).json({ msg: "Inventory transaction created successfully", result });
    } catch (error) {
      res.status(error.httpCode || 500).json({ error: error.message });
    }
  };

