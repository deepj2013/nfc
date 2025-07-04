import mongoose from "mongoose";

const ManagingCommitteeSchema = new mongoose.Schema(
  {
    role_title: { type: String, required: true },
    member_id: { type: String,  required: true },
    name: { type: String, required: true },
    contact_number: { type: String, required: true },
    email: { type: String, required: true },
    tenure_start: { type: Date, required: true },
    tenure_end: { type: Date, required: true },
    is_active: { type: Boolean, default: true },
    created_by: { type: String },
    updated_by: { type: String }
  },
  { timestamps: true }
);

const ManagingCommittee = mongoose.model("ManagingCommittee", ManagingCommitteeSchema);

export default ManagingCommittee;