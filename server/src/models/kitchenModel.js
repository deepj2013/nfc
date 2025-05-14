import mongoose from "mongoose";

const kitchenSchema = new mongoose.Schema({
  kitchen_name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  kitchen_code: { type: String, required: true, unique: true },
  // NEW: kitchen type and extra fields
  kitchen_type: {
    type: String,
    enum: ["Owned", "Leased", "Partnership"],
    required: true,
  },

  partner_name: {
    type: String,
    default: null,
  },
  lease_start_date: {
    type: Date,
    default: null,
  },
  lease_end_date: {
    type: Date,
    default: null,
  },

  is_active: { type: Boolean, default: true },
  created_by: { type: Number, required: true },
  updated_by: { type: Number, default: null },
}, {
  timestamps: { createdAt: "date_created", updatedAt: "date_modified" }
});



export default mongoose.models.Kitchen || mongoose.model("Kitchen", kitchenSchema);