import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    restaurant_id: { type: Number, required: true },
    table_id: { type: String, unique: true, required: true },
    tableNumber: { type: Number, required: true },
    seatType: { type: Number, required: true },
    currentStatus: {
      type: String,
      enum: ["Available", "Occupied", "NotAvailable"],
      default: "Available",
    },
    createBy: { type: Number, required: true },
    updateBy: { type: Number, required: true },
    qr_code: { type: String }, // <-- New field
  },
  { timestamps: true }
);

const RestaurantTable = mongoose.model("RestaurantTable", tableSchema);

export default RestaurantTable;