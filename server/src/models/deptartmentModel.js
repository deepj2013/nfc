import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Department schema
const DepartmentSchema = new Schema({
  departmentName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  department_id:{
    type: String,
    required: true,
    unique: true,
  },
  headOfDepartment: {
    type: Number,
    ref: 'User', // Reference to the User collection
    required: true,
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
DepartmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Department model
const Department = mongoose.model('Department', DepartmentSchema);
export default Department;