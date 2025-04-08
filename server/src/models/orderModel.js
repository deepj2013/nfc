import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  tableId: { type: String, required: true },
  memberId: { type: String },
  restaurant_id:{type:String},
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      status: {
        type: String,
        enum: ["Pending", "Cooking", "Ready", "Served"],
        default: "Pending"
      }, 
    }
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending","Cooking", "Ready", "Served"],
    default: "Pending"
  },
  placedAt: { type: Date, default: Date.now },
  placedBy: { type: String, enum: ["Captain", "POS", "Rider"], required: true }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
