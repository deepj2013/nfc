import mongoose from 'mongoose';

const userAssignmentSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  role_id: { type: Number, required: true },
  restaurant_id: { type: Number, default: null },
  kitchen_code: { type: String, default: null },
  department_id: { type: String, default: null },
  designation: { type: String, default: null },
  assigned_by: { type: Number, default: null },
  assigned_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
});

const UserAssignment = mongoose.model("UserAssignment", userAssignmentSchema);
export default UserAssignment;