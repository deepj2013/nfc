import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Product schema
const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  qrCode: {
    type: String,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  categoryId: {
    type: Number,
    ref: 'Category', // Reference to the Category collection
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantityInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  unitOfMeasure: {
    type: String,
    required: true,
    trim: true,
  },
  vendorId: {
    type: String,
    ref: 'Vendor', // Reference to the Vendor collection
  },
  reorderLevel: {
    type: Number,
    default: 10, // Default reorder level, can be customized
  },
  createdBy: {
    type: Number,
    
  },
  updatedBy: {
    type: Number,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Middleware to update the 'updatedAt' field before saving
ProductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Product model
const Product = mongoose.model('Product', ProductSchema);
export default Product