import APIError, { HttpStatusCode } from "../exception/errorHandler.js";
import { getObjectId } from "../helpers/mongoose/mongooseHelpers.js";
import Category from "../models/inv_m_categoryModel.js";
import MeasurementUnit from "../models/inv_m_measurmentModel.js";
import Product from "../models/inv_productModel.js";
import Vendor from "../models/inv_vendorModel.js";

export const createInvCategoryservice = async (data) => {
  try {
    let { categoryName, description, parentCategoryId, createdBy, updatedBy } =
      data;
    const lastCategory = await Category.findOne()
      .sort({ category_id: -1 })
      .exec();
    let nextCategoryId = lastCategory ? lastCategory.category_id + 1 : 1;

    // Validate required fields
    if (!categoryName) {
      throw new APIError(
        "Validation Error",
        400,
        true,
        "Category name is required"
      );
    }
    if (!createdBy) {
      throw new APIError(
        "Validation Error",
        400,
        true,
        "Created by is required"
      );
    }
    if (!updatedBy) {
      throw new APIError(
        "Validation Error",
        400,
        true,
        "Updated by is required"
      );
    }

    // Check if the category name already exists
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      throw new APIError(
        "Validation Error",
        400,
        true,
        "Category name already exists"
      );
    }

    // Handle parentCategoryId - if it's an empty string, set it to null
    if (parentCategoryId === "") {
      parentCategoryId = null;
    }

    // If parentCategoryId is provided, validate it
    if (parentCategoryId && !getObjectId(parentCategoryId)) {
      throw new APIError(
        "Validation Error",
        400,
        true,
        "Invalid parent category ID"
      );
    }

    // Create a new category instance
    const newCategory = new Category({
      categoryName,
      description,
      parentCategoryId,
      createdBy,
      updatedBy,
      category_id: nextCategoryId,
    });

    // Save the category to the database
    const result = await newCategory.save();

    // Return the result
    return result;
  } catch (error) {
    // Check if the error is an instance of APIError
    if (error instanceof APIError) {
      throw error; // Re-throw the APIError as it is
    } else {
      // Handle other unexpected errors
      throw new APIError("Internal Server Error", 500, true, error.message);
    }
  }
};

export const updateInvCategoryservice = async (data) => {
  try {
    let category_id = data.category_id;
    const { categoryName, description, parentCategoryId, updatedBy } = data;
    console.log(category_id, "id is ");
    // Validate required fields
    if (!category_id) {
      throw new APIError(
        "Validation Error",
        400,
        true,
        "Invalid or missing category ID"
      );
    }
    if (!updatedBy) {
      throw new APIError(
        "Validation Error",
        400,
        true,
        "Updated by is required"
      );
    }

    // Find the existing category by category_id using an aggregation pipeline
    const existingCategory = await Category.aggregate([
      { $match: { category_id: parseInt(category_id, 10) } },
    ]);

    if (existingCategory.length === 0) {
      throw new APIError("Not Found", 404, true, "Category not found");
    }

    let updateFields = {};

    // If categoryName is provided, check if it's already taken by another category
    if (categoryName && categoryName !== existingCategory[0].categoryName) {
      const duplicateCategory = await Category.findOne({ categoryName });
      if (duplicateCategory) {
        throw new APIError(
          "Validation Error",
          400,
          true,
          "Category name already exists"
        );
      }
      updateFields.categoryName = categoryName;
    }

    // Update description if provided
    if (description !== undefined) {
      updateFields.description = description;
    }

    // Handle parentCategoryId - if it's an empty string, set it to null
    if (parentCategoryId === "") {
      updateFields.parentCategoryId = null;
    } else if (
      parentCategoryId &&
      parentCategoryId !== existingCategory[0].parentCategoryId?.toString()
    ) {
      if (!getObjectId(parentCategoryId)) {
        throw new APIError(
          "Validation Error",
          400,
          true,
          "Invalid parent category ID"
        );
      }
      updateFields.parentCategoryId = parentCategoryId;
    }

    // Always update the updatedBy and updatedAt fields
    updateFields.updatedBy = updatedBy;
    updateFields.updatedAt = Date.now();

    // Perform the update operation
    const result = await Category.findOneAndUpdate(
      { category_id: parseInt(category_id, 10) },
      { $set: updateFields },
      { new: true } // This option returns the updated document
    );

    // Return the updated category
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else {
      throw new APIError("Internal Server Error", 500, true, error.message);
    }
  }
};

export const getAllCategoriesService = async () => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find()
      .populate("parentCategoryId")
      .exec();

    // Return the list of categories
    return categories;
  } catch (error) {
    // Handle unexpected errors
    throw new APIError("Internal Server Error", 500, true, error.message);
  }
};

export const createMeasurementUnitService = async (data) => {
    try {
      const { unitName, abbreviation, conversionFactor, productId, createdBy, updatedBy } = data;
  
      // Validate required fields
      if (!unitName) {
        throw new APIError('Validation Error', 400, true, 'Unit name is required');
      }
      if (!abbreviation) {
        throw new APIError('Validation Error', 400, true, 'Abbreviation is required');
      }
  
      // Check if a measurement unit with the same unitName and abbreviation already exists
      const existingMeasurementUnit = await MeasurementUnit.findOne({ unitName, abbreviation });
      if (existingMeasurementUnit) {
        throw new APIError('Validation Error', 400, true, 'Measurement unit with the same name and abbreviation already exists');
      }
  
      // Handle productId - if it's an empty string, set it to null
      let validProductId = productId === "" ? null : productId;
  
      // Validate productId if it's provided (i.e., not null)
      if (validProductId && !mongoose.Types.ObjectId.isValid(validProductId)) {
        throw new APIError('Validation Error', 400, true, 'Invalid product ID');
      }
  
      // Get the current highest measuremntunitId
      const lastMeasurementUnit = await MeasurementUnit.findOne().sort({ measuremntunitId: -1 });
      const nextMeasuremntunitId = lastMeasurementUnit ? lastMeasurementUnit.measuremntunitId + 1 : 1;
  
      // Create a new measurement unit
      const newMeasurementUnit = new MeasurementUnit({
        unitName,
        abbreviation,
        conversionFactor,
        productId: validProductId,
        measuremntunitId: nextMeasuremntunitId,
        createdBy,
        updatedBy
      });
  
      // Save the measurement unit to the database
      const result = await newMeasurementUnit.save();
  
      // Return the result
      return result;
  
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      } else {
        throw new APIError('Internal Server Error', 500, true, error.message);
      }
    }
  };
export const updateMeasurementUnitService = async (measurementUnitId, data) => {
    try {
      const { unitName, abbreviation, conversionFactor, productId, updatedBy } = data;
  
      // Validate required fields
      if (!measurementUnitId || !Number.isInteger(measurementUnitId)) {
        throw new APIError("Validation Error", 400, true, "Invalid or missing measurement unit ID");
      }
      if (!updatedBy) {
        throw new APIError("Validation Error", 400, true, "Updated by is required");
      }
  
      // Find the existing measurement unit
      const existingMeasurementUnit = await MeasurementUnit.findOne({ measuremntunitId: measurementUnitId });
      if (!existingMeasurementUnit) {
        throw new APIError("Not Found", 404, true, "Measurement unit not found");
      }
  
      let updateFields = {};
  
      // Check if unitName and abbreviation already exist
      if (unitName && unitName !== existingMeasurementUnit.unitName) {
        const duplicateUnit = await MeasurementUnit.findOne({ unitName, abbreviation });
        if (duplicateUnit) {
          throw new APIError("Validation Error", 400, true, "Measurement unit with the same name and abbreviation already exists");
        }
        updateFields.unitName = unitName;
      }
  
      // Update fields if provided
      if (abbreviation && abbreviation !== existingMeasurementUnit.abbreviation) {
        const duplicateUnit = await MeasurementUnit.findOne({ unitName, abbreviation });
        if (duplicateUnit) {
          throw new APIError("Validation Error", 400, true, "Measurement unit with the same name and abbreviation already exists");
        }
        updateFields.abbreviation = abbreviation;
      }
  
      if (conversionFactor !== undefined) {
        updateFields.conversionFactor = conversionFactor;
      }
  
      // Handle productId - if it's an empty string, set it to null
      let validProductId = productId === "" ? null : productId;
  
      // Validate productId if it's provided (i.e., not null)
      if (validProductId && !mongoose.Types.ObjectId.isValid(validProductId)) {
        throw new APIError("Validation Error", 400, true, "Invalid product ID");
      }
  
      if (validProductId !== undefined) {
        updateFields.productId = validProductId;
      }
  
      // Update the updatedBy and updatedAt fields
      updateFields.updatedBy = updatedBy;
      updateFields.updatedAt = Date.now();
  
      // Perform the update operation
      const result = await MeasurementUnit.findOneAndUpdate(
        { measuremntunitId: measurementUnitId },
        { $set: updateFields },
        { new: true } // Return the updated document
      );
  
      // Return the updated measurement unit
      return result;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      } else {
        throw new APIError("Internal Server Error", 500, true, error.message);
      }
    }
  };

export const getAllMeasurementUnitsService = async () => {
  try {
    // Fetch all measurement units from the database
    const measurementUnits = await MeasurementUnit.find();

    // Return the list of measurement units
    return measurementUnits;
  } catch (error) {
    throw new APIError("Internal Server Error", 500, true, error.message);
  }
};



// Utility function to generate SKU code
const generateSKU = async () => {
  // Find the highest existing SKU number
  const lastProduct = await Product.findOne({ sku: { $regex: /^NFC/ } })
    .sort({ sku: -1 })
    .exec();

  let nextSkuNumber = 1;
  if (lastProduct) {
    const lastSku = lastProduct.sku.slice(3); // Remove "NFC"
    nextSkuNumber = parseInt(lastSku, 10) + 1;
  }

  const sku = `NFC${String(nextSkuNumber).padStart(5, '0')}`;
  return sku;
};

export const createProductService = async (data) => {
  try {
    const { productName, description, categoryId, price, quantityInStock, unitOfMeasure, vendorId, createdBy } = data;

    // Validate required fields
    if (!productName) {
      throw new APIError('Validation Error', 400, true, 'Product name is required');
    }
    if (!categoryId || !Number.isInteger(categoryId)) {
      throw new APIError('Validation Error', 400, true, 'Invalid or missing category ID');
    }
    if (!price) {
      throw new APIError('Validation Error', 400, true, 'Price is required');
    }
    if (!quantityInStock && quantityInStock !== 0) {
      throw new APIError('Validation Error', 400, true, 'Quantity in stock is required');
    }
    if (!unitOfMeasure) {
      throw new APIError('Validation Error', 400, true, 'Unit of measure is required');
    }
    if (!vendorId || typeof vendorId !== 'string') {
      throw new APIError('Validation Error', 400, true, 'Invalid or missing vendor ID');
    }

    // Check if the categoryId exists in the Category collection
    const categoryExists = await Category.findOne({ category_id: categoryId });
    if (!categoryExists) {
      throw new APIError('Validation Error', 400, true, 'Category not found');
    }

    // Check if the vendorId exists in the Vendor collection
    const vendorExists = await Vendor.findOne({ vendor: vendorId });
    if (!vendorExists) {
      throw new APIError('Validation Error', 400, true, 'Vendor not found');
    }

    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      throw new APIError('Validation Error', 400, true, 'Product with the same name already exists');
    }

    // Generate SKU code (assuming you have this utility function)
    const sku = await generateSKU();

    // Create a new product
    const newProduct = new Product({
      productName,
      sku,
      description,
      categoryId,
      price,
      quantityInStock,
      unitOfMeasure,
      vendorId,
      createdBy
    });

    // Save the product to the database
    const result = await newProduct.save();

    // Return the result
    return result;

  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else {
      throw new APIError('Internal Server Error', 500, true, error.message);
    }
  }
};

export const updateProductService = async (sku, data) => {
  try {
    const { productName, description, categoryId, price, quantityInStock, unitOfMeasure, vendorId, updatedBy } = data;

    // Validate required fields
    if (!sku) {
      throw new APIError('Validation Error', 400, true, 'SKU is required');
    }
    if (!updatedBy) {
      throw new APIError('Validation Error', 400, true, 'Updated by is required');
    }

    // Find the existing product by SKU
    const existingProduct = await Product.findOne({ sku });
    if (!existingProduct) {
      throw new APIError('Not Found', 404, true, 'Product not found');
    }

    let updateFields = {};

    // Check if productName already exists in another product
    if (productName && productName !== existingProduct.productName) {
      const duplicateProduct = await Product.findOne({ productName });
      if (duplicateProduct) {
        throw new APIError('Validation Error', 400, true, 'Product with the same name already exists');
      }
      updateFields.productName = productName;
    }

    // Update fields if provided
    if (description !== undefined) updateFields.description = description;
    if (categoryId && Number.isInteger(categoryId)) updateFields.categoryId = categoryId;
    if (price !== undefined) updateFields.price = price;
    if (quantityInStock !== undefined) updateFields.quantityInStock = quantityInStock;
    if (unitOfMeasure !== undefined) updateFields.unitOfMeasure = unitOfMeasure;

    // Check and update vendorId if provided
    if (vendorId && typeof vendorId === 'string') {
      const vendorExists = await Vendor.findOne({ vendor: vendorId });
      if (!vendorExists) {
        throw new APIError('Validation Error', 400, true, 'Vendor not found');
      }
      updateFields.vendorId = vendorId;
    }

    // Update the updatedBy and updatedAt fields
    updateFields.updatedBy = updatedBy;
    updateFields.updatedAt = Date.now();

    // Perform the update operation
    const result = await Product.findOneAndUpdate(
      { sku },
      { $set: updateFields },
      { new: true }
    );

    // Return the updated product
    return result;

  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else {
      throw new APIError('Internal Server Error', 500, true, error.message);
    }
  }
};

export const getAllProductsService = async () => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Return the list of products
    return products;
  } catch (error) {
    throw new APIError('Internal Server Error', 500, true, error.message);
  }
};

export const searchProductsByNameOrSkuService = async (searchTerm) => {
  try {
    // Search products by name or SKU matching the searchTerm
    const products = await Product.find({
      $or: [
        { productName: { $regex: new RegExp(searchTerm, 'i') } },
        { sku: { $regex: new RegExp(searchTerm, 'i') } }
      ]
    });

    // Return the matching products
    return products;
  } catch (error) {
    throw new APIError('Internal Server Error', 500, true, error.message);
  }
};


// Utility function to generate a unique vendor ID
const generateUniqueVendorId = async () => {
  let vendorId;
  let isUnique = false;

  while (!isUnique) {
    // Generate a vendor ID with "VEN" prefix and 5 random digits
    const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();
    vendorId = `VEN${randomDigits}`;

    // Check if the generated vendor ID is unique
    const existingVendor = await Vendor.findOne({ vendor: vendorId });
    if (!existingVendor) {
      isUnique = true;
    }
  }

  return vendorId;
};

export const createVendorService = async (data) => {
  try {
    const { vendorName, contactPerson, contactEmail, contactPhone, gstNumber, address, paymentTerms, createdBy } = data;

    // Validate required fields
    if (!vendorName) {
      throw new APIError('Validation Error', 400, true, 'Vendor name is required');
    }
    if (!contactPerson) {
      throw new APIError('Validation Error', 400, true, 'Contact person is required');
    }
    if (!contactEmail) {
      throw new APIError('Validation Error', 400, true, 'Contact email is required');
    }
    if (!contactPhone) {
      throw new APIError('Validation Error', 400, true, 'Contact phone is required');
    }
    if (!paymentTerms) {
      throw new APIError('Validation Error', 400, true, 'Payment terms are required');
    }

    // Check for duplicate Vendor based on mobile number, email ID, and GST number
    const duplicateVendor = await Vendor.findOne({
      $or: [
        { contactPhone },
        { contactEmail },
        { gstNumber }
      ]
    });

    if (duplicateVendor) {
      throw new APIError('Validation Error', 400, true, 'Vendor with the same contact phone, email, or GST number already exists');
    }

    // Generate unique vendor ID
    const vendor = await generateUniqueVendorId();
    
    // Create a new vendor
    const newVendor = new Vendor({
      vendorName,
      vendor,
      contactPerson,
      contactEmail,
      contactPhone,
      gstNumber,
      address, // Address can be null
      paymentTerms,
      createdBy
    });

    // Save the vendor to the database
    const result = await newVendor.save();

    // Return the result
    return result;

  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else {
      throw new APIError('Internal Server Error', 500, true, error.message);
    }
  }
};

export const updateVendorService = async (vendorId, data) => {
  try {
    const { vendorName, contactPerson, contactEmail, contactPhone, gstNumber, address, paymentTerms, updatedBy } = data;

    // Validate required fields
    if (!vendorId) {
      throw new APIError('Validation Error', 400, true, 'Vendor ID is required');
    }
    if (!updatedBy) {
      throw new APIError('Validation Error', 400, true, 'Updated by is required');
    }

    // Find the existing vendor by custom vendorId (e.g., VENXXXXX)
    const existingVendor = await Vendor.findOne({ vendor: vendorId });
    if (!existingVendor) {
      throw new APIError('Not Found', 404, true, 'Vendor not found');
    }

    let updateFields = {};

    // Check for duplicates if fields are being updated
    if (contactPhone && contactPhone !== existingVendor.contactPhone) {
      const duplicateVendor = await Vendor.findOne({ contactPhone });
      if (duplicateVendor) {
        throw new APIError('Validation Error', 400, true, 'Contact phone already exists');
      }
      updateFields.contactPhone = contactPhone;
    }
    if (contactEmail && contactEmail !== existingVendor.contactEmail) {
      const duplicateVendor = await Vendor.findOne({ contactEmail });
      if (duplicateVendor) {
        throw new APIError('Validation Error', 400, true, 'Contact email already exists');
      }
      updateFields.contactEmail = contactEmail;
    }
    if (gstNumber && gstNumber !== existingVendor.gstNumber) {
      const duplicateVendor = await Vendor.findOne({ gstNumber });
      if (duplicateVendor) {
        throw new APIError('Validation Error', 400, true, 'GST number already exists');
      }
      updateFields.gstNumber = gstNumber;
    }

    // Update fields if provided
    if (vendorName !== undefined) updateFields.vendorName = vendorName;
    if (contactPerson !== undefined) updateFields.contactPerson = contactPerson;
    if (address !== undefined) updateFields.address = address;
    if (paymentTerms !== undefined) updateFields.paymentTerms = paymentTerms;

    // Update the updatedBy and updatedAt fields
    updateFields.updatedBy = updatedBy;
    updateFields.updatedAt = Date.now();

    // Perform the update operation using the vendor field
    const result = await Vendor.findOneAndUpdate(
      { vendor: vendorId }, // Using the custom vendor field instead of _id
      { $set: updateFields },
      { new: true }
    );

    // Return the updated vendor
    return result;

  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else {
      throw new APIError('Internal Server Error', 500, true, error.message);
    }
  }
};
export const getAllVendorsService = async () => {
  try {
    // Fetch all vendors from the database
    const vendors = await Vendor.find();

    // Return the list of vendors
    return vendors;
  } catch (error) {
    throw new APIError('Internal Server Error', 500, true, error.message);
  }
};

export const searchVendorByNameOrIdService = async (searchTerm) => {
  try {
    // Search vendors by name or vendor ID matching the searchTerm
    const vendors = await Vendor.find({
      $or: [
        { vendorName: { $regex: new RegExp(searchTerm, 'i') } },
        { vendor: { $regex: new RegExp(searchTerm, 'i') } }
      ]
    });

    // Return the matching vendors
    return vendors;
  } catch (error) {
    throw new APIError('Internal Server Error', 500, true, error.message);
  }
};


export const adjustStockLevel = async (
  productId,
  quantity,
  transactionType
) => {
  const product = await product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (transactionType === "inward") {
    product.quantityInStock += quantity;
  } else if (transactionType === "outward") {
    if (product.quantityInStock < quantity) {
      throw new Error("Insufficient stock");
    }
    product.quantityInStock -= quantity;
  }
  await product.save();
};
