import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    route: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);



const  Facility = mongoose.model("Facility", FacilitySchema);

export default Facility;