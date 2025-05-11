// models/KitchenInventory.js
import mongoose from "mongoose";

const kitchenInventorySchema = new mongoose.Schema({
  kitchen_id: { type: mongoose.Schema.Types.ObjectId, ref: "Kitchen", required: true },
  item_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }, // kg, litre, packet etc.
  threshold: { type: Number, default: 0 }, // low stock trigger
}, { timestamps: true });

export default mongoose.model("KitchenInventory", kitchenInventorySchema);