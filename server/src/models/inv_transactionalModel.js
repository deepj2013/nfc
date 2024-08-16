import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Inventory Transaction schema
const InventoryTransactionSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product collection
    required: true,
  },
  sku: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  transactionType: {
    type: String,
    enum: ['inward', 'outward'], // Can be 'inward' or 'outward'
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Department', // Reference to the Department collection
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection, assuming you have a user model
    required: true,
  },
  remarks: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: Number,
    
  },
  updatedAt: {
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
InventoryTransactionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Inventory Transaction model
module.exports = mongoose.model('InventoryTransaction', InventoryTransactionSchema);
