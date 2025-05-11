import mongoose from "mongoose";

const FunctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  galleryImages: { type: [String], default: [] },
}, { timestamps: true });



const PublicFunctionModel = mongoose.model("publicwebsiteFunctions", FunctionSchema);
export default PublicFunctionModel;
