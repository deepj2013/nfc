import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Category schema
const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  parentCategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // This references the same Category collection for subcategories
    default: null,
  },
  category_id: {
    type: Number,
    required: true,
    unique: true,
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
CategorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Category model
const Category = mongoose.model('Category', CategorySchema);
export default Category;