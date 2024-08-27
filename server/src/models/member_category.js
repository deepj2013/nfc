import mongoose from "mongoose";

const { Schema } = mongoose;

const memberCategorySchema = new Schema(
  {
    memberCategory: { type: String, required: true, unique: true },
    memberCategoryId: { type: Number, required: true, unique: true },
    status: { type: Boolean, required: true },
    createdBy: { type: Number, required: true },
    updatedBy: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const MemberCategory = mongoose.model("MemberCategory", memberCategorySchema);

export default MemberCategory;
